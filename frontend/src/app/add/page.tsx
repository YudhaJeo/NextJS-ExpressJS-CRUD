'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        const data = await res.json();
        setForm({ name: data.name, email: data.email });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full mb-4 shadow-2xl border border-yellow-400/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4h2a2 2 0 012 2v14M8 4H6a2 2 0 00-2 2v14" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Edit User
            </h1>
            <p className="text-gray-300">Perbarui data user</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden backdrop-blur-sm">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-200">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50"
                  >
                    {isLoading ? 'Menyimpan...' : 'Perbarui User'}
                  </button>
                </div>
              </form>
            </div>
            <div className="h-2 bg-gradient-to-r from-yellow-600 to-orange-600"></div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-gray-200 flex items-center justify-center mx-auto"
            >
              ← Kembali ke Daftar User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
