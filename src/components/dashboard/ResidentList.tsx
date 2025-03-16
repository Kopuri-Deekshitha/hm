
import React from 'react';
import { Users, Search, Filter, MoreHorizontal } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const residents = [
  { id: 1, name: 'John Smith', roomNo: '101', checkIn: '2024-05-10', contact: '+1 (555) 123-4567' },
  { id: 2, name: 'Emma Johnson', roomNo: '205', checkIn: '2024-05-14', contact: '+1 (555) 987-6543' },
  { id: 3, name: 'Alex Rodriguez', roomNo: '312', checkIn: '2024-05-12', contact: '+1 (555) 234-5678' },
  { id: 4, name: 'Sarah Chen', roomNo: '118', checkIn: '2024-05-08', contact: '+1 (555) 876-5432' },
  { id: 5, name: 'Michael Brown', roomNo: '405', checkIn: '2024-05-02', contact: '+1 (555) 345-6789' },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
};

const ResidentList = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Recent Residents
            </CardTitle>
            <CardDescription>Manage your resident information</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Add Resident
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search residents..." className="pl-9" />
          </div>
          <Button size="icon" variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell className="font-medium">{resident.name}</TableCell>
                  <TableCell>{resident.roomNo}</TableCell>
                  <TableCell>{formatDate(resident.checkIn)}</TableCell>
                  <TableCell>{resident.contact}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Resident</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-4">
          View All Residents
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResidentList;
