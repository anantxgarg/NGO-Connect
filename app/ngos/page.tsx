import { Navbar } from '@/components/shared/navbar';
import { NgoCard } from '@/components/shared/ngo-card';
import { EmptyState } from '@/components/shared/empty-state';
import { getNgos } from '@/actions/ngos';
import { Building2 } from 'lucide-react';

export default async function NgosPage() {
  const ngos = await getNgos({ verified: true });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Verified NGOs</h1>
          <p className="text-muted-foreground text-lg">
            Browse trusted organizations making a difference in communities
          </p>
        </div>

        {ngos.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No NGOs found"
            description="There are no verified NGOs at the moment. Check back soon!"
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ngos.map((ngo) => (
              <NgoCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
