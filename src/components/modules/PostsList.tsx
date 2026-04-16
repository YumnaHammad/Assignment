import React, { useEffect } from 'react';
import { useStore } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Loader } from '../common/Loader';
import { Button } from '../common/Button';
import { Calendar, UserCircle, ArrowRight } from 'lucide-react';

export const PostsList: React.FC = () => {
  const { posts, loadingPosts, errorPosts, fetchPosts, searchQuery } = useStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loadingPosts) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader size={48} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading amazing content...</p>
      </div>
    );
  }

  if (errorPosts) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-8 text-center text-destructive">
        <h3 className="text-lg font-semibold">Error</h3>
        <p className="mt-2">{errorPosts}</p>
        <Button className="mt-4" onClick={() => fetchPosts()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredPosts.map((post) => (
        <Card key={post.id} className="flex flex-col h-full border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden bg-gradient-to-b from-card to-card/50">
          <div className="h-40 w-full overflow-hidden bg-muted relative">
            {/* Using a placeholder service with a seed based on the post ID for varied, nice images */}
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
            <CardTitle className="text-lg line-clamp-2 leading-tight capitalize group-hover:text-primary transition-colors">{post.title}</CardTitle>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-3">
              <span className="flex items-center gap-1"><UserCircle className="w-3 h-3"/> Author {post.userId}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> Oct {post.id % 28 + 1}, 2024</span>
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
      
      {filteredPosts.length === 0 && (
        <div className="col-span-full py-16 text-center border rounded-xl bg-card/50 border-dashed">
          <h3 className="text-lg font-medium text-foreground mb-1">No matches found</h3>
          <p className="text-muted-foreground">We couldn't find any posts matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};
