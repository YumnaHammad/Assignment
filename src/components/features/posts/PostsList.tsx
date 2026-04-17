import React, { useEffect } from 'react';
import { usePosts } from '../../../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { LoadingState } from '../../ui/LoadingState';
import { ErrorState } from '../../ui/ErrorState';
import { EmptyState } from '../../ui/EmptyState';
import { Calendar, UserCircle, ArrowRight } from 'lucide-react';

export const PostsList: React.FC = () => {
  const { posts, loading, error, fetchPosts, searchQuery } = usePosts();

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingState message="Loading posts..." />;
  if (error) return <ErrorState message={error} onRetry={fetchPosts} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {filtered.map((post) => (
        <Card key={post.id} className="flex flex-col h-full border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden bg-gradient-to-b from-card to-card/50">
          <div className="h-40 w-full overflow-hidden bg-muted relative">
            <img
              src={`https://picsum.photos/seed/post${post.id}/600/400`}
              alt="Post thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider text-primary">
              Article
            </div>
          </div>
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-lg line-clamp-2 leading-tight capitalize group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-3">
              <span className="flex items-center gap-1"><UserCircle className="w-3 h-3" /> Author {post.userId}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Oct {post.id % 28 + 1}, 2024</span>
            </div>
          </CardHeader>
          <CardContent className="pt-2 flex-1">
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.body}</p>
          </CardContent>
          <div className="p-5 pt-0 mt-auto border-t border-border/40 bg-muted/10">
            <Button variant="ghost" className="w-full justify-between mt-3 text-primary hover:text-primary hover:bg-primary/10 group/btn">
              Read Article
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </Card>
      ))}
      {filtered.length === 0 && <EmptyState message={`No posts matching "${searchQuery}"`} />}
    </div>
  );
};
