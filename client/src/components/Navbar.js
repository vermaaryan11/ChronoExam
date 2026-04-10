import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUserContext } from '../store/UserStore';
import NotificationTray from './NotificationTray';

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const { user, logout } = useUserContext();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const isAuthPage = ['/', '/student-login', '/admin-login'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => history.push('/')}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-display font-bold gradient-text tracking-tight">
                ChronoExam
              </span>
              <span className="hidden sm:block text-[10px] text-text-muted font-medium tracking-widest uppercase -mt-1">
                VIT Chennai
              </span>
            </div>
          </div>

            {/* Right Side */}
          <div className="flex items-center gap-4">
            {!isAuthPage && user && (
              <>
                {/* Notification Bell */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2.5 rounded-xl border border-white/5 hover:bg-white/5 transition-all relative group"
                  >
                    <svg className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent border-2 border-surface shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                  </button>
                  {showNotifications && (
                    <NotificationTray onClose={() => setShowNotifications(false)} />
                  )}
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-light">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-text-secondary font-medium capitalize">
                    {user.role === 1 ? 'Admin' : 'Student'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-white hover:bg-danger/20 border border-transparent hover:border-danger/30 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
            {isAuthPage && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-light">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-text-muted font-medium">Secure Portal</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
