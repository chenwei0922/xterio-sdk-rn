import * as particleAuthCore from '@particle-network/rn-auth-core';
import * as particleBase from '@particle-network/rn-base';
import { ParticleInfo, Env } from '@particle-network/rn-base';
import * as particleAA from '@particle-network/rn-aa';

import { Ethereum } from '@particle-network/chains';
import type { IUseConfigState } from './useConfig';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { XLog } from '../common/utils';
import aaOptions from '../common/config/erc4337';
import {
  getEVMPublicAddress,
  useAuthCore,
  useConnect,
  useCustomize,
  useEthereum,
} from './authkit';

export const usePnWallet = (env: IUseConfigState, init_address?: string) => {
  const { connected, connect, disconnect } = useConnect();
  const { chainInfo, address, chains, switchChain } = useEthereum();
  const { erc4337, setERC4337 } = useCustomize();
  const { userInfo } = useAuthCore();

  const [mouted, setMounted] = useState(false);
  const [pnAAWalletAddress, setPnAAWalletAddress] = useState<
    string | undefined
  >(undefined);

  const aaNetworkConfig = useMemo(() => {
    if (!erc4337) {
      return [];
    } else {
      const version = erc4337.version || '1.0.0';
      return (
        aaOptions.accountContracts[
          erc4337.name as keyof typeof aaOptions.accountContracts
        ].find((item) => item.version === version)?.chainIds || []
      );
    }
  }, [erc4337]);

  const erc4337On = useCallback(
    (open: boolean) => {
      if (open) {
        setERC4337({
          name: 'XTERIO',
          version: '1.0.0',
        });
      } else {
        setERC4337(undefined);
      }
    },
    [setERC4337]
  );

  const connectPnEoA = useCallback(
    async (jwt?: string, _chainId?: number) => {
      const targetChain = chains?.find((c) => c.id === _chainId);
      const res = await connect({ chain: targetChain, jwt })
        .then((userInfo) => {
          XLog.info('connect pn eoa success');
          return userInfo;
        })
        .catch((error: Error) => {
          XLog.error('connect pn eoa error', error, targetChain, chains);
          return undefined;
        });
      return res;
    },
    [chains, connect]
  );

  const connectPnAA = useCallback(
    async (_chainId?: number, _eoaAddress?: string) => {
      if (_eoaAddress) {
        erc4337On(true);
        const chainId = _chainId || chainInfo.id;
        let erc4337Config;
        if (erc4337 && aaNetworkConfig.includes(chainId)) {
          erc4337Config = erc4337;
        }

        const aaAddress = await getEVMPublicAddress({
          chainId: chainId,
          erc4337: erc4337Config,
        })
          .then((_aaAddress) => {
            setPnAAWalletAddress(_aaAddress);
            XLog.info('connect pn aa success');
            return _aaAddress;
          })
          .catch((error) => {
            XLog.error('connect pn aa error', error);
          });
        return {
          aaAddress,
          eoaAddress: _eoaAddress || address || init_address || '',
          ...erc4337Config,
        };
      } else {
        setPnAAWalletAddress(undefined);
        return {};
      }
    },
    [aaNetworkConfig, address, chainInfo.id, erc4337, erc4337On, init_address]
  );

  const connectPnEoAAndAA = useCallback(
    async (jwt?: string, _chainId?: number) => {
      if (connected) {
        XLog.info('connected');
        return;
      }
      XLog.debug('connect pn eoa');
      const _userInfo = await connectPnEoA(jwt, _chainId);
      XLog.debug('connect pn aa');
      const _eoaAddress = _userInfo?.wallets.find(
        (w) => w.chain_name === 'evm_chain'
      )?.public_address;
      await connectPnAA(_chainId, _eoaAddress);
    },
    [connectPnAA, connectPnEoA, connected]
  );

  const initLogic = useCallback(() => {
    ParticleInfo.projectId = '63afedf8-0ebc-4474-b911-45f22dd0f4d2';
    ParticleInfo.clientKey = 'c9ZWwJOsJUTJjmMWajCL9hcMqczgS19U5RfEvwlD';

    if (ParticleInfo.projectId == '' || ParticleInfo.clientKey == '') {
      throw new Error(
        'You need set project info, get your project id and client from dashboard, https://dashboard.particle.network'
      );
    }

    const chainInfo = Ethereum;
    const env = Env.Dev;
    particleBase.init(chainInfo, env);
    particleAuthCore.init();

    particleAA.init({
      name: 'XTERIO',
      version: '1.0.0',
    });
  }, []);

  useEffect(() => {
    //init
    if (mouted) return;
    setMounted(true);
    initLogic();
  }, [initLogic, mouted]);

  return {
    isLogin: !!connected,
    pnUserInfo: userInfo,
    eoaAddress: address || '',
    pnAAWalletAddress,
    connectPnEoA,
    connectPnAA,
    connectPnEoAAndAA,
    disconnectPnEoA: disconnect,
    switchChain,
  };
};
