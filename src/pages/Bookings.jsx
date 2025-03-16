
import React, { useState } from 'react';
import { Calendar, Clock, Filter, Plus, Search, Check, ArrowUpDown, ChevronRight, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';

// Sample booking data
const bookings = [
  { 
    id: 'B1001', 
    guest: 'John Smith', 
    room: '101', 
    roomType: 'Single', 
    checkIn: '2024-05-15', 
    checkOut: '2024-06-15', 
    status: 'confirmed', 
    payment: 'paid',
    notes: 'Early check-in requested',
    phone: '+1 555-123-4567',
    email: 'john.smith@example.com'
  },
  { 
    id: 'B1002', 
    guest: 'Emma Johnson', 
    room: '205', 
    roomType: 'Double', 
    checkIn: '2024-05-18', 
    checkOut: '2024-05-25', 
    status: 'confirmed', 
    payment: 'partial',
    notes: 'Business traveler, needs invoice',
    phone: '+1 555-234-5678',
    email: 'emma.j@example.com'
  },
  { 
    id: 'B1003', 
    guest: 'Michael Chen', 
    room: '304', 
    roomType: 'Deluxe', 
    checkIn: '2024-06-01', 
    checkOut: '2024-06-10', 
    status: 'pending', 
    payment: 'unpaid',
    notes: 'Requested airport pickup',
    phone: '+1 555-345-6789',
    email: 'mchen@example.com'
  },
  { 
    id: 'B1004', 
    guest: 'Sarah Williams', 
    room: '102', 
    roomType: 'Single', 
    checkIn: '2024-05-17', 
    checkOut: '2024-05-22', 
    status: 'checked-in', 
    payment: 'paid',
    notes: 'Repeat guest',
    phone: '+1 555-456-7890',
    email: 'sarah.w@example.com'
  },
  { 
    id: 'B1005', 
    guest: 'David Rodriguez', 
    room: '210', 
    roomType: 'Double', 
    checkIn: '2024-05-25', 
    checkOut: '2024-06-05', 
    status: 'confirmed', 
    payment: 'paid',
    notes: 'Late check-in (after 10pm)',
    phone: '+1 555-567-8901',
    email: 'drodriguez@example.com'
  },
  { 
    id: 'B1006', 
    guest: 'Jessica Taylor', 
    room: '301', 
    roomType: 'Deluxe', 
    checkIn: '2024-06-10', 
    checkOut: '2024-06-15', 
    status: 'pending', 
    payment: 'unpaid',
    notes: 'Requested extra pillows',
    phone: '+1 555-678-9012',
    email: 'jtaylor@example.com'
  },
  { 
    id: 'B1007', 
    guest: 'Ryan Lee', 
    room: '105', 
    roomType: 'Single', 
    checkIn: '2024-05-16', 
    checkOut: '2024-05-19', 
    status: 'checked-out', 
    payment: 'paid',
    notes: 'Left review',
    phone: '+1 555-789-0123',
    email: 'rlee@example.com'
  }
];

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
    'checked-in': "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    'checked-out': "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
  };

  const displayText = {
    confirmed: "Confirmed",
    'checked-in': "Checked In",
    'checked-out': "Checked Out",
    pending: "Pending",
    cancelled: "Cancelled"
  };

  return (
    <Badge variant="outline" className={`${statusStyles[status]} font-normal`}>
      {displayText[status]}
    </Badge>
  );
};

// Payment badge component
const PaymentBadge = ({ status }) => {
  const paymentStyles = {
    paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    partial: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500",
    unpaid: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
  };

  const displayText = {
    paid: "Paid",
    partial: "Partial",
    unpaid: "Unpaid"
  };

  return (
    <Badge variant="outline" className={`${paymentStyles[status]} font-normal`}>
      {displayText[status]}
    </Badge>
  );
};

// Booking details component
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

// Bookings Table Row Component
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

// New Booking Form
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

