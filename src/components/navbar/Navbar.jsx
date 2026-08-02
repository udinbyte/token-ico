import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiBook,
  FiMap,
  FiFileText,
  FiCompass,
  FiActivity,
  FiCpu,
  FiLayers,
  FiDatabase,
  FiCode,
  FiUser,
} from 'react-icons/fi';
import { RiWallet3Line } from 'react-icons/ri';
import CustomConnectButton from '../ConnectButton';

// ============ ENV ============
const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME || 'ANJROT';
const TOKEN_SYMBOL = import.meta.env.VITE_TOKEN_SYMBOL || 'ANJROT';
const EXPLORER_TOKEN_URL = import.meta.env.VITE_EXPLORER_TOKEN_URL || 'https://polygonscan.com/token/';
const EXPLORER_ADDRESS_URL = import.meta.env.VITE_EXPLORER_ADDRESS_URL || 'https://polygonscan.com/address/';
const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS || '0x...';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);

  // ============ SCROLL DETECT ============
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============ CLICK OUTSIDE ============
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ============ MENU HANDLERS ============
  const handleMenuHover = (menuId) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // ============ MEGA MENU ============
  const megaMenu = {
    ecosystem: {
      title: 'Ecosystem',
      columns: [
        {
          title: 'Core Technology',
          links: [
            {
              icon: <FiActivity className="text-orange-500" />,
              label: 'Anjrot AI',
              href: '#',
            },
            {
              icon: <FiCpu className="text-amber-500" />,
              label: 'Anjrot VM',
              href: '#',
            },
            {
              icon: <FiLayers className="text-orange-500" />,
              label: 'Anjrot Framework',
              href: '#',
            },
          ],
        },
        {
          title: 'Applications',
          links: [
            {
              icon: <FiCode className="text-amber-500" />,
              label: 'How To Buy',
              href: '#',
            },
            {
              icon: <FiCompass className="text-orange-500" />,
              label: 'Explorer',
              href: `${EXPLORER_TOKEN_URL}${TOKEN_ADDRESS}`,
            },
            {
              icon: <FiMap className="text-amber-500" />,
              label: 'Create Wallet',
              href: 'https://metamask.io/',
            },
          ],
        },
        {
          title: 'Community',
          links: [
            {
              icon: <FiFileText className="text-orange-500" />,
              label: 'Documentation',
              href: '#',
            },
            {
              icon: <FiBook className="text-amber-500" />,
              label: 'Referral',
              href: '#',
            },
            {
              icon: <FiCompass className="text-orange-500" />,
              label: 'Audits',
              href: '#',
            },
          ],
        },
      ],
      featuredBox: {
        title: 'Join Our Community',
        description:
          'Be part of the Anjrot revolution and help shape the future of AI-driven blockchain.',
        linkText: 'Join Discord',
        linkUrl: 'https://discord.gg/',
        bgClass: 'bg-orange-500/10',
      },
    },
    resources: {
      title: 'Resources',
      columns: [
        {
          title: 'Learn',
          links: [
            {
              icon: <FiFileText className="text-orange-500" />,
              label: 'Whitepaper',
              href: '#',
            },
            {
              icon: <FiMap className="text-orange-500" />,
              label: 'Import Token',
              href: '#',
            },
            {
              icon: <FiBook className="text-amber-500" />,
              label: 'Documentation',
              href: '#',
            },
          ],
        },
        {
          title: 'Tools',
          links: [
            {
              icon: <FiCompass className="text-orange-500" />,
              label: 'Block Explorer',
              href: `${EXPLORER_ADDRESS_URL}${TOKEN_ADDRESS}`,
            },
            {
              icon: <FiDatabase className="text-amber-500" />,
              label: 'Analytics',
              href: '/dashboard',
            },
            {
              icon: <FiCpu className="text-orange-500" />,
              label: 'Dashboard',
              href: '/dashboard',
            },
          ],
        },
      ],
      featuredBox: {
        title: 'Start Building Today',
        description:
          'Access developer resources and start building on the Anjrot Protocol.',
        linkText: 'Developer Portal',
        linkUrl: '/dashboard',
        bgClass: 'bg-teal-500/10',
      },
    },
  };

  // ============ RENDER ============
  return (
    <header
      ref={menuRef}
      className={`w-full transition-all duration-500 backdrop-blur-md ease-out bg-gray-900/50 border-b border-gray-700/50 z-50 ${
        isScrolled ? 'fixed top-0 left-0 shadow-lg' : 'relative'
      }`}
    >
      {/* ============ MARQUEE / ANNOUNCEMENT BAR ============ */}
      {!isScrolled && (
        <div className="relative py-3 overflow-hidden whitespace-nowrap bg-gradient-to-r from-orange-500 to-amber-500">
          <div className="absolute inset-0 z-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px),
              radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }} />
          
          <div className="animate-marquee inline-block whitespace-nowrap text-white z-10 relative">
            <span className="mx-4 text-sm md:text-base font-medium">
              🚀 {TOKEN_NAME} Presale is NOW Live! Be part of the future - claim your discounted
              tokens and exclusive access to AI blockchain technology
              <span className="mx-2">🌍</span>
              Don't wait, join the innovation wave today! 🔥
            </span>
          </div>
        </div>
      )}

      {/* ============ MAIN NAVBAR ============ */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="relative w-10 h-10 mr-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full opacity-20"></div>
            <div className="absolute inset-1 flex items-center justify-center">
              <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
            </div>
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
            {TOKEN_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {/* Ecosystem Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuHover('ecosystem')}
            onMouseLeave={handleMenuLeave}
          >
            <button
              className={`flex items-center space-x-1 text-gray-300 hover:text-orange-500 transition ${
                activeMenu === 'ecosystem' ? 'text-orange-500' : ''
              }`}
            >
              <span>Ecosystem</span>
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  activeMenu === 'ecosystem' ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Resources Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuHover('resources')}
            onMouseLeave={handleMenuLeave}
          >
            <button
              className={`flex items-center space-x-1 text-gray-300 hover:text-orange-500 transition ${
                activeMenu === 'resources' ? 'text-orange-500' : ''
              }`}
            >
              <span>Resources</span>
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  activeMenu === 'resources' ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          <Link
            to={`${EXPLORER_TOKEN_URL}${TOKEN_ADDRESS}`}
            target="_blank"
            className="text-gray-300 hover:text-orange-500 transition"
          >
            Explorer
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-orange-500 transition"
          >
            Dashboard
          </Link>
        </nav>

        {/* Right Side - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/dashboard" className="group">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
              <FiUser className="text-white" />
            </div>
          </Link>
          <CustomConnectButton active={true} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition"
        >
          {isOpen ? <FiX className="w-6 h-6 text-white" /> : <FiMenu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* ============ MEGA MENU DROPDOWN ============ */}
      {Object.keys(megaMenu).map((menuKey) => {
        const menu = megaMenu[menuKey];
        return (
          <div
            key={menuKey}
            className={`absolute left-0 w-full z-40 transition-all duration-300 transform ${
              activeMenu === menuKey
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            } bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 shadow-2xl`}
            onMouseEnter={() => handleMenuHover(menuKey)}
            onMouseLeave={handleMenuLeave}
          >
            <div className="container mx-auto px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menu.columns.map((column, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                      {column.title}
                    </h3>
                    <ul className="space-y-2">
                      {column.links.map((link, lid) => (
                        <li key={lid}>
                          <Link
                            to={link.href}
                            target={link.href.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            onClick={() => setActiveMenu(null)}
                            className="flex items-center space-x-3 py-1.5 transition-colors duration-200 text-gray-300 hover:text-orange-500 group"
                          >
                            <span className="text-lg group-hover:scale-110 transition-transform">
                              {link.icon}
                            </span>
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured Box */}
                <div className={`rounded-xl p-6 ${menu.featuredBox.bgClass} border border-gray-700/30`}>
                  <h3 className="text-xl font-bold bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 text-transparent mb-2">
                    {menu.featuredBox.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{menu.featuredBox.description}</p>
                  <Link
                    to={menu.featuredBox.linkUrl}
                    target={menu.featuredBox.linkUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center space-x-2 font-medium text-orange-500 hover:text-orange-400 transition"
                  >
                    <span>{menu.featuredBox.linkText}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ============ MOBILE MENU ============ */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-4/5 max-w-xs transform transition-transform duration-300 ease-in-out bg-gray-900/95 backdrop-blur-md border-l border-gray-700/50 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        <div className="p-5 border-b border-gray-700 flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              {TOKEN_NAME}
            </span>
          </Link>
          <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-800 rounded-lg transition">
            <FiX className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="p-5 space-y-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Menu</p>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-300 hover:text-orange-500 transition"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-300 hover:text-orange-500 transition"
            >
              Dashboard
            </Link>
            <Link
              to={`${EXPLORER_TOKEN_URL}${TOKEN_ADDRESS}`}
              target="_blank"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-300 hover:text-orange-500 transition"
            >
              Explorer
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Ecosystem</p>
            {megaMenu.ecosystem.columns.map((column, idx) => (
              <div key={idx} className="ml-2 mb-3">
                <p className="text-sm text-gray-500 font-medium">{column.title}</p>
                {column.links.map((link, lid) => (
                  <Link
                    key={lid}
                    to={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 py-1.5 pl-2 text-gray-400 hover:text-orange-500 transition text-sm"
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-700">
            <CustomConnectButton active={true} childStyle="w-full justify-center"  />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;