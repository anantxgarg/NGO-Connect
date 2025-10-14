import { Navbar } from '@/components/shared/navbar';
import { PostCard } from '@/components/shared/post-card';
import { EmptyState } from '@/components/shared/empty-state';
import { getPosts } from '@/actions/posts';
import { SearchX } from 'lucide-react';

export default async function ExplorePage() {
  const posts = await getPosts({});

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Opportunities</h1>
          <p className="text-muted-foreground text-lg">
            Find volunteer drives and donation needs from verified NGOs
          </p>
        </div>

        {posts.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No opportunities found"
            description="There are no active opportunities at the moment. Check back soon!"
            action={{ label: 'View NGOs', href: '/ngos' }}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
