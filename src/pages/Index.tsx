
import React from 'react';
import { BedDouble, DollarSign, Users, Calendar, ArrowUpRight, Plus, FileText } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import OccupancyChart from '@/components/dashboard/OccupancyChart';
import RoomStatusSummary from '@/components/dashboard/RoomStatusSummary';
import ResidentList from '@/components/dashboard/ResidentList';
import PaymentStatus from '@/components/dashboard/PaymentStatus';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-8 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-semibold tracking-tight mb-1">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Admin</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="gap-1">
                  <FileText className="h-4 w-4" />
                  Generate Report
                </Button>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  New Booking
                </Button>
              </div>
            </div>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <DashboardCard className="animate-in fade-in col-span-1 lg:col-span-2">
              <OccupancyChart />
            </DashboardCard>
            <div className="animate-in fade-in [animation-delay:150ms]">
              <RoomStatusSummary />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1 lg:col-span-2 animate-in fade-in">
              <RevenueChart />
            </div>
            <div className="animate-in fade-in [animation-delay:150ms]">
              <PaymentStatus />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
            <div className="animate-in fade-in">
              <ResidentList />
            </div>
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
