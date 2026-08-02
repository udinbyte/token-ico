import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useBalance, useSwitchChain } from 'wagmi';
import { parseEther, formatEther, formatUnits } from 'viem';
import { CONTRACT_ADDRESS, ICO_ABI, TOKEN_ABI, TOKEN_INFO } from '../config/wagmi';
import { useToast } from '../hooks/useToast';
import { handleTransactionError, saveTransactionToLocalStorage, addTokenToMetamask, formatAddress } from '../utils/helper';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { notify } = useToast();
  
  const [reCall, setReCall] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [globalLoad, setGlobalLoad] = useState(false);

  // ============ READ CONTRACTS ============
  // ICO Info
  const { data: ethPrice, refetch: refetchPrice } = useReadContract({
    address: CONTRACT_ADDRESS.ICO,
    abi: ICO_ABI,
    functionName: 'ethPriceForToken',
  });

  const { data: tokensSold, refetch: refetchSold } = useReadContract({
    address: CONTRACT_ADDRESS.ICO,
    abi: ICO_ABI,
    functionName: 'tokensSold',
  });

  const { data: saleToken, refetch: refetchSaleToken } = useReadContract({
    address: CONTRACT_ADDRESS.ICO,
    abi: ICO_ABI,
    functionName: 'saleToken',
  });

  const { data: ownerAddress, refetch: refetchOwner } = useReadContract({
    address: CONTRACT_ADDRESS.ICO,
    abi: ICO_ABI,
    functionName: 'owner',
  });

  // Token Balance
  const { data: tokenBalance, refetch: refetchTokenBalance } = useReadContract({
    address: CONTRACT_ADDRESS.TOKEN,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: contractTokenBalance, refetch: refetchContractTokenBalance } = useReadContract({
    address: CONTRACT_ADDRESS.TOKEN,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: [CONTRACT_ADDRESS.ICO],
  });

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: CONTRACT_ADDRESS.TOKEN,
    abi: TOKEN_ABI,
    functionName: 'totalSupply',
  });

  // ETH Balance
  const { data: ethBalance } = useBalance({
    address: address,
    query: { enabled: !!address },
  });

  const { data: contractEthBalance } = useBalance({
    address: CONTRACT_ADDRESS.ICO,
  });

  // ============ WRITE CONTRACT ============
  const { writeContract, isPending, error, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // ============ CHECK OWNER ============
  useEffect(() => {
    if (address && ownerAddress) {
      setIsOwner(address.toLowerCase() === ownerAddress.toLowerCase());
    }
  }, [address, ownerAddress]);

  // ============ REFETCH ============
  const refetchAll = useCallback(() => {
    refetchPrice();
    refetchSold();
    refetchSaleToken();
    refetchTokenBalance();
    refetchContractTokenBalance();
    refetchTotalSupply();
    refetchOwner();
  }, [refetchPrice, refetchSold, refetchSaleToken, refetchTokenBalance, refetchContractTokenBalance, refetchTotalSupply, refetchOwner]);

  useEffect(() => {
    if (isSuccess) {
      refetchAll();
      setReCall(prev => prev + 1);
    }
  }, [isSuccess, refetchAll]);

  // ============ CONTRACT FUNCTIONS ============
  const buyToken = useCallback(async (ethAmount) => {
    if (!address || !ethAmount) return;

    const toastId = notify.start(`Buying ${TOKEN_INFO.symbol} with ETH...`);

    try {
      writeContract({
        address: CONTRACT_ADDRESS.ICO,
        abi: ICO_ABI,
        functionName: 'buyToken',
        value: parseEther(ethAmount),
      });

      notify.update(toastId, 'loading', 'Waiting for confirmation...');

      // Wait for success
      return new Promise((resolve) => {
        const checkSuccess = setInterval(() => {
          if (isSuccess) {
            clearInterval(checkSuccess);
            const tokenPrice = parseFloat(TOKEN_INFO.price);
            const tokensReceived = parseFloat(ethAmount) / tokenPrice;

            saveTransactionToLocalStorage({
              user: address,
              tokenIn: 'ETH',
              tokenOut: TOKEN_INFO.symbol,
              amountIn: ethAmount,
              amountOut: tokensReceived.toString(),
              transactionType: 'BUY',
              hash: hash,
            });

            notify.complete(toastId, `Successfully purchased ${TOKEN_INFO.symbol} tokens!`);
            resolve(true);
          }
        }, 1000);
      });
    } catch (error) {
      const { message } = handleTransactionError(error, 'Buying tokens');
      notify.failed(toastId, message);
      return false;
    }
  }, [address, writeContract, isSuccess, hash, notify]);

  // ============ FORMATTING ============
  const formatTokenAmount = useCallback((amount) => {
    if (!amount) return '0';
    return formatUnits(amount, TOKEN_INFO.decimals);
  }, []);

  const formatEth = useCallback((amount) => {
    if (!amount) return '0';
    return formatEther(amount);
  }, []);

  // ============ VALUE ============
  const value = {
    // State
    address,
    isConnected,
    chainId,
    isOwner,
    globalLoad,
    reCall,
    
    // Data
    ethPrice: ethPrice ? formatEth(ethPrice) : '0',
    tokensSold: tokensSold ? formatTokenAmount(tokensSold) : '0',
    tokenBalance: tokenBalance ? formatTokenAmount(tokenBalance) : '0',
    contractTokenBalance: contractTokenBalance ? formatTokenAmount(contractTokenBalance) : '0',
    totalSupply: totalSupply ? formatTokenAmount(totalSupply) : '0',
    ethBalance: ethBalance ? formatEth(ethBalance.value) : '0',
    contractEthBalance: contractEthBalance ? formatEth(contractEthBalance.value) : '0',
    
    // Functions
    buyToken,
    refetchAll,
    setReCall,
    formatAddress,
    formatTokenAmount,
    formatEth,
    addTokenToMetamask: () => addTokenToMetamask(
      CONTRACT_ADDRESS.TOKEN,
      TOKEN_INFO.symbol,
      TOKEN_INFO.decimals,
      TOKEN_INFO.logo
    ),
    
    // Status
    isLoading: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};