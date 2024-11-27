import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto max-w-5xl px-8 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          <span className="text-xl font-bold">FaceUp Task</span>
        </Link>
      </div>
    </header>
  );
};
