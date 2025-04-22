# @xterio-sdk/rn-wallet

xterio wallet service in react native

## Installation

```sh
npm install @xterio-sdk/rn-wallet 
npm install @xterio-sdk/rn-auth

# only ios
npx pod-install
# 或
cd ios && pod install && cd ..
```

## Usage

```tsx
import {
  SendTransactionMode,
  useXterioTransaction,
  useXterioWalletContext,
  XterioWalletProvider,
  IXterioWalletContextProps
} from '@xterio-sdk/rn-wallet';
// ...

//provider setup
const options:IXterioWalletContextProps = {
  env: Env.Dev,
  transactionMode:SendTransactionMode.Gasless,
}

<XterioWalletProvider {...options}>
  <AppView />
</XterioWalletProvider>

//useXterioWalletContext(), useXterioTransaction()
const {
  connectWallet,
  disconnectWallet,
  obtainWallet,
  switchChain,
  openWallet,
  signMessage,
  isConnect,
  aaAddress
} = useXterioWalletContext();

const { sendTransaction, sendUserOperation, state } = useXterioTransaction(erc20,'transfer');

```

## Configuration

### iOS
![iOS配置图](./docs/images/ios.png)

### Android

![Android配置图](./docs/images/android.png)

## API Reference

### `XterioWalletProvider`

the wallet context

```tsx
<XterioWalletProvider transactionMode={} PN_CHAIN_ID={} PN_PROJECT_ID={} PN_CLIENT_KEY={} PN_APP_ID={}>
  <AppView />
</XterioWalletProvider>
```

### `useXterioWalletContext()`

#### `aaAddress`
xterio user aa wallet address

#### `isConnect`
aa wallet connection status

#### `connectWallet(chainId?:number): Promise<void>`

#### `disconnectWallet(): Promise<void>`

#### `obtainWallet(): Promise<void>`

#### `switchChain(chainId:number): Promise<void>`

#### `signMessage(message: string, uniq?: boolean) :Promise<string>`

### `useXterioTransaction(contract?, funcName?)`

#### `state`
transaction status

#### `sendTransaction(...args:any[], tx?:TransactionParam)`
send a transaction

```ts
await sendTransaction?.(toAddr, amount, {value:'', gasLimit:''})
```

#### `sendUserOperation(tx: TransactionParam|TransactionParam[])`
send a transaction

```ts
await sendUserOperation?.({to:'', data:''})
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
