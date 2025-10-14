import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/navbar';
import { PostCard } from '@/components/shared/post-card';
import { NgoCard } from '@/components/shared/ngo-card';
import { getPosts } from '@/actions/posts';
import { getNgos } from '@/actions/ngos';
import { Heart, Users, Building2, Search, ArrowRight, CheckCircle } from 'lucide-react';

export default async function Home() {
  const featuredPosts = await getPosts({ limit: 6 });
  const featuredNgos = await getNgos({ verified: true, limit: 4 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 text-white">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Connecting Communities</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Bridge Between NGOs and
              <span className="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Those Who Care
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-50 max-w-2xl mx-auto leading-relaxed">
              Discover verified NGOs, volunteer for meaningful causes, and make a real difference in your community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
                <Link href="/explore">
                  Explore Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                <Link href="/ngos">View NGOs</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Verified NGOs</h3>
            <p className="text-muted-foreground">
              Connect with authenticated and verified organizations making real impact
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Easy Volunteering</h3>
            <p className="text-muted-foreground">
              Find and apply to volunteer opportunities that match your interests and skills
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">Make Impact</h3>
            <p className="text-muted-foreground">
              Track your contributions and see the difference you're making
            </p>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Opportunities</h2>
                <p className="text-muted-foreground text-lg">
                  Latest volunteer drives and donation needs
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/explore">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredNgos.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Verified Organizations</h2>
                <p className="text-muted-foreground text-lg">
                  Trusted NGOs making a difference
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/ngos">
                  View All NGOs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredNgos.map((ngo) => (
                <NgoCard key={ngo.id} ngo={ngo} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Join thousands of volunteers and donors working with verified NGOs to create positive change
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/auth/sign-up">Get Started Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              <Link href="/explore">Browse Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">NGO Connect</span>
              </div>
              <p className="text-sm">
                Bridging the gap between NGOs and volunteers to create meaningful impact.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/explore" className="hover:text-white transition-colors">Explore</Link></li>
                <li><Link href="/ngos" className="hover:text-white transition-colors">NGOs</Link></li>
                <li><Link href="/auth/sign-up" className="hover:text-white transition-colors">Get Started</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">For NGOs</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/sign-up" className="hover:text-white transition-colors">Register NGO</Link></li>
                <li><Link href="/auth/sign-in" className="hover:text-white transition-colors">NGO Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 NGO Connect. Building bridges, creating impact.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
