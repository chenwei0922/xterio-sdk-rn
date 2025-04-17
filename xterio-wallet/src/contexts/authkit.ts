import { useCallback, useEffect, useMemo, useState } from 'react';
import * as particleAuthCore from '@particle-network/rn-auth-core';
import * as particleBase from '@particle-network/rn-base';
import {
  chains,
  Ethereum,
  type ChainId,
  type ChainInfo,
} from '@particle-network/chains';
import { evm, type CommonError } from '@particle-network/rn-auth-core';
import { EvmService, type UserInfo } from '@particle-network/rn-base';
import { XLog } from '../common/utils';
import { ethers } from 'ethers';

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

const cacheProvider: Map<ChainId, Provider> = new Map();

export const useEthereum = () => {
  const [chainInfo, setChainInfo] = useState(Ethereum);
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<Provider>();
  const [chainId, setChainId] = useState<number>();

  const allChains = useMemo(() => chains.getAllChainInfos(), []);

  const refreshAddress = useCallback(async () => {
    const _info = await particleBase.getChainInfo();
    setChainInfo(_info);
    setChainId(_info.id);

    const _addr = await evm.getAddress();
    setAddress(_addr);

    const _chain_id = _info.id;
    if (Object.keys(rpcs).includes(_chain_id.toString())) {
      if (!cacheProvider.get(_chain_id)) {
        cacheProvider.set(
          _chain_id,
          new ethers.providers.JsonRpcProvider(rpcs[_chain_id])
        );
      }
      setProvider(cacheProvider.get(_chain_id));
    } else {
      setProvider(undefined);
    }
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
    chainId,
    provider,
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

const rpcs: Record<number, string> = {
  1: `https://ethereum.publicnode.com`,
  42161: `https://arbitrum-one.publicnode.com`,
  137: `https://polygon-bor.publicnode.com`,
  204: `https://opbnb-mainnet-rpc.bnbchain.org`,
  56: 'https://bsc-dataseed.bnbchain.org',
  112358: `https://xterio-bnb.alt.technology`,
  2702128: `https://xterio-eth.alt.technology`,
  8453: `https://mainnet.base.org`,
  97: 'https://bsc-testnet-rpc.publicnode.com',
  // return 'https://data-seed-prebsc-2-s1.binance.org:8545'
  5: 'https://eth-goerli.public.blastapi.io',
  11155111: `https://ethereum-sepolia-rpc.publicnode.com`,
  5611: `https://opbnb-testnet-rpc.bnbchain.org`,
  1637450: `https://xterio-testnet.alt.technology/`,
};
export type Provider = ethers.providers.JsonRpcProvider;
