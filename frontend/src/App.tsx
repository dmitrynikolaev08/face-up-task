import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
