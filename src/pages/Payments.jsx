
import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Receipt, DollarSign, Download, ArrowUpDown, CheckCircle, Clock, XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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

// Sample payment data
const payments = [
  { id: 'INV-1001', resident: 'John Smith', room: '101', amount: '$550', dueDate: '2024-05-10', paidDate: '2024-05-08', status: 'paid', method: 'Credit Card', type: 'Rent' },
  { id: 'INV-1002', resident: 'Emma Johnson', room: '104', amount: '$650', dueDate: '2024-05-10', paidDate: '2024-05-07', status: 'paid', method: 'Bank Transfer', type: 'Rent' },
  { id: 'INV-1003', resident: 'Alex Rodriguez', room: '201', amount: '$400', dueDate: '2024-05-15', paidDate: '2024-05-12', status: 'paid', method: 'Credit Card', type: 'Rent' },
  { id: 'INV-1004', resident: 'Sarah Chen', room: '203', amount: '$550', dueDate: '2024-05-20', paidDate: null, status: 'pending', method: null, type: 'Rent' },
  { id: 'INV-1005', resident: 'David Wilson', room: '205', amount: '$750', dueDate: '2024-05-21', paidDate: null, status: 'pending', method: null, type: 'Rent' },
  { id: 'INV-1006', resident: 'Michael Brown', room: '405', amount: '$700', dueDate: '2024-05-22', paidDate: null, status: 'pending', method: null, type: 'Rent' },
  { id: 'INV-1007', resident: 'Lisa Taylor', room: '302', amount: '$600', dueDate: '2024-04-15', paidDate: null, status: 'overdue', method: null, type: 'Rent' },
  { id: 'INV-1008', resident: 'Robert Garcia', room: '402', amount: '$75', dueDate: '2024-05-05', paidDate: '2024-05-03', status: 'paid', method: 'Credit Card', type: 'Utilities' },
  { id: 'INV-1009', resident: 'Jennifer Lee', room: '301', amount: '$80', dueDate: '2024-05-20', paidDate: null, status: 'pending', method: null, type: 'Utilities' },
  { id: 'INV-1010', resident: 'James Wilson', room: '105', amount: '$550', dueDate: '2024-04-20', paidDate: null, status: 'overdue', method: null, type: 'Rent' },
];

// Payment Status Badge component
const PaymentStatusBadge = ({ status }) => {
  const statusStyles = {
    paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500 flex items-center",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500 flex items-center",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500 flex items-center"
  };
  
  const StatusIcon = {
    paid: CheckCircle,
    pending: Clock,
    overdue: XCircle
  }[status];
  
  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const Payments = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  
  // Filter payments based on status
  const getFilteredPayments = () => {
    if (selectedTab === 'all') return payments;
    return payments.filter(payment => payment.status === selectedTab);
  };

  // Calculate total due/paid
  const totalDue = payments.reduce((sum, payment) => {
    return sum + parseFloat(payment.amount.replace('$', ''));
  }, 0);
  
  const totalPaid = payments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => {
      return sum + parseFloat(payment.amount.replace('$', ''));
    }, 0);
  
  const totalPending = payments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => {
      return sum + parseFloat(payment.amount.replace('$', ''));
    }, 0);
  
  const totalOverdue = payments
    .filter(payment => payment.status === 'overdue')
    .reduce((sum, payment) => {
      return sum + parseFloat(payment.amount.replace('$', ''));
    }, 0);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-in fade-in">
            <div>
              <h1 className="font-semibold tracking-tight">Payments</h1>
              <p className="text-muted-foreground">Manage resident payments</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalDue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">All invoices</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">${totalPaid.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">{payments.filter(p => p.status === 'paid').length} payments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">${totalPending.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">{payments.filter(p => p.status === 'pending').length} payments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">${totalOverdue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">{payments.filter(p => p.status === 'overdue').length} payments</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="paid">Paid</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search payments..."
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
                      <DropdownMenuCheckboxItem checked>
                        Payment Type
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>
                        Payment Method
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Date Range</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice ID</TableHead>
                      <TableHead>Resident</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Due Date
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
                    {getFilteredPayments().map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.resident}</TableCell>
                        <TableCell>{payment.room}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
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
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Credit Card</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                      <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Bank Transfer</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                      <div className="bg-primary h-full rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cash</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                      <div className="bg-primary h-full rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Emma Johnson paid $650</p>
                      <p className="text-xs text-muted-foreground">Today at 9:32 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">John Smith paid $550</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 5:17 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah Chen has pending payment</p>
                      <p className="text-xs text-muted-foreground">Due in 3 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lisa Taylor missed payment</p>
                      <p className="text-xs text-muted-foreground">20 days overdue</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Invoice
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Payment Report
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Clock className="h-4 w-4 mr-2" />
                    Send Payment Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payments;
