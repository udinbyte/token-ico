import { http, createConfig } from 'wagmi';
import { sepolia, polygon } from 'wagmi/chains';
import { metaMask, walletConnect, injected } from 'wagmi/connectors';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// ============ RAINBOWKIT CONFIG ============
export const config = getDefaultConfig({
  appName: 'ANJROT',
  projectId: projectId,
  chains: [sepolia], // atau [polygon]
  ssr: false,
});

// ============ CONTRACT ADDRESS ============
export const CONTRACT_ADDRESS = {
  TOKEN: (import.meta.env.VITE_TOKEN_ADDRESS || '0x...'),
  ICO: (import.meta.env.VITE_TOKEN_ICO_ADDRESS || '0x...'),
  OWNER: (import.meta.env.VITE_OWNER_ADDRESS || '0x...'),
};

// ============ TOKEN INFO ============
export const TOKEN_INFO = {
  name: import.meta.env.VITE_TOKEN_NAME,
  symbol: import.meta.env.VITE_TOKEN_SYMBOL,
  decimals: parseInt(import.meta.env.VITE_TOKEN_DECIMAL || '18'),
  supply: import.meta.env.VITE_TOKEN_SUPPLY,
  price: parseFloat(import.meta.env.VITE_PER_TOKEN_USD_PRICE),
  logo: import.meta.env.VITE_TOKEN_LOGO,
};

// ============ ABI ============
export const TOKEN_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const ICO_ABI = [
  // Read functions
  {
    inputs: [],
    name: 'ethPriceForToken',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokensSold',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'saleToken',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractInfo',
    outputs: [
      { name: 'tokenAddress', type: 'address' },
      { name: 'tokenSymbol', type: 'string' },
      { name: 'tokenDecimals', type: 'uint8' },
      { name: 'tokenBalance', type: 'uint256' },
      { name: 'ethPrice', type: 'uint256' },
      { name: 'totalSold', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  // Write functions
  {
    inputs: [],
    name: 'buyToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'newPrice', type: 'uint256' }],
    name: 'updateTokenPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_token', type: 'address' }],
    name: 'setSaleToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawAllTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'tokenAddress', type: 'address' }],
    name: 'rescueTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];