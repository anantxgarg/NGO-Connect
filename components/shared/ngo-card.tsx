import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NGO } from '@/lib/database.types';
import { MapPin, Globe, CheckCircle2, Heart } from 'lucide-react';

interface NgoCardProps {
  ngo: NGO;
}

export function NgoCard({ ngo }: NgoCardProps) {
  const coverUrl = ngo.cover_url || 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <Link href={`/ngo/${ngo.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        <div className="relative h-32 overflow-hidden">
          <img
            src={coverUrl}
            alt={ngo.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader className="relative pb-2">
          <div className="flex items-start space-x-3">
            <div className="relative -mt-8">
              {ngo.logo_url ? (
                <img
                  src={ngo.logo_url}
                  alt={ngo.name}
                  className="h-16 w-16 rounded-lg object-cover border-4 border-white bg-white shadow-md"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center border-4 border-white shadow-md">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              )}
              {ngo.is_verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 pt-6">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {ngo.name}
                </h3>
                {ngo.is_verified && (
                  <Badge className="ml-2 bg-blue-500">Verified</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
            {ngo.description}
          </p>

          <div className="space-y-1.5">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="line-clamp-1">
                {ngo.address_city}, {ngo.address_state}
              </span>
            </div>
            {ngo.website && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="line-clamp-1 truncate">{ngo.website}</span>
              </div>
            )}
          </div>

          <Button className="w-full mt-4" variant="outline">
            View Profile
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
