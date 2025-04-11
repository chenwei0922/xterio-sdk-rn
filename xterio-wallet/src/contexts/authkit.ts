import { useCallback, useEffect, useMemo, useState } from 'react';
import * as particleAuthCore from '@particle-network/rn-auth-core';
import * as particleBase from '@particle-network/rn-base';
import { chains, Ethereum, type ChainInfo } from '@particle-network/chains';
import { evm } from '@particle-network/rn-auth-core';
import { EvmService, type UserInfo } from '@particle-network/rn-base';

export const useConnect = () => {
  const [connected, setConnected] = useState(false);

  const checkConnectStatus = useCallback(async () => {
    const _f = await particleAuthCore.isConnected();
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
    await particleAuthCore.disconnect();
    await checkConnectStatus();
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

  useEffect(() => {
    refreshAddress();
  }, [refreshAddress]);

  return {
    chains: allChains,
    chainInfo,
    address,
    switchChain,
  };
};

export const useAuthCore = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    particleAuthCore.getUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);

  const openWallet = useCallback(() => { }, []);

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
