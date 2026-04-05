import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 radial-glow grid-pattern">
      {/* Background Orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto animate-fade-in">
        {/* Hero Icon */}
        <div className="mb-8 inline-flex">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl animate-pulse-glow">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4 tracking-tight">
          <span className="gradient-text">ChronoExam</span>
        </h1>
        <p className="text-text-secondary text-lg mb-2 font-medium">
          University Exam Scheduling System
        </p>
        <p className="text-text-muted text-sm mb-12 tracking-wider uppercase">
          VIT Chennai
        </p>

        {/* Login Cards */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Student Card */}
          <button
            id="student-login-btn"
            onClick={() => history.push('/student-login')}
            className="group w-full sm:w-72 p-6 rounded-2xl glass hover:bg-surface-hover border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300">
              <svg className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
              </svg>
            </div>
            <h2 className="text-lg font-display font-semibold text-text-primary mb-1">
              Login as Student
            </h2>
            <p className="text-sm text-text-muted">
              View your exam schedule & details
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Continue</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          {/* Divider */}
          <div className="hidden sm:flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-border" />
            <span className="text-text-muted text-xs font-medium">OR</span>
            <div className="w-px h-8 bg-border" />
          </div>
          <div className="sm:hidden flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-muted text-xs font-medium">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Admin Card */}
          <button
            id="admin-login-btn"
            onClick={() => history.push('/admin-login')}
            className="group w-full sm:w-72 p-6 rounded-2xl glass hover:bg-surface-hover border border-border hover:border-accent/40 transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-all duration-300">
              <svg className="w-7 h-7 text-accent group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 className="text-lg font-display font-semibold text-text-primary mb-1">
              Login as Admin
            </h2>
            <p className="text-sm text-text-muted">
              Manage exam schedules & settings
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Continue</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-text-muted text-xs">
          © 2026 ChronoExam · VIT Chennai · Secure Exam Portal
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
