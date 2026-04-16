import React, { useEffect } from 'react';
import { useTodos } from '../../../hooks/useApi';
import { Card, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { LoadingState } from '../../ui/LoadingState';
import { ErrorState } from '../../ui/ErrorState';
import { EmptyState } from '../../ui/EmptyState';

export const TodosList: React.FC = () => {
  const { todos, loading, error, fetchDashboardData, toggleTodo, searchQuery } = useTodos();

  useEffect(() => {
    if (todos.length === 0) fetchDashboardData();
  }, [fetchDashboardData, todos.length]);

  const filtered = todos.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && todos.length === 0) return <LoadingState message="Loading tasks..." />;
  if (error) return <ErrorState message={error} onRetry={fetchDashboardData} />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {filtered.map((todo) => (
        <Card
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          className={`transition-all cursor-pointer border-l-4 ${
            todo.completed ? 'opacity-70 bg-muted/40 border-l-primary/30 shadow-none' : 'hover:shadow-md border-l-primary'
          }`}
        >
          <CardContent className="p-4 flex items-start gap-4">
            <div className="mt-0.5 flex items-center justify-center">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="h-5 w-5 rounded-md border-primary/50 text-primary accent-primary cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium leading-tight ${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {todo.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground/80 font-mono">#{todo.id}</span>
                <Badge variant={todo.completed ? 'success' : 'warning'}>
                  {todo.completed ? 'Done' : 'Pending'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {filtered.length === 0 && <EmptyState message={`No tasks matching "${searchQuery}"`} />}
    </div>
  );
};