// Main Bookings component
const Bookings = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Simulate loading
  React.useEffect(() => {
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
              <TabsContent value="all" className="m-0">
                {isMobile ? (
                  <div className="divide-y divide-border/40">
                    {isLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <BookingRow key={index} isLoading={true} />
                      ))
                    ) : (
                      getFilteredBookings().map(booking => (
                        <BookingRow 
                          key={booking.id} 
                          booking={booking} 
                          onViewDetails={handleViewDetails}
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
                            <div className="flex items-center">
                              Check-in
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Check-out</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          Array(5).fill(0).map((_, index) => (
                            <BookingRow key={index} isLoading={true} />
                          ))
                        ) : (
                          getFilteredBookings().map(booking => (
                            <BookingRow 
                              key={booking.id} 
                              booking={booking} 
                              onViewDetails={handleViewDetails}
                            />
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="m-0">
                {isMobile ? (
                  <div className="divide-y divide-border/40">
                    {isLoading ? (
                      Array(3).fill(0).map((_, index) => (
                        <BookingRow key={index} isLoading={true} />
                      ))
                    ) : (
                      getFilteredBookings().map(booking => (
                        <BookingRow 
                          key={booking.id} 
                          booking={booking} 
                          onViewDetails={handleViewDetails}
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
                          <TableHead>Check-in</TableHead>
                          <TableHead>Check-out</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          Array(3).fill(0).map((_, index) => (
                            <BookingRow key={index} isLoading={true} />
                          ))
                        ) : (
                          getFilteredBookings().map(booking => (
                            <BookingRow 
                              key={booking.id} 
                              booking={booking} 
                              onViewDetails={handleViewDetails}
                            />
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="active" className="m-0">
                {isMobile ? (
                  <div className="divide-y divide-border/40">
                    {isLoading ? (
                      Array(2).fill(0).map((_, index) => (
                        <BookingRow key={index} isLoading={true} />
                      ))
                    ) : (
                      getFilteredBookings().map(booking => (
                        <BookingRow 
                          key={booking.id} 
                          booking={booking} 
                          onViewDetails={handleViewDetails}
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
                          <TableHead>Check-in</TableHead>
                          <TableHead>Check-out</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          Array(2).fill(0).map((_, index) => (
                            <BookingRow key={index} isLoading={true} />
                          ))
                        ) : (
                          getFilteredBookings().map(booking => (
                            <BookingRow 
                              key={booking.id} 
                              booking={booking} 
                              onViewDetails={handleViewDetails}
                            />
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="m-0">
                {isMobile ? (
                  <div className="divide-y divide-border/40">
                    {isLoading ? (
                      Array(2).fill(0).map((_, index) => (
                        <BookingRow key={index} isLoading={true} />
                      ))
                    ) : (
                      getFilteredBookings().map(booking => (
                        <BookingRow 
                          key={booking.id} 
                          booking={booking} 
                          onViewDetails={handleViewDetails}
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
                          <TableHead>Check-in</TableHead>
                          <TableHead>Check-out</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          Array(2).fill(0).map((_, index) => (
                            <BookingRow key={index} isLoading={true} />
                          ))
                        ) : (
                          getFilteredBookings().map(booking => (
                            <BookingRow 
                              key={booking.id} 
                              booking={booking} 
                              onViewDetails={handleViewDetails}
                            />
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Card>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Today's Check-ins</CardTitle>
                <CardDescription>May 17, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-10 w-32" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <p className="text-sm font-medium">Sarah Williams</p>
                          <p className="text-xs text-muted-foreground">Room 102</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Check In</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Today's Check-outs</CardTitle>
                <CardDescription>May 17, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-10 w-32" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <p className="text-sm font-medium">John Adams</p>
                          <p className="text-xs text-muted-foreground">Room 204</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Check Out</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Summary</CardTitle>
                <CardDescription>Current Status</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-sm font-medium">42</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Active Guests</p>
                      <p className="text-sm font-medium">16</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Upcoming</p>
                      <p className="text-sm font-medium">24</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Available Rooms</p>
                      <p className="text-sm font-medium">12</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Bookings;
