
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Filter, Plus, Search, ArrowUpDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

// Import components
import BookingDetails from '@/components/bookings/BookingDetails';
import BookingRow from '@/components/bookings/BookingRow';
import NewBookingForm from '@/components/bookings/NewBookingForm';
import BookingSummaryCards from '@/components/bookings/BookingSummaryCards';
import BookingsTable from '@/components/bookings/BookingsTable';
import { bookings } from '@/components/bookings/bookingData';

// Main Bookings component
const Bookings = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter bookings based on the selected tab
  const getFilteredBookings = () => {
    if (selectedTab === "all") return bookings;
    if (selectedTab === "upcoming") 
      return bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
    if (selectedTab === "active") 
      return bookings.filter(b => b.status === 'checked-in');
    if (selectedTab === "past") 
      return bookings.filter(b => b.status === 'checked-out' || b.status === 'cancelled');
    return bookings;
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  const handleCloseNewBooking = () => {
    setIsNewBookingOpen(false);
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 ${!isMobile ? 'ml-64' : ''}`}>
        <Header />
        <main className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 animate-in fade-in">
            <div>
              <h1 className="font-semibold tracking-tight">Bookings</h1>
              <p className="text-muted-foreground">Manage reservations and check-ins</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Dialog open={isNewBookingOpen} onOpenChange={setIsNewBookingOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Booking
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Booking</DialogTitle>
                    <DialogDescription>
                      Enter the details to create a new booking.
                    </DialogDescription>
                  </DialogHeader>
                  <NewBookingForm onClose={handleCloseNewBooking} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="all">All Bookings</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search bookings..." 
                    className="w-[200px] pl-9"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem checked>Room Type</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>Payment Status</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Date Range</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Show on mobile only */}
            <div className="flex md:hidden items-center mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search bookings..." 
                  className="w-full pl-9"
                />
              </div>
              <Button variant="outline" size="icon" className="ml-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {selectedBooking && (
              <BookingDetails booking={selectedBooking} onClose={handleCloseDetails} />
            )}

            <Card>
              <BookingsTable 
                selectedTab={selectedTab} 
                isLoading={isLoading}
                bookings={filteredBookings}
                onViewDetails={handleViewDetails}
              />
            </Card>
          </Tabs>
          
          <BookingSummaryCards isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
};

export default Bookings;
