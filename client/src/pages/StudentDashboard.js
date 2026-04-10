import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUserContext } from '../store/UserStore';
import ScheduleCalendar from '../components/ScheduleCalendar';
import ExportButton from '../components/ExportButton';

const StudentDashboard = () => {
  const { user } = useUserContext();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('list'); // 'list' or 'calendar'

  const fetchMyExams = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/schedule', {
        headers: { Authorization: `Token ${user.token}` }
      });
      if (res.data.data && res.data.data.subjects) {
          // In a real app, we'd filter by student's class on backend, 
          // but here we just show the schedule.
          setExams(res.data.data.subjects);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchMyExams();
  }, [fetchMyExams]);

    // Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState('');
    useEffect(() => {
        if (exams.length === 0) return;
        const target = new Date(`${exams[0].date}T${exams[0].startTime}`).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = target - now;
            if (diff < 0) {
                setTimeLeft('EXAM IN PROGRESS');
                clearInterval(interval);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${days}d ${hours}h ${mins}m`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [exams]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-text-muted">Initializing Portal...</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 radial-glow">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-10 animate-fade-in flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold text-text-primary mb-2">
              Welcome back, <span className="gradient-text">{user.userName || 'Student'}</span>
            </h1>
            <p className="text-text-muted text-sm italic font-medium">"Smooth seas do not make skillful sailors." — Finalize your revision.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent uppercase tracking-widest animate-pulse">
                Next Exam: {timeLeft}
             </div>
             <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                <button 
                    onClick={() => setActiveView('list')}
                    className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeView === 'list' ? 'bg-accent text-white shadow-lg' : 'text-text-muted hover:text-text-primary'}`}
                >List</button>
                <button 
                    onClick={() => setActiveView('calendar')}
                    className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeView === 'calendar' ? 'bg-accent text-white shadow-lg' : 'text-text-muted hover:text-text-primary'}`}
                >Calendar</button>
             </div>
          </div>
        </div>

        {/* Dynamic Content */}
        {activeView === 'calendar' ? (
          <div className="animate-slide-up">
            <ScheduleCalendar events={exams} />
          </div>
        ) : (
          <div className="space-y-8 animate-slide-up">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-2">Total Exams</p>
                        <p className="text-3xl font-bold text-text-primary">{exams.length}</p>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                </div>
                <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-2">Upcoming Exam</p>
                        <p className="text-lg font-bold text-text-primary truncate">{exams[0]?.subject || 'N/A'}</p>
                    </div>
                </div>
                <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-2">Status</p>
                        <p className="text-sm font-bold text-success uppercase tracking-widest flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Clear to Appear
                        </p>
                    </div>
                </div>
            </div>

            {/* Exam Table */}
            <div className="glass rounded-3xl overflow-hidden border border-white/5">
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <div>
                   <h2 className="text-lg font-bold text-text-primary">Personal Timetable</h2>
                   <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Conflict-free official schedule</p>
                </div>
                <ExportButton data={exams} targetId="student-schedule-table" fileName={`${user.userName}_Exam_Schedule`} />
              </div>
              
              <div id="student-schedule-table">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Entry</th>
                      <th className="px-8 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Subject Details</th>
                      <th className="px-8 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Time & Venue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {exams.length === 0 ? (
                        <tr><td colSpan="3" className="px-8 py-12 text-center text-text-muted text-sm">Waiting for coordinator to publish schedule...</td></tr>
                    ) : (
                        exams.map((exam, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors">
                            <td className="px-8 py-6">
                                <span className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center text-xs font-bold text-text-muted border border-white/5">
                                    0{i+1}
                                </span>
                            </td>
                            <td className="px-8 py-6">
                                <p className="text-sm font-bold text-text-primary mb-1">{exam.subject}</p>
                                <p className="text-[11px] text-text-muted font-medium uppercase tracking-tight">{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                                        <p className="text-[10px] text-primary font-bold">{exam.startTime} - {exam.endTime}</p>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                                        <p className="text-[10px] text-accent font-bold">ROOM {exam.room}</p>
                                    </div>
                                </div>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
