import { Contract, type ContractInterface, ethers } from 'ethers';

/**
 * 区分区块链网络的名称，平台前后端统一定义的枚举类型
 * 注意：请勿和ethers、web3等第三方库中的network定义混淆
 */
export enum NETWORK_NAME {
  ETHEREUM = 'ETHEREUM',
  BSC = 'BSC',
  OPBNB = 'OPBNB',
  ARBITRUM = 'ARBITRUM',
  POLYGON = 'POLYGON',
  XTERIO = 'XTERIO',
  XTERIO_ETH = 'XTERIO_ETH',
  BASE = 'BASE',

  GOERLI = 'GOERLI',
  SEPOLIA = 'SEPOLIA',
  BSC_TESTNET = 'BSC_TESTNET',
  OPBNB_TESTNET = 'OPBNB_TESTNET',
  XTERIO_TESTNET = 'XTERIO_TESTNET',
}

export const getJsonRPCUrl = (network?: string) => {
  switch (network) {
    case NETWORK_NAME.ETHEREUM:
      return 'https://ethereum.publicnode.com';
    case NETWORK_NAME.ARBITRUM:
      return 'https://arbitrum-one.publicnode.com';
    case NETWORK_NAME.POLYGON:
      return 'https://polygon-bor.publicnode.com';
    case NETWORK_NAME.OPBNB:
      return 'https://opbnb-mainnet-rpc.bnbchain.org';
    case NETWORK_NAME.BSC:
      return 'https://bsc-dataseed.bnbchain.org';
    case NETWORK_NAME.XTERIO:
      return 'https://xterio-bnb.alt.technology';
    case NETWORK_NAME.XTERIO_ETH:
      return 'https://xterio-eth.alt.technology';
    case NETWORK_NAME.BASE:
      return 'https://mainnet.base.org';
    case NETWORK_NAME.BSC_TESTNET:
      return 'https://bsc-testnet-rpc.publicnode.com';
    // return 'https://data-seed-prebsc-2-s1.binance.org:8545'
    case NETWORK_NAME.GOERLI:
      return 'https://eth-goerli.public.blastapi.io';
    case NETWORK_NAME.SEPOLIA:
      return 'https://ethereum-sepolia-rpc.publicnode.com';
    case NETWORK_NAME.OPBNB_TESTNET:
      return 'https://opbnb-testnet-rpc.bnbchain.org';
    case NETWORK_NAME.XTERIO_TESTNET:
      return 'https://xterio-testnet.alt.technology/';
    default:
      throw new Error('unsupported network: ' + network);
  }
};

export const getContract = (
  network: NETWORK_NAME,
  contractAddress: string,
  abi: ContractInterface,
) => {
  const provider = new ethers.providers.JsonRpcProvider(getJsonRPCUrl(network));
  // const contractAddress = ''
  // const abi = ''
  const contract = new Contract(contractAddress, abi, provider);
  return contract;
};
