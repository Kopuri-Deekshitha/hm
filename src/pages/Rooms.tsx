
import React from 'react';
import { Filter, PlusCircle, Search, BedDouble, Check, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RoomCardProps {
  number: string;
  type: string;
  beds: number;
  rate: string;
  status: 'occupied' | 'available' | 'maintenance' | 'reserved';
  occupantName?: string;
  checkoutDate?: string;
}

const RoomCard = ({ number, type, beds, rate, status, occupantName, checkoutDate }: RoomCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'occupied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      case 'available':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500';
      case 'maintenance':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      case 'reserved':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  return (
    <div className="glass-card p-5 card-hover animate-in fade-in">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold">Room {number}</h3>
          <p className="text-sm text-muted-foreground">{type} • {beds} Bed{beds > 1 ? 's' : ''}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <div className="border-t border-border pt-3">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">{rate}</span> / month
        </p>
        
        {status === 'occupied' && occupantName && checkoutDate && (
          <div className="mt-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Occupant:</span> {occupantName}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Checkout:</span> {checkoutDate}
            </p>
          </div>
        )}
        
        {status === 'reserved' && (
          <p className="text-sm mt-2">
            <span className="text-muted-foreground">Reserved for upcoming check-in</span>
          </p>
        )}
        
        {status === 'maintenance' && (
          <p className="text-sm mt-2">
            <span className="text-muted-foreground">Under maintenance</span>
          </p>
        )}
        
        <div className="flex justify-between mt-3">
          <Button variant="outline" size="sm">Details</Button>
          {status === 'available' && (
            <Button size="sm">Assign</Button>
          )}
          {status === 'occupied' && (
            <Button variant="outline" size="sm">Check Out</Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Rooms = () => {
  const rooms: RoomCardProps[] = [
    { number: '101', type: 'Standard', beds: 2, rate: '$550', status: 'occupied', occupantName: 'John Smith', checkoutDate: 'Jun 15, 2024' },
    { number: '102', type: 'Standard', beds: 2, rate: '$550', status: 'available' },
    { number: '103', type: 'Standard', beds: 1, rate: '$450', status: 'maintenance' },
    { number: '104', type: 'Deluxe', beds: 2, rate: '$650', status: 'occupied', occupantName: 'Emma Johnson', checkoutDate: 'Jun 20, 2024' },
    { number: '105', type: 'Standard', beds: 2, rate: '$550', status: 'reserved' },
    { number: '106', type: 'Deluxe', beds: 1, rate: '$600', status: 'available' },
    { number: '201', type: 'Standard', beds: 4, rate: '$400', status: 'occupied', occupantName: 'Alex Rodriguez', checkoutDate: 'Jul 5, 2024' },
    { number: '202', type: 'Deluxe', beds: 2, rate: '$650', status: 'available' },
    { number: '203', type: 'Standard', beds: 2, rate: '$550', status: 'occupied', occupantName: 'Sarah Chen', checkoutDate: 'Jun 28, 2024' },
    { number: '204', type: 'Standard', beds: 1, rate: '$450', status: 'available' },
    { number: '205', type: 'Deluxe', beds: 3, rate: '$750', status: 'occupied', occupantName: 'David Wilson', checkoutDate: 'Jul 10, 2024' },
    { number: '206', type: 'Standard', beds: 2, rate: '$550', status: 'reserved' },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-in fade-in">
            <div>
              <h1 className="font-semibold tracking-tight">Rooms</h1>
              <p className="text-muted-foreground">Manage your room inventory</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Button className="ml-2">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Room
              </Button>
            </div>
          </div>
          
          <DashboardCard className="mb-6 animate-in fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search rooms..." 
                  className="pl-9 bg-accent/50"
                />
              </div>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-accent/50">
                      <Filter className="mr-2 h-4 w-4" />
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card/80 backdrop-blur-lg border border-border/50">
                    <DropdownMenuCheckboxItem checked>
                      Occupied
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Available
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Maintenance
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Reserved
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-accent/50">
                      <Filter className="mr-2 h-4 w-4" />
                      Room Type
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card/80 backdrop-blur-lg border border-border/50">
                    <DropdownMenuCheckboxItem checked>
                      Standard
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Deluxe
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </DashboardCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rooms.map((room) => (
              <RoomCard key={room.number} {...room} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rooms;
