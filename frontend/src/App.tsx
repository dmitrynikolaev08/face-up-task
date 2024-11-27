import { CreateNotification } from './components/notifications/CreateNotification';
import { NotificationList } from './components/notifications/NotificationList';

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          Notification System
        </h1>

        <div className="space-y-8">
          <div className="rounded-lg border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4">Create Notification</h2>
            <CreateNotification />
          </div>

          <NotificationList />
        </div>
      </div>
    </div>
  );
}

export default App;
