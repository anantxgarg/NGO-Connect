import { Navbar } from '@/components/shared/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getNgoBySlug } from '@/actions/ngos';
import { supabase } from '@/lib/supabase';
import { MapPin, Phone, Mail, Globe, CheckCircle2, Heart, Calendar } from 'lucide-react';
import Link from 'next/link';
import { PostCard } from '@/components/shared/post-card';
import { notFound } from 'next/navigation';

export default async function NgoProfilePage({ params }: { params: { slug: string } }) {
  const ngo = await getNgoBySlug(params.slug);

  if (!ngo) {
    notFound();
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, ngos(*)')
    .eq('ngo_id', ngo.id)
    .eq('status', 'OPEN')
    .order('created_at', { ascending: false });

  const activePosts = posts || [];

  const coverUrl = ngo.cover_url || 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="relative">
        <div className="h-80 w-full overflow-hidden">
          <img
            src={coverUrl}
            alt={ngo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-24 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    {ngo.logo_url ? (
                      <img
                        src={ngo.logo_url}
                        alt={ngo.name}
                        className="h-32 w-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center border-4 border-white shadow-lg">
                        <Heart className="h-16 w-16 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h1 className="text-3xl font-bold">{ngo.name}</h1>
                        {ngo.is_verified && (
                          <Badge className="bg-blue-500 ml-2">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {ngo.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {ngo.address_city}, {ngo.address_state}
                        </span>
                      </div>
                      {ngo.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{ngo.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{ngo.email}</span>
                      </div>
                      {ngo.website && (
                        <div className="flex items-center text-sm">
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a
                            href={ngo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <a href={`mailto:${ngo.email}`} className="text-sm text-blue-600 hover:underline">
                        {ngo.email}
                      </a>
                    </div>
                  </div>
                  {ngo.phone && (
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <a href={`tel:${ngo.phone}`} className="text-sm text-blue-600 hover:underline">
                          {ngo.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Address</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p>{ngo.address_city}</p>
                    <p>{ngo.address_state}, {ngo.address_country}</p>
                    {ngo.address_pincode && <p>{ngo.address_pincode}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Active Opportunities</h2>
                <p className="text-muted-foreground mt-1">
                  Current volunteer drives and donation needs
                </p>
              </div>
              <Badge variant="secondary">
                {activePosts.length} {activePosts.length === 1 ? 'Post' : 'Posts'}
              </Badge>
            </div>

            {activePosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePosts.map((post: any) => (
                  <PostCard key={post.id} post={post} showNgo={false} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Opportunities</h3>
                  <p className="text-muted-foreground">
                    This NGO doesn't have any active opportunities at the moment. Check back later!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
            <CardContent className="py-8 text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Support Our Mission</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your support helps us continue our work in making a positive impact.
                Join us in our mission to create meaningful change in the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/explore">Browse Opportunities</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href={`mailto:${ngo.email}`}>Contact Us</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
