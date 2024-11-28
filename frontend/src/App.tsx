import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

import { Footer } from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl p-8">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
