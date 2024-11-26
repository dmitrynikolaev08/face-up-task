import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function App() {
  const [health, setHealth] = useState<{ status: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          Face Up Task
        </h1>

        <div className="rounded-lg border bg-card p-8">
          <div className="flex items-center gap-4">
            {error ? (
              <AlertCircle className="h-6 w-6 text-destructive" />
            ) : health ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
            <p className="text-xl font-semibold">
              {error
                ? 'Error connecting to backend'
                : health
                  ? health.status
                  : 'Checking backend status...'}
            </p>
          </div>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
