import { ConnectButton } from '@rainbow-me/rainbowkit';
import { RiWallet3Line } from 'react-icons/ri';

export default function CustomConnectButton({ active, childStyle }) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              // ============ NOT CONNECTED ============
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className={`flex items-center px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-md transition-colors hover:shadow-lg hover:scale-105 ${childStyle || ''}`}
                  >
                    <RiWallet3Line className="mr-2" size={20} />
                    CONNECT WALLET
                  </button>
                );
              }

              // ============ WRONG NETWORK ============
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Wrong Network
                  </button>
                );
              }

              // ============ CONNECTED ============
              return (
                <div className="flex items-center gap-3">
                  {/* Chain Button */}
                  {active && (
                    <button
                      onClick={openChainModal}
                      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition border border-gray-700"
                    >
                      {chain.hasIcon && chain.iconUrl && (
                        <img
                          src={chain.iconUrl}
                          alt={chain.name ?? 'Chain icon'}
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <span className="text-sm hidden sm:inline">{chain.name}</span>
                    </button>
                  )}

                  {/* Account Button */}
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition"
                  >
                    <span>{account.displayName}</span>
                    {account.displayBalance && (
                      <span className="text-white/80 text-sm">
                        ({account.displayBalance})
                      </span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}