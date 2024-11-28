import { Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

export const Header = () => {
  const location = useLocation();

  const navItems = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/reports',
      label: 'Reports',
    },
  ];

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto max-w-5xl px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bell className="h-6 w-6" />
            <span className="text-xl font-bold">FaceUp Task</span>
          </Link>

          <nav>
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                      location.pathname === item.href
                        ? 'text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
