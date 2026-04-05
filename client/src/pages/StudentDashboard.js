import React from 'react';

const PLACEHOLDER_EXAMS = [
  { id: 1, subject: 'Data Structures & Algorithms', date: '2026-04-15', time: '09:00 AM - 12:00 PM', venue: 'Hall A', status: 'upcoming' },
  { id: 2, subject: 'Operating Systems', date: '2026-04-17', time: '02:00 PM - 05:00 PM', venue: 'Hall B', status: 'upcoming' },
  { id: 3, subject: 'Database Management Systems', date: '2026-04-20', time: '09:00 AM - 12:00 PM', venue: 'Hall C', status: 'upcoming' },
  { id: 4, subject: 'Computer Networks', date: '2026-04-22', time: '10:00 AM - 01:00 PM', venue: 'Hall A', status: 'upcoming' },
  { id: 5, subject: 'Software Engineering', date: '2026-04-25', time: '02:00 PM - 05:00 PM', venue: 'Hall D', status: 'upcoming' },
];

const StudentDashboard = () => {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8 radial-glow">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-text-primary mb-1">
                Welcome back, <span className="gradient-text">Student</span>
              </h1>
              <p className="text-text-muted text-sm">Here's your upcoming exam schedule</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-light">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="text-xs text-text-secondary font-medium">April 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Exams', value: '5', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'primary' },
            { label: 'Next Exam', value: 'Apr 15', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'accent' },
            { label: 'Days Left', value: '11', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'info' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass rounded-2xl p-5 hover:bg-surface-hover transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-display font-bold text-text-primary mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <svg className={`w-6 h-6 text-${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exam Schedule Table */}
        <div className="glass rounded-2xl overflow-hidden animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-display font-semibold text-text-primary">Exam Schedule</h2>
                <p className="text-xs text-text-muted">Your upcoming examination timetable</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium">{PLACEHOLDER_EXAMS.length} Upcoming</span>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full" id="exam-schedule-table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">#</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Subject</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Time</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Venue</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {PLACEHOLDER_EXAMS.map((exam, idx) => (
                  <tr
                    key={exam.id}
                    className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-text-muted">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-primary">{exam.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">{exam.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">{exam.venue}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Upcoming
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border/50">
            {PLACEHOLDER_EXAMS.map((exam, idx) => (
              <div key={exam.id} className="p-5 hover:bg-surface-hover/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-text-primary">{exam.subject}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    Upcoming
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {exam.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {exam.venue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
