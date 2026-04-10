import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../store/UserStore';

const NotificationTray = ({ onClose }) => {
    const { user } = useUserContext();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/notification', {
                    headers: { Authorization: `Token ${user.token}` }
                });
                setNotifications(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [user.token]);

    const markRead = async () => {
        try {
            await axios.post('http://localhost:8000/api/notification/mark-read', {}, {
                headers: { Authorization: `Token ${user.token}` }
            });
            setNotifications(notifications.map(n => ({...n, read: true})));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="absolute top-16 right-0 w-80 glass rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-fade-in z-[100]">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                <button onClick={markRead} className="text-[10px] text-accent font-medium uppercase tracking-wider hover:underline">Mark all as read</button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
                {loading ? (
                    <div className="p-8 text-center text-text-muted text-xs">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-text-muted text-xs">No new notifications</div>
                ) : (
                    notifications.map((n, idx) => (
                        <div key={idx} className={`p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer ${!n.read ? 'bg-accent/5' : ''}`}>
                            <div className="flex gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.type === 'schedule' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-text-primary mb-0.5">{n.title}</p>
                                    <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">{n.message}</p>
                                    <p className="text-[9px] text-text-muted mt-2 uppercase tracking-tight">{new Date(n.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            <button onClick={onClose} className="w-full py-3 bg-white/5 text-[10px] text-text-muted font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Close Panel</button>
        </div>
    );
};

export default NotificationTray;
