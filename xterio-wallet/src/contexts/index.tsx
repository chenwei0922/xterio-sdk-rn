import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import type { IXterioWalletContextProps } from '../interfaces/types';

import { XLog } from '../common/utils';
import { usePnWallet } from './pnWallet';
import {
  XterEventEmiter,
  XTERIO_EVENTS,
  XterioAuth,
  XterioAuthTokensManager,
  type IUserInfo,
} from '@xterio-sdk/rn-auth';
import { XterioWalletService } from '../modules/WalletService';
import { useConfig, type IUseConfigState } from './useConfig';

const initState = {
  aaAddress: '',
  isConnect: false,
  // openWallet: () => {},
  connectWallet: () => {},
  disconnectWallet: () => {},
  obtainWallet: () => {},
};

interface IWalletContextState {
  eoaAddress: string;
  aaAddress: string;
  isConnect: boolean;
  openWallet(): void;
  connectWallet(chainId?: number): Promise<void>;
  disconnectWallet(): Promise<void>;
  obtainWallet(): Promise<void>;
  switchChain(id: number): Promise<void>;
  signMessage(message: string, uniq?: boolean): Promise<string>;
  envConfig?: IUseConfigState;
}

const WalletContext = createContext<IWalletContextState>(
  initState as IWalletContextState
);

const WalletContextProvider: React.FC<
  PropsWithChildren<IXterioWalletContextProps>
> = ({ children, ...rest }) => {
  const { env, transactionMode } = rest;
  const envConfig = useConfig(env, transactionMode);

  const [aaAddress, setAaAddress] = useState('');
  const [mounted, setMounted] = useState<boolean>();

  const {
    connectPnEoAAndAA,
    disconnectPnEoA,
    connectPnEoA,
    connectPnAA,
    switchChain,
    pnUserInfo: _p,
    isLogin: isPnLogin,
    pnEoaAddress,
    openWallet,
    signMessage,
    // signTypedData,
    // pnAA,
  } = usePnWallet();

  const isPnLoginedRef = useRef(isPnLogin);

  useEffect(() => {
    isPnLoginedRef.current = isPnLogin;
  }, [isPnLogin]);

  const obtainWallet = useCallback(async () => {
    if (!XterioAuth.isLogin) {
      XLog.info('please login first');
      return;
    }
    if (aaAddress) {
      XLog.info('have aa address already, cannot obtain again');
      return;
    }
    XLog.debug('have no aa address, go to obtain');
    let pnUserInfo = _p;
    if (!isPnLoginedRef.current) {
      XLog.debug('go to connnect pn eoa');
      pnUserInfo = await connectPnEoA();
    }
    const { token = '', uuid = '' } = pnUserInfo || {};
    const _eoaAddress = pnUserInfo?.wallets.find(
      (w) => w.chain_name === 'evm_chain'
    )?.public_address;
    const {
      aaAddress: pnAaAddress,
      eoaAddress = '',
      name = '',
      version = '',
    } = await connectPnAA(undefined, _eoaAddress);
    if (!pnAaAddress) {
      XLog.error('Failed to create the Xterio Wallet.');
      return;
    }
    const { error } = await XterioWalletService.bindAAWallet({
      address: pnAaAddress,
      pn_uuid: uuid,
      pn_token: token,
      owner_address: eoaAddress,
      wallet_name: name,
      wallet_version: version,
    });
    if (!error) {
      //refresh userinfo
      await XterioWalletService.getUserInfo();
      XLog.info(
        'An Xterio Wallet has been created for your account. You can also pair your own wallet.'
      );
    } else {
      XLog.info('Failed to create the Xterio Wallet.');
    }
  }, [_p, aaAddress, connectPnAA, connectPnEoA]);

  const connectWallet = useCallback(
    async (chainId?: number) => {
      XLog.debug('connect wallet');
      if (!XterioAuth.isLogin) {
        XLog.info('please login first');
        return;
      }
      await connectPnEoAAndAA(XterioAuthTokensManager.idToken, chainId);
    },
    [connectPnEoAAndAA]
  );

  const disconnectWallet = useCallback(async () => {
    XLog.debug('disconnect wallet');
    await disconnectPnEoA();
  }, [disconnectPnEoA]);

  const initLogic = useCallback(
    async (info?: IUserInfo) => {
      const _addr = info?.wallet?.find((i) => i.source === 2)?.address || '';
      setAaAddress(_addr);
      const _uuid = info?.uuid;
      const pn_jwt_id = _p?.jwt_id;

      //1.当前用户无aa地址，上次登录用户有地址且pn已连接，断开连接
      //2.当前用户有aa地址
      //2.1 pn未连接，去连
      //2.2 pn已连接，与上次登录用户不一致，断开重连
      if (XterioAuth.isLogin && _addr) {
        XLog.debug('init logic', isPnLoginedRef.current, _uuid, pn_jwt_id);
        if (!isPnLoginedRef.current) {
          XLog.debug('init logic, reconnect wallet');
          await connectWallet();
        } else if (_uuid && pn_jwt_id && !pn_jwt_id.endsWith(_uuid)) {
          XLog.debug(
            'init logic, aa address not equal, disconnect and reconnect'
          );
          await disconnectWallet();
          await connectWallet();
        }
      } else if (XterioAuth.isLogin && !_addr && isPnLoginedRef.current) {
        XLog.debug(
          'init logic',
          isPnLoginedRef.current,
          'aa address is null only disconnect'
        );
        await disconnectWallet();
      }
    },
    [_p?.jwt_id, connectWallet, disconnectWallet]
  );

  useEffect(() => {
    if (mounted) return;
    setMounted(true);
    XLog.info('wallet initial');

    //the userinfo emiter
    const unsubscribe = XterEventEmiter.subscribe((res: IUserInfo) => {
      XLog.info('emiter auth userinfo=', res);
      initLogic(res);
    }, XTERIO_EVENTS.ACCOUNT);

    //the logout emiter
    const logout_unsub = XterEventEmiter.subscribe(() => {
      XLog.info('emiter logout');
      setAaAddress('');
      disconnectWallet();
    }, XTERIO_EVENTS.LOGOUT);

    return () => {
      if (mounted) {
        unsubscribe?.();
        logout_unsub?.();
      }
    };
  }, [disconnectWallet, initLogic, mounted]);

  return (
    <WalletContext.Provider
      value={{
        eoaAddress: pnEoaAddress,
        aaAddress,
        isConnect: !!isPnLogin,
        obtainWallet,
        connectWallet,
        disconnectWallet,
        switchChain,
        envConfig,
        openWallet,
        signMessage,
        // signTypedData,
        // pnAA,
        // envConfig,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const XterioWalletProvider: React.FC<
  PropsWithChildren<IXterioWalletContextProps>
> = (props) => {
  XLog.setLogLevel(props?.logLevel || 1);
  return <WalletContextProvider {...props} />;
};

export const useXterioWalletContext = (): IWalletContextState => {
  return useContext(WalletContext);
};
