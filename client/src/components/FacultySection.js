import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUserContext } from '../store/UserStore';

const FacultySection = () => {
    const { user } = useUserContext();
    const [faculty, setFaculty] = useState([]);
    const [form, setForm] = useState({ name: '', department: '', email: '' });

    const fetchFaculty = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/faculty/get/all', {
                headers: { Authorization: `Token ${user.token}` }
            });
            setFaculty(res.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [user.token]);

    useEffect(() => {
        fetchFaculty();
    }, [fetchFaculty]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/faculty', form, {
                headers: { Authorization: `Token ${user.token}` }
            });
            setForm({ name: '', department: '', email: '' });
            fetchFaculty();
        } catch (err) {
            alert(err.response?.data?.message || 'Error adding faculty');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:8000/api/faculty/${id}`, {
                headers: { Authorization: `Token ${user.token}` }
            });
            fetchFaculty();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl h-fit">
                <h3 className="text-sm font-semibold text-text-primary mb-4">Add Faculty</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={form.department}
                        onChange={e => setForm({...form, department: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
                        required
                    />
                    <button type="submit" className="w-full py-2 rounded-xl bg-accent text-white text-sm font-bold">Register Faculty</button>
                </form>
            </div>
            
            <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">Dept</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-text-muted uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {faculty.map(f => (
                            <tr key={f._id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-sm text-text-primary">{f.name}</td>
                                <td className="px-6 py-4 text-sm text-text-secondary">{f.department}</td>
                                <td className="px-6 py-4 text-sm text-text-muted">{f.email}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(f._id)} className="text-danger hover:underline text-xs">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FacultySection;
