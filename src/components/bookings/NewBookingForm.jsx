
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

const NewBookingForm = ({ onClose }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Guest Name</label>
          <Input placeholder="Enter guest name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Room Number</label>
          <Input type="number" placeholder="Room number" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Check-in Date</label>
          <Input type="date" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Check-out Date</label>
          <Input type="date" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input placeholder="Phone number" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="Email address" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-medium">Notes</label>
          <Input placeholder="Special requests or notes" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Create Booking</Button>
      </DialogFooter>
    </>
  );
};

export default NewBookingForm;
