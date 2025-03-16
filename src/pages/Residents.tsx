
import React from 'react';
import { Search, PlusCircle, Filter, User, Mail, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ResidentCardProps {
  name: string;
  email: string;
  phone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'active' | 'checking-out' | 'former';
  avatarUrl?: string;
}

const ResidentCard = ({ name, email, phone, room, checkIn, checkOut, status, avatarUrl }: ResidentCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500';
      case 'checking-out':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500';
      case 'former':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="glass-card p-5 card-hover animate-in fade-in">
      <div className="flex items-start">
        <Avatar className="h-12 w-12 mr-4 border-2 border-white/20">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">Room {room}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusColor()}`}>
              {status === 'active' ? 'Active' : status === 'checking-out' ? 'Checking Out' : 'Former'}
            </span>
          </div>
          
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">{email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">{phone}</span>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Check In:</span>
              <p>{checkIn}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Check Out:</span>
              <p>{checkOut}</p>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm">Profile</Button>
            <Button variant="outline" size="sm">Payment History</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Residents = () => {
  const residents: ResidentCardProps[] = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      room: '101',
      checkIn: 'Jan 15, 2024',
      checkOut: 'Jun 15, 2024',
      status: 'active',
    },
    {
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      phone: '+1 (555) 987-6543',
      room: '104',
      checkIn: 'Feb 20, 2024',
      checkOut: 'Jun 20, 2024',
      status: 'checking-out',
    },
    {
      name: 'Alex Rodriguez',
      email: 'alex.r@example.com',
      phone: '+1 (555) 456-7890',
      room: '201',
      checkIn: 'Jan 5, 2024',
      checkOut: 'Jul 5, 2024',
      status: 'active',
    },
    {
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      phone: '+1 (555) 234-5678',
      room: '203',
      checkIn: 'Dec 28, 2023',
      checkOut: 'Jun 28, 2024',
      status: 'active',
    },
    {
      name: 'David Wilson',
      email: 'david.w@example.com',
      phone: '+1 (555) 345-6789',
      room: '205',
      checkIn: 'Jan 10, 2024',
      checkOut: 'Jul 10, 2024',
      status: 'active',
    },
    {
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1 (555) 876-5432',
      room: 'Former',
      checkIn: 'Oct 15, 2023',
      checkOut: 'Apr 15, 2024',
      status: 'former',
    },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-in fade-in">
            <div>
              <h1 className="font-semibold tracking-tight">Residents</h1>
              <p className="text-muted-foreground">Manage your residents</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Resident
              </Button>
            </div>
          </div>
          
          <DashboardCard className="mb-6 animate-in fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search residents..." 
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
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Checking Out
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Former
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </DashboardCard>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {residents.map((resident, index) => (
              <ResidentCard key={index} {...resident} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Residents;
