
import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Download, 
  MoreHorizontal, 
  CheckCircle, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Payments = () => {
  const [view, setView] = useState('all');
  const [period, setPeriod] = useState('month');

  // Sample payments data
  const payments = {
    all: [
      { id: 1, resident: 'Michael Brown', room: '405', amount: 700, date: '2024-05-05', status: 'paid' },
      { id: 2, resident: 'Lisa Wang', room: '210', amount: 650, date: '2024-05-03', status: 'paid' },
      { id: 3, resident: 'David Wilson', room: '203', amount: 650, dueDate: '2024-05-20', status: 'pending' },
      { id: 4, resident: 'Sarah Chen', room: '118', amount: 550, dueDate: '2024-05-21', status: 'pending' },
      { id: 5, resident: 'James Miller', room: '302', amount: 700, dueDate: '2024-05-10', status: 'overdue', daysLate: 5 },
      { id: 6, resident: 'Olivia Davis', room: '115', amount: 600, dueDate: '2024-05-08', status: 'overdue', daysLate: 7 },
      { id: 7, resident: 'Thomas Johnson', room: '201', amount: 650, date: '2024-05-01', status: 'paid' },
      { id: 8, resident: 'Emily Zhang', room: '304', amount: 700, dueDate: '2024-05-25', status: 'pending' },
    ],
    overview: {
      totalReceived: 2000,
      pendingAmount: 1850,
      overdueAmount: 1300,
      monthlyTarget: 5500
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status, daysLate) => {
    switch(status) {
      case 'paid':
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">
            <CheckCircle className="mr-1 h-3 w-3" /> Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="outline" className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-rose-500/20">
            <AlertTriangle className="mr-1 h-3 w-3" /> {daysLate} days late
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
            <p className="text-muted-foreground">Manage resident payments</p>
          </div>
          
          {/* Payment Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Received</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(payments.overview.totalReceived)}</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(payments.overview.pendingAmount)}</div>
                <p className="text-xs text-muted-foreground mt-1">{payments.all.filter(p => p.status === 'pending').length} payments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-500">{formatCurrency(payments.overview.overdueAmount)}</div>
                <p className="text-xs text-muted-foreground mt-1">{payments.all.filter(p => p.status === 'overdue').length} payments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(payments.overview.monthlyTarget)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((payments.overview.totalReceived / payments.overview.monthlyTarget) * 100)}% achieved
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Payments Table */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Management
                  </CardTitle>
                  <CardDescription>View and manage all resident payments</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Record Payment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full" onValueChange={setView}>
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="all" className="flex items-center">
                      All Payments
                    </TabsTrigger>
                    <TabsTrigger value="paid" className="flex items-center">
                      <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                      Paid
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex items-center">
                      <Clock className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="overdue" className="flex items-center">
                      <AlertTriangle className="mr-1.5 h-3.5 w-3.5 text-rose-500" />
                      Overdue
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search payments..." className="pl-9 w-[200px]" />
                    </div>
                    <Button size="icon" variant="outline">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="all" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.all.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.resident}</TableCell>
                          <TableCell>{payment.room}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            {payment.status === 'paid' 
                              ? formatDate(payment.date) 
                              : formatDate(payment.dueDate)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(payment.status, payment.daysLate)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                <DropdownMenuItem>Edit Payment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="paid" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date Paid</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.all.filter(p => p.status === 'paid').map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.resident}</TableCell>
                          <TableCell>{payment.room}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                                <DropdownMenuItem>Edit Payment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="pending" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.all.filter(p => p.status === 'pending').map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.resident}</TableCell>
                          <TableCell>{payment.room}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{formatDate(payment.dueDate)}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                <DropdownMenuItem>Edit Payment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="overdue" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.all.filter(p => p.status === 'overdue').map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.resident}</TableCell>
                          <TableCell>{payment.room}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{formatDate(payment.dueDate)}</TableCell>
                          <TableCell>{getStatusBadge(payment.status, payment.daysLate)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                <DropdownMenuItem>Edit Payment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Payments;
