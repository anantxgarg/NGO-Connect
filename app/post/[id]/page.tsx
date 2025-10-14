import { Navbar } from '@/components/shared/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getPostById, incrementPostViews } from '@/actions/posts';
import { getNgoById } from '@/actions/ngos';
import { Calendar, MapPin, Users, Clock, Heart, CheckCircle2, Mail, Phone, Globe, Award } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { ApplyButton } from '@/components/post/apply-button';
import { ContactButton } from '@/components/post/contact-button';
import { notFound } from 'next/navigation';

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  await incrementPostViews(params.id);

  const imageUrl = post.images?.[0] || 'https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=1200';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/explore" className="text-sm text-blue-600 hover:underline">
              ← Back to Explore
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="overflow-hidden">
                <div className="relative h-96">
                  <img
                    src={imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                      {post.type === 'DONATION' ? 'Donation Need' : 'Volunteer Drive'}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant={post.status === 'OPEN' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-muted-foreground">{post.location}</p>
                      </div>
                    </div>

                    {post.date_start && (
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Date</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(post.date_start), 'MMM dd, yyyy')}
                            {post.date_end && post.date_end !== post.date_start && (
                              <> - {format(new Date(post.date_end), 'MMM dd, yyyy')}</>
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {post.needed_count && (
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Volunteers Needed</p>
                          <p className="text-sm text-muted-foreground">{post.needed_count} people</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Posted</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(post.created_at), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {post.type === 'DRIVE' && (
                    <>
                      <Separator />
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Volunteer Benefits</h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Certificate of participation for all volunteers</li>
                              <li>• Letter of appreciation for outstanding contributors</li>
                              <li>• Valuable experience in social work</li>
                              <li>• Opportunity to make a real difference in the community</li>
                              <li>• Network with like-minded people</li>
                              {post.category === 'Medical' && <li>• Light refreshments provided</li>}
                              {post.category === 'Environment' && <li>• All materials and equipment provided</li>}
                              {post.category === 'Education' && <li>• Training and guidance provided</li>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {post.images && post.images.length > 1 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3">Gallery</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {post.images.slice(1).map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`${post.title} ${idx + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the NGO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={`/ngo/${post.ngos.slug}`} className="block group">
                    <div className="flex items-center space-x-3 mb-3">
                      {post.ngos.logo_url ? (
                        <img
                          src={post.ngos.logo_url}
                          alt={post.ngos.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                          <Heart className="h-6 w-6 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                          {post.ngos.name}
                        </h3>
                        {post.ngos.is_verified && (
                          <div className="flex items-center text-xs text-blue-600 mt-0.5">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified NGO
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.ngos.description}
                  </p>

                  <Separator />

                  <div className="space-y-3">
                    {post.ngos.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">{post.ngos.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{post.ngos.email}</span>
                    </div>
                    {post.ngos.website && (
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a
                          href={post.ngos.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {post.ngos.address_city}, {post.ngos.address_state}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/ngo/${post.ngos.slug}`}>View NGO Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  {post.type === 'DRIVE' ? (
                    <>
                      <h3 className="font-semibold mb-4">Apply as Volunteer</h3>
                      <ApplyButton postId={post.id} postTitle={post.title} />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold mb-4">Contact for Donation</h3>
                      <ContactButton
                        ngoId={post.ngo_id}
                        postId={post.id}
                        ngoName={post.ngos.name}
                        postTitle={post.title}
                      />
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <Heart className="h-10 w-10 text-blue-600 mx-auto" />
                    <h3 className="font-semibold">Make a Difference</h3>
                    <p className="text-sm text-muted-foreground">
                      Every contribution, big or small, helps create positive change in our community.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
