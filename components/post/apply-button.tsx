'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { supabaseClient } from '@/lib/supabase-client';

interface ApplyButtonProps {
  postId: string;
  postTitle: string;
}

export function ApplyButton({ postId, postTitle }: ApplyButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!user) {
      toast.error('Please sign in to apply');
      router.push('/auth/sign-in');
      return;
    }

    if (user.role !== 'USER') {
      toast.error('Only users can apply for volunteer opportunities');
      return;
    }

    if (!message.trim()) {
      toast.error('Please write a message explaining why you want to volunteer');
      return;
    }

    setLoading(true);

    try {
      const insertQuery = supabaseClient.from('applications').insert as any;
      const { error } = await insertQuery({
        post_id: postId,
        user_id: user.id,
        message: message.trim(),
        status: 'PENDING',
      });

      if (error) {
        if (error.code === '23505') {
          toast.error('You have already applied to this opportunity');
        } else {
          throw error;
        }
        return;
      }

      const notifQuery = supabaseClient.from('notifications').insert as any;
      await notifQuery({
        user_id: user.id,
        type: 'APPLICATION_SUBMITTED',
        title: 'Application Submitted',
        message: `Your application for "${postTitle}" has been submitted successfully`,
        payload: { post_id: postId },
      });

      toast.success('Application submitted successfully!');
      setOpen(false);
      setMessage('');
      router.refresh();
    } catch (error: any) {
      console.error('Apply error:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apply as Volunteer</DialogTitle>
          <DialogDescription>
            Tell us why you want to volunteer for this drive. The NGO will review your application.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              placeholder="I would like to volunteer because..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Share your motivation, relevant skills, or experience
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
