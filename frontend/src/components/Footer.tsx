import { Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto max-w-5xl px-8 py-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            <p>© 2024 Dmitry Nikolaev. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dmitrynikolaev08/face-up-task"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
