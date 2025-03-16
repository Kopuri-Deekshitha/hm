
import React from 'react';
import { BedDouble, DollarSign, Users, Calendar, ArrowUpRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import OccupancyChart from '@/components/dashboard/OccupancyChart';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-8 animate-in fade-in">
            <h1 className="font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Rooms"
              value="68"
              icon={BedDouble}
              change={0}
              trend="neutral"
              trendLabel="No change"
              className="animate-in fade-in"
            />
            <StatCard
              title="Occupied Rooms"
              value="42"
              icon={Users}
              change={5}
              trend="positive"
              trendLabel="vs last month"
              className="animate-in fade-in [animation-delay:150ms]"
            />
            <StatCard
              title="Monthly Revenue"
              value="$28,560"
              icon={DollarSign}
              change={12}
              trend="positive"
              trendLabel="vs last month"
              className="animate-in fade-in [animation-delay:300ms]"
            />
            <StatCard
              title="Reservations"
              value="8"
              icon={Calendar}
              change={-3}
              trend="negative"
              trendLabel="vs last month"
              className="animate-in fade-in [animation-delay:450ms]"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <DashboardCard className="animate-in fade-in col-span-1 lg:col-span-2">
              <OccupancyChart />
            </DashboardCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <DashboardCard 
              title="Recent Residents" 
              description="New check-ins in the last 7 days"
              className="animate-in fade-in"
            >
              <div className="space-y-4">
                {[
                  { name: 'John Smith', room: '101', date: 'May 15, 2024' },
                  { name: 'Emma Johnson', room: '205', date: 'May 14, 2024' },
                  { name: 'Alex Rodriguez', room: '312', date: 'May 12, 2024' },
                ].map((resident, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div>
                      <p className="font-medium">{resident.name}</p>
                      <p className="text-sm text-muted-foreground">Room {resident.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{resident.date}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  View All Residents
                </Button>
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Pending Payments" 
              description="Payments due in the next 7 days"
              className="animate-in fade-in [animation-delay:150ms]"
            >
              <div className="space-y-4">
                {[
                  { name: 'David Wilson', room: '203', amount: '$650', due: 'May 20, 2024' },
                  { name: 'Sarah Chen', room: '118', amount: '$550', due: 'May 21, 2024' },
                  { name: 'Michael Brown', room: '405', amount: '$700', due: 'May 22, 2024' },
                ].map((payment, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <p className="text-sm text-muted-foreground">Room {payment.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">Due {payment.due}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  View All Payments
                </Button>
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Maintenance Requests" 
              description="Recent maintenance issues"
              className="animate-in fade-in [animation-delay:300ms]"
            >
              <div className="space-y-4">
                {[
                  { room: '106', issue: 'Broken shower', status: 'Pending', date: 'May 16, 2024' },
                  { room: '218', issue: 'AC not working', status: 'In Progress', date: 'May 14, 2024' },
                  { room: '304', issue: 'Leaking faucet', status: 'Pending', date: 'May 13, 2024' },
                ].map((request, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                    <div>
                      <p className="font-medium">Room {request.room}</p>
                      <p className="text-sm text-muted-foreground">{request.issue}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        request.status === 'Pending' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500'
                      }`}>
                        {request.status}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">{request.date}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  View All Requests
                </Button>
              </div>
            </DashboardCard>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <DashboardCard 
              className="animate-in fade-in flex flex-col sm:flex-row justify-between items-center p-8"
            >
              <div className="mb-6 sm:mb-0">
                <h2 className="text-2xl font-medium mb-2">Manage Your Hostel More Efficiently</h2>
                <p className="text-muted-foreground max-w-lg">
                  Explore all the features of StayEase to streamline operations, enhance resident experience, and boost your revenue.
                </p>
                <Button className="mt-4">
                  <span>Learn More</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="bg-primary/10 rounded-full p-6">
                <BedDouble className="h-16 w-16 text-primary" />
              </div>
            </DashboardCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
