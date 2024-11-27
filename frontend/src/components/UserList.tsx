import { User } from '@/api/model';
import { useGetApiUsers } from '@/api/users/users';

export const UserList = () => {
  const { data: users, isLoading, error } = useGetApiUsers<User[], Error>();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Users</h2>
      <div className="grid gap-4">
        {users?.map((user) => (
          <div key={user.id} className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">Age: {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
