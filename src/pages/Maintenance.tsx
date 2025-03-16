
import React from 'react';
import { Search, Filter, PlusCircle, Wrench, CheckCircle, Clock, XCircle, ArrowUpDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DashboardCard from '@/components/dashboard/DashboardCard';
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
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MaintenanceRequest {
  id: string;
  room: string;
  issue: string;
  reportedBy: string;
  dateReported: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

const PriorityBadge = ({ priority }: { priority: MaintenanceRequest['priority'] }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };
  
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs ${getPriorityColor()}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const StatusBadge = ({ status }: { status: MaintenanceRequest['status'] }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500 flex items-center';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500 flex items-center';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500 flex items-center';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500 flex items-center';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500 flex items-center';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'in-progress':
        return <Wrench className="h-3 w-3 mr-1" />;
      case 'completed':
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'cancelled':
        return <XCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };
  
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs ${getStatusColor()}`}>
      {getStatusIcon()}
      {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Maintenance = () => {
  const maintenanceRequests: MaintenanceRequest[] = [
    { id: 'M1001', room: '106', issue: 'Broken shower', reportedBy: 'John Smith', dateReported: '2024-05-16', priority: 'medium', status: 'pending' },
    { id: 'M1002', room: '218', issue: 'AC not working', reportedBy: 'Emma Johnson', dateReported: '2024-05-14', priority: 'high', status: 'in-progress' },
    { id: 'M1003', room: '304', issue: 'Leaking faucet', reportedBy: 'Alex Rodriguez', dateReported: '2024-05-13', priority: 'low', status: 'pending' },
    { id: 'M1004', room: '103', issue: 'Light fixture broken', reportedBy: 'Sarah Chen', dateReported: '2024-05-10', priority: 'medium', status: 'completed' },
    { id: 'M1005', room: '422', issue: 'Window stuck', reportedBy: 'David Wilson', dateReported: '2024-05-12', priority: 'low', status: 'pending' },
    { id: 'M1006', room: '155', issue: 'Lock not working', reportedBy: 'Michael Brown', dateReported: '2024-05-11', priority: 'high', status: 'in-progress' },
    { id: 'M1007', room: '205', issue: 'Toilet clogged', reportedBy: 'Lisa Taylor', dateReported: '2024-05-15', priority: 'medium', status: 'completed' },
    { id: 'M1008', room: '301', issue: 'Wi-Fi connectivity issues', reportedBy: 'Robert Garcia', dateReported: '2024-05-09', priority: 'medium', status: 'cancelled' },
    { id: 'M1009', room: '110', issue: 'Ceiling fan making noise', reportedBy: 'Jennifer Lee', dateReported: '2024-05-14', priority: 'low', status: 'pending' },
    { id: 'M1010', room: '405', issue: 'Peeling paint', reportedBy: 'James Wilson', dateReported: '2024-05-12', priority: 'low', status: 'completed' },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-in fade-in">
            <div>
              <h1 className="font-semibold tracking-tight">Maintenance</h1>
              <p className="text-muted-foreground">Manage maintenance requests</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </div>
          </div>
          
          <DashboardCard className="mb-6 animate-in fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search maintenance requests..." 
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
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      In Progress
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Completed
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Cancelled
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-accent/50">
                      <Filter className="mr-2 h-4 w-4" />
                      Priority
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card/80 backdrop-blur-lg border border-border/50">
                    <DropdownMenuCheckboxItem checked>
                      High
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Medium
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Low
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard className="animate-in fade-in">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Request ID</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Date Reported
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.room}</TableCell>
                    <TableCell>{request.issue}</TableCell>
                    <TableCell>{request.reportedBy}</TableCell>
                    <TableCell>{request.dateReported}</TableCell>
                    <TableCell>
                      <PriorityBadge priority={request.priority} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        {request.status !== 'completed' && request.status !== 'cancelled' && (
                          <Button size="sm">
                            Update
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DashboardCard>
        </main>
      </div>
    </div>
  );
};

export default Maintenance;
