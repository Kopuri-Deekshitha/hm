
import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';
import { TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import BookingRow from './BookingRow';

const BookingsTable = ({ selectedTab, isLoading, bookings, onViewDetails }) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <TabsContent value={selectedTab} className="m-0">
        {isMobile ? (
          <div className="divide-y divide-border/40">
            {isLoading ? (
              Array(selectedTab === "all" ? 5 : selectedTab === "upcoming" ? 3 : 2).fill(0).map((_, index) => (
                <BookingRow key={index} isLoading={true} />
              ))
            ) : (
              bookings.map(booking => (
                <BookingRow 
                  key={booking.id} 
                  booking={booking} 
                  onViewDetails={onViewDetails}
                />
              ))
            )}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Booking ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>
                    {selectedTab === "all" ? (
                      <div className="flex items-center">
                        Check-in
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    ) : (
                      "Check-in"
                    )}
                  </TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(selectedTab === "all" ? 5 : selectedTab === "upcoming" ? 3 : 2).fill(0).map((_, index) => (
                    <BookingRow key={index} isLoading={true} />
                  ))
                ) : (
                  bookings.map(booking => (
                    <BookingRow 
                      key={booking.id} 
                      booking={booking} 
                      onViewDetails={onViewDetails}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </TabsContent>
    </>
  );
};

export default BookingsTable;
