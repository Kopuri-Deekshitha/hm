
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import StatusBadge from './StatusBadge';
import PaymentBadge from './PaymentBadge';

const BookingRow = ({ booking, onViewDetails, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  if (isLoading) {
    if (isMobile) {
      return (
        <div className="border-b border-border/40 p-4">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      );
    }

    return (
      <TableRow>
        <TableCell><Skeleton className="h-4 w-14" /></TableCell>
        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell><Skeleton className="h-4 w-10" /></TableCell>
        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20" /></TableCell>
        <TableCell><Skeleton className="h-6 w-16" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-12 ml-auto" /></TableCell>
      </TableRow>
    );
  }

  if (isMobile) {
    return (
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="border-b border-border/40 p-4">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between items-center cursor-pointer">
              <div>
                <p className="font-medium">{booking.guest}</p>
                <p className="text-sm text-muted-foreground">Room {booking.room} · {booking.checkIn}</p>
              </div>
              <div className="flex items-center">
                <StatusBadge status={booking.status} />
                <ChevronRight className={`h-5 w-5 transition-transform ml-2 ${isExpanded ? 'rotate-90' : ''}`} />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Check-out:</span>
                <span className="text-sm">{booking.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Room Type:</span>
                <span className="text-sm">{booking.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payment:</span>
                <PaymentBadge status={booking.payment} />
              </div>
              <div className="mt-4">
                <Button size="sm" className="w-full" onClick={() => onViewDetails(booking)}>
                  View Details
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{booking.id}</TableCell>
      <TableCell>{booking.guest}</TableCell>
      <TableCell>{booking.room}</TableCell>
      <TableCell>{booking.checkIn}</TableCell>
      <TableCell>{booking.checkOut}</TableCell>
      <TableCell><StatusBadge status={booking.status} /></TableCell>
      <TableCell><PaymentBadge status={booking.payment} /></TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" onClick={() => onViewDetails(booking)}>
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BookingRow;
