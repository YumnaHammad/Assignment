import React, { useEffect } from 'react';
import { useStore } from '../../store';
import { Card, CardContent } from '../common/Card';
import { Loader } from '../common/Loader';
import { Button } from '../common/Button';

export const TodosList: React.FC = () => {
  const { todos, loadingDashboard, errorDashboard, fetchDashboardData, searchQuery, toggleTodo } = useStore();

  useEffect(() => {
    // If we haven't fetched dashboard data yet (or want to refresh)
    if (todos.length === 0) {
      fetchDashboardData();
    }
  }, [fetchDashboardData, todos.length]);

  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loadingDashboard && todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader size={48} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading tasks...</p>
      </div>
    );
  }

  if (errorDashboard) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-8 text-center text-destructive">
        <h3 className="text-lg font-semibold">Error</h3>
        <p className="mt-2">{errorDashboard}</p>
        <Button className="mt-4" onClick={() => fetchDashboardData()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredTodos.map((todo) => (
        <Card 
          key={todo.id} 
          onClick={() => toggleTodo(todo.id)}
          className={`transition-all cursor-pointer border-l-4 ${
            todo.completed ? 'opacity-70 bg-muted/40 border-l-primary/30 shadow-none' : 'hover:shadow-md border-l-primary'
          }`}
        >
          <CardContent className="p-4 flex items-start gap-4">
            <div className="mt-0.5 relative flex items-center justify-center">
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
                <p className="text-xs text-muted-foreground/80 font-mono">
                  # {todo.id}
                </p>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${todo.completed ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-600'}`}>
                  {todo.completed ? 'Done' : 'Pending'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredTodos.length === 0 && (
        <div className="col-span-full py-12 text-center text-muted-foreground">
          No tasks found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};
