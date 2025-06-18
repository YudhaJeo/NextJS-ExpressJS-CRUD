// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Next + Express CRUD',
  description: 'A simple CRUD app with Next.js and Express',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <header className="sticky top-0 z-10 backdrop-blur-md bg-gray-800/95 border-b border-gray-700 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              ✨ Simple CRUD App
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Modern user management system
            </p>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-2xl">
            {children}
          </div>
        </main>
        
        <footer className="mt-auto py-6 border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-gray-500 text-sm">
              Built with Next.js & Express • Dark Mode Enabled
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}