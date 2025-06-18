// src/app/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then(res => res.json())
      .then(data => setForm({ name: data.name, email: data.email }));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Edit User
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Nama
            </label>
            <input
              type="text"
              placeholder="Masukkan nama"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                       text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 hover:border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                       text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 hover:border-gray-600"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 
                     hover:from-green-600 hover:to-emerald-700 
                     text-white font-semibold px-6 py-3 rounded-lg 
                     transition-all duration-200 transform hover:scale-[1.02] 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
                     shadow-lg hover:shadow-green-500/25"
          >
            Update User
          </button>
        </form>
      </div>
    </main>
  );
}