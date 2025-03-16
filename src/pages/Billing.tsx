
import React from 'react';
import { Search, Filter, PlusCircle, Receipt, DollarSign, Download, ArrowUpDown, CheckCircle, Clock, XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
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

interface Payment {
  id: string;
  resident: string;
  room: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  type: 'Rent' | 'Utilities' | 'Deposit' | 'Penalty';
}

const PaymentStatusBadge = ({ status }: { status: Payment['status'] }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500 flex items-center';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500 flex items-center';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500 flex items-center';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500 flex items-center';
    }
  };
  
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs ${getStatusColor()}`}>
      {status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
      {status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
      {status === 'overdue' && <XCircle className="h-3 w-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Billing = () => {
  const payments: Payment[] = [
    { id: '1001', resident: 'John Smith', room: '101', amount: '$550', date: '2024-05-01', status: 'paid', type: 'Rent' },
    { id: '1002', resident: 'Emma Johnson', room: '104', amount: '$650', date: '2024-05-01', status: 'paid', type: 'Rent' },
    { id: '1003', resident: 'Alex Rodriguez', room: '201', amount: '$400', date: '2024-05-01', status: 'paid', type: 'Rent' },
    { id: '1004', resident: 'Sarah Chen', room: '203', amount: '$550', date: '2024-05-20', status: 'pending', type: 'Rent' },
    { id: '1005', resident: 'David Wilson', room: '205', amount: '$750', date: '2024-05-21', status: 'pending', type: 'Rent' },
    { id: '1006', resident: 'Michael Brown', room: '405', amount: '$700', date: '2024-05-22', status: 'pending', type: 'Rent' },
    { id: '1007', resident: 'Lisa Taylor', room: '302', amount: '$600', date: '2024-04-15', status: 'overdue', type: 'Rent' },
    { id: '1008', resident: 'Robert Garcia', room: '402', amount: '$75', date: '2024-05-01', status: 'paid', type: 'Utilities' },
    { id: '1009', resident: 'Jennifer Lee', room: '301', amount: '$80', date: '2024-05-20', status: 'pending', type: 'Utilities' },
    { id: '1010', resident: 'James Wilson', room: '105', amount: '$550', date: '2024-04-20', status: 'overdue', type: 'Rent' },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-in fade-in">
            <div>
              <h1 className="font-semibold tracking-tight">Billing</h1>
              <p className="text-muted-foreground">Manage payments and invoices</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Button variant="outline" className="mr-2">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Total Revenue"
              value="$28,560"
              icon={DollarSign}
              change={12}
              trend="positive"
              trendLabel="vs last month"
              className="animate-in fade-in"
            />
            <StatCard
              title="Pending Payments"
              value="$5,750"
              icon={Clock}
              change={-3}
              trend="negative"
              trendLabel="vs last month"
              className="animate-in fade-in [animation-delay:150ms]"
            />
            <StatCard
              title="Overdue Payments"
              value="$1,850"
              icon={XCircle}
              change={5}
              trend="negative"
              trendLabel="vs last month"
              className="animate-in fade-in [animation-delay:300ms]"
            />
          </div>
          
          <DashboardCard className="mb-6 animate-in fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search payments..." 
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
                      Paid
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Overdue
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-accent/50">
                      <Filter className="mr-2 h-4 w-4" />
                      Type
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card/80 backdrop-blur-lg border border-border/50">
                    <DropdownMenuCheckboxItem checked>
                      Rent
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Utilities
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Deposit
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Penalty
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
                  <TableHead className="w-[100px]">Invoice ID</TableHead>
                  <TableHead>Resident</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Amount
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.resident}</TableCell>
                    <TableCell>{payment.room}</TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={payment.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Receipt className="h-4 w-4" />
                        </Button>
                        {payment.status !== 'paid' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                            <DollarSign className="h-4 w-4" />
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

export default Billing;
