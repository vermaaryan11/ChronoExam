import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import axios from 'axios';
import { useUserContext } from '../store/UserStore';

const AdminAnalytics = () => {
    const { user } = useUserContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#3b82f6'];

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/schedule/analytics', {
                    headers: { Authorization: `Token ${user.token}` }
                });
                setData(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [user.token]);

    if (loading) return <div className="h-64 flex items-center justify-center text-text-muted">Loading Analytics...</div>;
    if (!data) return null;

    const utilizationData = Object.keys(data.roomUtilization).map(room => ({
        room,
        exams: data.roomUtilization[room]
    }));

    const countsData = [
        { name: 'Rooms', value: data.counts.rooms },
        { name: 'Subjects', value: data.counts.subjects },
        { name: 'Exams', value: data.counts.exams }
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart - Room Utilization */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-text-primary mb-6">Room Utilization</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={utilizationData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="room" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="exams" radius={[6, 6, 0, 0]}>
                                    {utilizationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart - Resource Distribution */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-text-primary mb-6">System Overview</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={countsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {countsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        {countsData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                <span className="text-[10px] text-text-muted uppercase tracking-wider">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Active Complaints</p>
                    <p className="text-2xl font-bold text-danger">{data.counts.complaints}</p>
                </div>
                <div className="glass p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Total Rooms</p>
                    <p className="text-2xl font-bold text-accent">{data.counts.rooms}</p>
                </div>
                <div className="glass p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Total Subjects</p>
                    <p className="text-2xl font-bold text-primary">{data.counts.subjects}</p>
                </div>
                <div className="glass p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Total Exams</p>
                    <p className="text-2xl font-bold text-success">{data.counts.exams}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
