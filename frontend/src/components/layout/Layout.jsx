import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            style: {
              background: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #a7f3d0',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
            },
          },
        }}
      />

      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-h-[calc(100vh-4rem)] lg:ml-0">
          <div className="page-container animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
