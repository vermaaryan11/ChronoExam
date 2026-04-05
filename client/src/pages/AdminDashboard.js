import React, { useState } from 'react';

const AdminDashboard = () => {
  const [form, setForm] = useState({ subject: '', date: '', startTime: '', endTime: '' });
  const [errors, setErrors] = useState({});
  const [exams, setExams] = useState([
    { id: 1, subject: 'Data Structures & Algorithms', date: '2026-04-15', startTime: '09:00', endTime: '12:00' },
    { id: 2, subject: 'Operating Systems', date: '2026-04-17', startTime: '14:00', endTime: '17:00' },
    { id: 3, subject: 'Database Management Systems', date: '2026-04-20', startTime: '09:00', endTime: '12:00' },
  ]);
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.date) errs.date = 'Date is required';
    if (!form.startTime) errs.startTime = 'Start time is required';
    if (!form.endTime) errs.endTime = 'End time is required';
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      errs.endTime = 'End time must be after start time';
    }
    return errs;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Placeholder: Replace with actual API call
    const newExam = { ...form, id: Date.now() };
    setExams([...exams, newExam]);
    setForm({ subject: '', date: '', startTime: '', endTime: '' });
    setSuccessMsg('Exam schedule added successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id) => {
    setExams(exams.filter((e) => e.id !== id));
  };

  const formatTime = (t) => {
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8 radial-glow">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-text-primary mb-1">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-text-muted text-sm">Manage examination schedules for VIT Chennai</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Add Exam Form - 2 cols */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-display font-semibold text-text-primary">Add Exam</h2>
                  <p className="text-xs text-text-muted">Schedule a new examination</p>
                </div>
              </div>

              {/* Success Message */}
              {successMsg && (
                <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-success/10 border border-success/20 animate-fade-in">
                  <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-success font-medium">{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleAdd} className="space-y-4">
                {/* Subject */}
                <div>
                  <label htmlFor="exam-subject" className="block text-sm font-medium text-text-secondary mb-1.5">
                    Subject Name
                  </label>
                  <input
                    id="exam-subject"
                    type="text"
                    placeholder="e.g. Data Structures"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-surface-light/50 border ${
                      errors.subject ? 'border-danger' : 'border-border hover:border-border-light focus:border-accent'
                    } text-text-primary placeholder-text-muted text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-accent/20`}
                  />
                  {errors.subject && <p className="mt-1 text-xs text-danger">{errors.subject}</p>}
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="exam-date" className="block text-sm font-medium text-text-secondary mb-1.5">
                    Exam Date
                  </label>
                  <input
                    id="exam-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-surface-light/50 border ${
                      errors.date ? 'border-danger' : 'border-border hover:border-border-light focus:border-accent'
                    } text-text-primary text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-accent/20`}
                  />
                  {errors.date && <p className="mt-1 text-xs text-danger">{errors.date}</p>}
                </div>

                {/* Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="exam-start-time" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Start Time
                    </label>
                    <input
                      id="exam-start-time"
                      type="time"
                      value={form.startTime}
                      onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-surface-light/50 border ${
                        errors.startTime ? 'border-danger' : 'border-border hover:border-border-light focus:border-accent'
                      } text-text-primary text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-accent/20`}
                    />
                    {errors.startTime && <p className="mt-1 text-xs text-danger">{errors.startTime}</p>}
                  </div>
                  <div>
                    <label htmlFor="exam-end-time" className="block text-sm font-medium text-text-secondary mb-1.5">
                      End Time
                    </label>
                    <input
                      id="exam-end-time"
                      type="time"
                      value={form.endTime}
                      onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-surface-light/50 border ${
                        errors.endTime ? 'border-danger' : 'border-border hover:border-border-light focus:border-accent'
                      } text-text-primary text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-accent/20`}
                    />
                    {errors.endTime && <p className="mt-1 text-xs text-danger">{errors.endTime}</p>}
                  </div>
                </div>

                {/* Submit */}
                <button
                  id="add-exam-btn"
                  type="submit"
                  className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-accent to-primary text-white font-semibold text-sm shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Exam Schedule
                </button>
              </form>
            </div>
          </div>

          {/* Exam List - 3 cols */}
          <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '150ms' }}>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-semibold text-text-primary">Scheduled Exams</h2>
                    <p className="text-xs text-text-muted">{exams.length} exam{exams.length !== 1 ? 's' : ''} scheduled</p>
                  </div>
                </div>
              </div>

              {exams.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-hover flex items-center justify-center">
                    <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <p className="text-text-muted text-sm">No exams scheduled yet</p>
                  <p className="text-text-muted text-xs mt-1">Use the form to add a new exam</p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {exams.map((exam, idx) => (
                    <div
                      key={exam.id}
                      className="px-6 py-4 hover:bg-surface-hover/50 transition-colors duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                              {idx + 1}
                            </span>
                            <h3 className="text-sm font-semibold text-text-primary truncate">{exam.subject}</h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 ml-10">
                            <div className="flex items-center gap-1.5 text-xs text-text-muted">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(exam.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-text-muted">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(exam.id)}
                          className="ml-4 p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                          title="Remove exam"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
