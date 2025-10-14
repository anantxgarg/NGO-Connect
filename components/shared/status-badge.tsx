import { Badge } from '@/components/ui/badge';
import { ApplicationStatus, PostStatus, VerificationStatus } from '@/lib/database.types';

interface StatusBadgeProps {
  status: ApplicationStatus | PostStatus | VerificationStatus;
  type: 'application' | 'post' | 'verification';
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case 'PENDING':
        return 'secondary';
      case 'ACCEPTED':
      case 'APPROVED':
      case 'OPEN':
        return 'default';
      case 'REJECTED':
      case 'CLOSED':
        return 'destructive';
      case 'WITHDRAWN':
        return 'outline';
      case 'IN_PROGRESS':
        return 'default';
      case 'FULFILLED':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getLabel = () => {
    if (type === 'application') {
      switch (status) {
        case 'PENDING':
          return 'Pending';
        case 'ACCEPTED':
          return 'Accepted';
        case 'REJECTED':
          return 'Rejected';
        case 'WITHDRAWN':
          return 'Withdrawn';
        default:
          return status;
      }
    } else if (type === 'post') {
      switch (status) {
        case 'OPEN':
          return 'Open';
        case 'IN_PROGRESS':
          return 'In Progress';
        case 'CLOSED':
          return 'Closed';
        case 'FULFILLED':
          return 'Fulfilled';
        default:
          return status;
      }
    } else {
      switch (status) {
        case 'PENDING':
          return 'Pending Review';
        case 'APPROVED':
          return 'Verified';
        case 'REJECTED':
          return 'Rejected';
        default:
          return status;
      }
    }
  };

  return <Badge variant={getVariant()}>{getLabel()}</Badge>;
}
