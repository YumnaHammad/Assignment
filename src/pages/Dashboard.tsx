import React, { useEffect } from 'react';
import { useDashboard } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { BarChart3, Users, FileText, CheckSquare, Image as ImageIcon } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { todos, albums, users, posts, loading, error, fetchDashboardData } = useDashboard();

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  if (loading) return <LoadingState message="Loading analytics..." />;
  if (error) return <ErrorState message={error} onRetry={fetchDashboardData} />;

  const completedTodos = todos.filter(t => t.completed).length;
  const pendingTodos = todos.length - completedTodos;

  const statCards = [
    { label: 'Total Users', value: users.length || 10, sub: '+2 from last month', icon: Users, color: 'from-primary/10', iconBg: 'bg-primary/10', iconColor: 'text-primary', border: 'hover:border-primary/40' },
    { label: 'Total Posts', value: posts.length || 100, sub: '+14% engagement', icon: FileText, color: 'from-blue-500/10', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500', border: 'hover:border-blue-500/40' },
    { label: 'Task Completion', value: `${Math.round((completedTodos / (todos.length || 1)) * 100)}%`, sub: `${completedTodos} resolved, ${pendingTodos} pending`, icon: CheckSquare, color: 'from-green-500/10', iconBg: 'bg-green-500/10', iconColor: 'text-green-500', border: 'hover:border-green-500/40' },
    { label: 'Total Albums', value: albums.length, sub: 'New uploads detected', icon: ImageIcon, color: 'from-purple-500/10', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-500', border: 'hover:border-purple-500/40' },
  ];

  return (
    <div className="space-y-6 select-none cursor-default animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, sub, icon: Icon, color, iconBg, iconColor, border }) => (
          <Card key={label} className={`bg-gradient-to-br ${color} to-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] ${border} group overflow-hidden`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{label}</CardTitle>
              <div className={`rounded-full p-2 ${iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold tracking-tight ${iconColor} transition-all duration-300`}>{value}</div>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
              <div className={`mt-3 h-1 rounded-full ${iconBg} overflow-hidden`}>
                <div className={`h-full rounded-full ${iconBg.replace('/10', '')} opacity-60 w-3/4 transition-all duration-700 group-hover:w-full`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Recent Albums */}
        <Card className="lg:col-span-4 select-none cursor-default border-border/50 hover:shadow-md transition-all duration-300">
          <CardHeader className="border-b border-border/40 pb-4 px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 rounded-md bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              Recent Albums
              <span className="ml-auto text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">{albums.length} total</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 px-2 sm:px-4">
            <div className="space-y-1">
              {albums.slice(0, 5).map((album, i) => (
                <div key={album.id} className="flex items-center gap-3 rounded-lg p-2 sm:p-3 hover:bg-muted/50 transition-all duration-200 group/item cursor-pointer">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-xs sm:text-sm shrink-0 group-hover/item:scale-105 transition-transform">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium capitalize truncate group-hover/item:text-primary transition-colors">{album.title}</h4>
                    <span className="text-xs text-muted-foreground">Album #{album.id}</span>
                  </div>
                  <ImageIcon className="h-4 w-4 text-muted-foreground/40 group-hover/item:text-primary transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Overview */}
        <Card className="lg:col-span-3 select-none cursor-default border-border/50 hover:shadow-md transition-all duration-300">
          <CardHeader className="border-b border-border/40 pb-4 px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 rounded-md bg-green-500/10">
                <CheckSquare className="h-4 w-4 text-green-500" />
              </div>
              Task Overview
              <span className="ml-auto text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {todos.filter(t => t.completed).length}/{todos.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 px-2 sm:px-4">
            <div className="space-y-1">
              {todos.slice(0, 6).map(todo => (
                <div key={todo.id} className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 group/task ${todo.completed ? 'opacity-60' : 'hover:bg-muted/50'}`}>
                  <div className={`shrink-0 h-4 w-4 rounded border-2 flex items-center justify-center transition-all ${todo.completed ? 'bg-primary border-primary' : 'border-muted-foreground/30'}`}>
                    {todo.completed && (
                      <svg className="h-2.5 w-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <p className={`text-sm flex-1 truncate ${todo.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                    {todo.title}
                  </p>
                  <Badge variant={todo.completed ? 'success' : 'warning'} className="shrink-0">
                    {todo.completed ? 'Done' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
