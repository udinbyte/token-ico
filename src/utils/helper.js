import { formatEther, formatUnits } from 'viem';

// ============ FORMATTING ============
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const formatTokenAmount = (amount, decimals = 18) => {
  if (!amount) return '0';
  return formatUnits(amount, decimals);
};

export const formatEth = (amount) => {
  if (!amount) return '0';
  return formatEther(amount);
};

// ============ TRANSACTION ERROR HANDLING ============
export const handleTransactionError = (error, context = 'transaction') => {
  console.error(`Error in ${context}:`, error);

  let errorMessage = 'Transaction Failed';
  let errorCode = 'UNKNOWN_ERROR';

  // Check for user rejection
  if (
    error?.message?.includes('user rejected') ||
    error?.message?.includes('rejected transaction') ||
    error?.message?.includes('User denied') ||
    error?.code === 'ACTION_REJECTED' ||
    error?.code === 4001
  ) {
    errorMessage = 'Transaction rejected by user';
    errorCode = 'ACTION_REJECTED';
  }
  // Check for insufficient funds
  else if (error?.code === 'INSUFFICIENT_FUNDS' || error?.code === -32000) {
    errorMessage = 'Insufficient funds for transaction';
    errorCode = 'INSUFFICIENT_FUNDS';
  }
  // Check for contract revert
  else if (error?.message?.includes('insufficient funds')) {
    errorMessage = 'Insufficient funds for gas';
    errorCode = 'INSUFFICIENT_FUNDS';
  } else if (error?.message?.includes('gas required exceeds allowance')) {
    errorMessage = 'Gas required exceeds your balance';
    errorCode = 'INSUFFICIENT_FUNDS';
  } else if (error?.message?.includes('nonce too low')) {
    errorMessage = 'Transaction with same nonce already processed';
    errorCode = 'NONCE_ERROR';
  } else if (error?.message?.includes('replacement transaction underpriced')) {
    errorMessage = 'Gas price too low to replace pending transaction';
    errorCode = 'GAS_PRICE_ERROR';
  } else if (error?.shortMessage) {
    errorMessage = error.shortMessage;
  } else if (error?.message) {
    errorMessage = error.message.split('\n')[0];
  }

  return { message: errorMessage, code: errorCode };
};

// ============ LOCAL STORAGE ============
export const saveTransactionToLocalStorage = (txData) => {
  try {
    const existing = JSON.parse(localStorage.getItem('tokenTransactions') || '[]');
    existing.push({
      ...txData,
      timestamp: Date.now(),
    });
    localStorage.setItem('tokenTransactions', JSON.stringify(existing));
    console.log('Transaction saved to localStorage');
  } catch (error) {
    console.error('Failed to save transaction:', error);
  }
};

export const getTransactions = () => {
  try {
    return JSON.parse(localStorage.getItem('tokenTransactions') || '[]');
  } catch {
    return [];
  }
};

// ============ ID GENERATOR ============
export const generateId = () => {
  return `tx-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
};

// ============ ADD TO METAMASK ============
export const addTokenToMetamask = async (tokenAddress, symbol, decimals, logo) => {
  try {
    const wasAdded = await window.ethereum?.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: symbol,
          decimals: decimals,
          image: logo,
        },
      },
    });
    return wasAdded;
  } catch (error) {
    console.error('Failed to add token:', error);
    return false;
  }
};