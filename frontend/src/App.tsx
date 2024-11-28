import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl p-8">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
