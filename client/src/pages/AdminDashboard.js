import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUserContext } from '../store/UserStore';
import AdminAnalytics from '../components/AdminAnalytics';
import ScheduleCalendar from '../components/ScheduleCalendar';
import FacultySection from '../components/FacultySection';
import ExportButton from '../components/ExportButton';

const AdminDashboard = () => {
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState('schedules');
  const [form, setForm] = useState({ subject: '', date: '', startTime: '', endTime: '', room: '', className: '' });
  const [exams, setExams] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchExams = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/schedule', {
        headers: { Authorization: `Token ${user.token}` }
      });
      if (res.data.data && res.data.data.subjects) {
          setExams(res.data.data.subjects);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user.token]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: "Final Exams April 2026",
        subjects: [...exams, form]
      };
      
      await axios.post('http://localhost:8000/api/schedule', payload, {
        headers: { Authorization: `Token ${user.token}` }
      });
      
      setForm({ subject: '', date: '', startTime: '', endTime: '', room: '', className: '' });
      setSuccessMsg('Schedule updated and notifications sent!');
      fetchExams();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Conflict detected or server error');
    }
  };

  const tabs = [
    { id: 'schedules', name: 'Schedules', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'calendar', name: 'Calendar', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'analytics', name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'faculty', name: 'Faculty', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 radial-glow">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-display font-bold text-text-primary mb-2">
              Admin <span className="gradient-text">Portal</span>
            </h1>
            <p className="text-text-muted text-sm">Orchestrate conflict-free examination environments</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-gradient-to-r from-accent to-primary text-white shadow-lg' 
                  : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="animate-slide-up">
          {activeTab === 'schedules' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <div className="glass rounded-3xl p-8 border border-white/5 sticky top-28">
                  <h2 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                    Add Schedule
                  </h2>
                  
                  {successMsg && <div className="mb-6 p-4 rounded-2xl bg-success/10 border border-success/20 text-success text-xs font-semibold animate-pulse">{successMsg}</div>}
                  
                  <form onSubmit={handleAdd} className="space-y-5">
                    <div className="space-y-4">
                      <input 
                        type="text" placeholder="Subject Name" value={form.subject}
                        onChange={e => setForm({...form, subject: e.target.value})}
                        className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm focus:border-accent outline-none transition-all"
                        required
                      />
                      <input 
                        type="text" placeholder="Class (e.g. CSE-A)" value={form.className}
                        onChange={e => setForm({...form, className: e.target.value})}
                        className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm focus:border-accent outline-none transition-all"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                            type="text" placeholder="Room" value={form.room}
                            onChange={e => setForm({...form, room: e.target.value})}
                            className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm focus:border-accent outline-none transition-all"
                            required
                        />
                        <input 
                            type="date" value={form.date}
                            onChange={e => setForm({...form, date: e.target.value})}
                            className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm focus:border-accent outline-none transition-all"
                            required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                            type="time" value={form.startTime}
                            onChange={e => setForm({...form, startTime: e.target.value})}
                            className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm focus:border-accent outline-none transition-all"
                            required
                        />
                        <input 
                            type="time" value={form.endTime}
                            onChange={e => setForm({...form, endTime: e.target.value})}
                            className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm focus:border-accent outline-none transition-all"
                            required
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent to-primary text-white font-bold text-sm shadow-xl shadow-accent/20 hover:scale-[1.02] transition-all">Submit Schedule</button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="glass rounded-3xl overflow-hidden border border-white/5">
                  <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-text-primary">Live Schedule</h2>
                        <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mt-1">Confirmed Examination Entries</p>
                    </div>
                    <ExportButton data={exams} targetId="admin-schedule-table" fileName="Admin_Master_Schedule" />
                  </div>
                  <div className="overflow-x-auto" id="admin-schedule-table">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-white/5">
                          <th className="px-8 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Subject</th>
                          <th className="px-8 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Class</th>
                          <th className="px-8 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Date/Time</th>
                          <th className="px-8 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Room</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {exams.map((exam, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors group">
                            <td className="px-8 py-5 text-sm font-semibold text-text-primary">{exam.subject}</td>
                            <td className="px-8 py-5 text-sm text-text-secondary">{exam.className}</td>
                            <td className="px-8 py-5 text-[11px] text-text-muted font-medium">
                                {new Date(exam.date).toDateString()} <br/> 
                                <span className="text-accent">{exam.startTime} - {exam.endTime}</span>
                            </td>
                            <td className="px-8 py-5">
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20 text-[10px] font-bold">{exam.room}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && <ScheduleCalendar events={exams} />}
          {activeTab === 'analytics' && <AdminAnalytics />}
          {activeTab === 'faculty' && <FacultySection />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
