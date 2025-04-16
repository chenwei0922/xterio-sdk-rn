import { useCallback, useEffect, useMemo, useState } from 'react';
import * as particleAuthCore from '@particle-network/rn-auth-core';
import * as particleBase from '@particle-network/rn-base';
import * as particleAA from '@particle-network/rn-aa';
import { chains, Ethereum, type ChainInfo } from '@particle-network/chains';
import { evm, type CommonError } from '@particle-network/rn-auth-core';
import { EvmService, type UserInfo } from '@particle-network/rn-base';
import { XLog } from '../common/utils';

export const useConnect = () => {
  const [connected, setConnected] = useState(false);

  const checkConnectStatus = useCallback(async () => {
    const _f = await particleAuthCore.isConnected();
    XLog.debug('[useConnect] isconnect=', _f);
    setConnected(_f);
    return _f;
  }, []);

  const connect = useCallback(
    async ({ chain, jwt = '' }: { chain?: ChainInfo; jwt?: string }) => {
      chain && (await particleBase.setChainInfo(chain));
      const res = await particleAuthCore.connectJWT(jwt);
      await checkConnectStatus();
      return res;
    },
    [checkConnectStatus]
  );

  const disconnect = useCallback(async () => {
    particleAuthCore.disconnect().finally(checkConnectStatus);
  }, [checkConnectStatus]);

  useEffect(() => {
    checkConnectStatus();
  }, [checkConnectStatus]);

  return {
    connected,
    connect,
    disconnect,
  };
};

export const useEthereum = () => {
  const [chainInfo, setChainInfo] = useState(Ethereum);
  const [address, setAddress] = useState<string | null>(null);

  const allChains = useMemo(() => chains.getAllChainInfos(), []);

  const refreshAddress = useCallback(async () => {
    const _info = await particleBase.getChainInfo();
    setChainInfo(_info);

    const _addr = await evm.getAddress();
    setAddress(_addr);

    XLog.debug(
      '[useEthereum] chain=',
      _info.id,
      _info.name,
      'eoa_address=',
      _addr
    );
  }, []);

  const switchChain = useCallback(
    async (id: number) => {
      const _chain: ChainInfo = allChains.find((i) => i.id === id) || Ethereum;
      await particleAuthCore.switchChain(_chain);
      setChainInfo(_chain);
      refreshAddress();
    },
    [allChains, refreshAddress]
  );

  const signMessage = useCallback(
    (message: string, uniq?: boolean): Promise<string> => {
      // { "redirect_type": "", "signature": "0x0ddbdc76b9daa4680d496eb7321f5326b79b7f0c4f875219edd96dbb0aa5d023296e22b31d48eba1ba88ef35b98993993b7b6b18734ed6f06c58d2044a8373931b" }
      // { "code": 70001, "message": "User cancel" }
      return new Promise((resolve, reject) => {
        (uniq ? evm.personalSignUnique(message) : evm.personalSign(message))
          .then((res) => {
            const result = (res as any)?.signature || '';
            XLog.debug('[useEthereum] sign message success:', result);
            resolve(result as string);
          })
          .catch((err: CommonError) => {
            XLog.debug('[useEthereum] sign message error:', err);
            reject(err);
          });
      });
    },
    []
  );

  useEffect(() => {
    refreshAddress();
  }, [refreshAddress]);

  return {
    chains: allChains,
    chainInfo,
    address,
    switchChain,
    signMessage,
  };
};

export const useAuthCore = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    XLog.debug('[useAuthCore] userinfo=', userInfo);
  }, [userInfo]);

  useEffect(() => {
    particleAuthCore.getUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);

  const openWallet = useCallback(() => {
    particleAuthCore.openAccountAndSecurity();
  }, []);

  return {
    userInfo,
    openWallet,
  };
};

export type ERC4337Options = {
  name: string;
  version: string;
};

export const useCustomize = () => {
  const [erc4337, _setERC4337] = useState<ERC4337Options | undefined>(
    undefined
  );
  const setERC4337 = useCallback((erc?: ERC4337Options) => {
    _setERC4337(erc);
  }, []);
  return {
    erc4337,
    setERC4337,
  };
};

export const getEVMPublicAddress = async ({
  chainId,
  erc4337,
}: {
  chainId?: number;
  erc4337?: ERC4337Options;
}) => {
  const _chain = chains.getAllChainInfos().find((i) => i.id === chainId);
  _chain && (await particleBase.setChainInfo(_chain));
  const _eoaAddress = await evm.getAddress();

  const smartAccountParam = {
    name: erc4337?.name || '',
    version: erc4337?.version || '',
    ownerAddress: _eoaAddress,
  };
  const result = await EvmService.getSmartAccount([smartAccountParam]);
  return result?.[0]?.smartAccountAddress || '';
};
