
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import PaymentBadge from './PaymentBadge';

const BookingDetails = ({ booking, onClose }) => {
  return (
    <div className="bg-accent/50 p-4 rounded-md mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-lg">{booking.guest}</h3>
          <p className="text-muted-foreground text-sm">Booking #{booking.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
          <Button size="sm">Edit Booking</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Booking Details</h4>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Room:</p>
              <p className="text-sm font-medium">{booking.room} ({booking.roomType})</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Check-in:</p>
              <p className="text-sm font-medium">{booking.checkIn}</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Check-out:</p>
              <p className="text-sm font-medium">{booking.checkOut}</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Status:</p>
              <StatusBadge status={booking.status} />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Payment:</p>
              <PaymentBadge status={booking.payment} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Guest Information</h4>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Name:</p>
              <p className="text-sm font-medium">{booking.guest}</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Email:</p>
              <p className="text-sm font-medium">{booking.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Phone:</p>
              <p className="text-sm font-medium">{booking.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm text-muted-foreground">Notes:</p>
              <p className="text-sm">{booking.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
