import { useState, useEffect } from 'react';

function App() {
  const [health, setHealth] = useState<{ status: string } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Face Up Task</h1>
      <p>Backend Status: {health ? health.status : 'Loading...'}</p>
    </div>
  );
}

export default App;