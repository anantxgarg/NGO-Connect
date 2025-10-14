import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post, NGO } from '@/lib/database.types';
import { Calendar, MapPin, Users, Heart, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post & { ngos: NGO };
  showNgo?: boolean;
}

export function PostCard({ post, showNgo = true }: PostCardProps) {
  const imageUrl = post.images?.[0] || 'https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <Link href={`/post/${post.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-gray-900 hover:bg-white">
              {post.type === 'DONATION' ? 'Donation' : 'Drive'}
            </Badge>
          </div>
        </div>

        <CardHeader className="space-y-2">
          {showNgo && (
            <div className="flex items-center space-x-2">
              <div className="relative">
                {post.ngos.logo_url ? (
                  <img
                    src={post.ngos.logo_url}
                    alt={post.ngos.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                )}
                {post.ngos.is_verified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">{post.ngos.name}</span>
            </div>
          )}
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <Badge variant="secondary" className="w-fit">
            {post.category}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>

          <div className="flex flex-col space-y-1.5 pt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="line-clamp-1">{post.location}</span>
            </div>

            {post.date_start && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{format(new Date(post.date_start), 'MMM dd, yyyy')}</span>
              </div>
            )}

            {post.needed_count && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{post.needed_count} volunteers needed</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" variant="outline">
            {post.type === 'DONATION' ? 'Contact NGO' : 'Apply Now'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
