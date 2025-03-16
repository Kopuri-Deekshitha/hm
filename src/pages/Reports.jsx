import React, { useState } from 'react';
import {
  BarChart, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Calendar, 
  Download, 
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [period, setPeriod] = useState('month');
  const [chartView, setChartView] = useState('occupancy');
  
  // Sample data for different reports
  const revenueData = [
    { month: 'Jan', revenue: 12400 },
    { month: 'Feb', revenue: 14800 },
    { month: 'Mar', revenue: 15600 },
    { month: 'Apr', revenue: 16200 },
    { month: 'May', revenue: 18600 },
    { month: 'Jun', revenue: 17800 },
  ];

  const occupancyData = [
    { name: 'Occupied', value: 42, color: 'hsl(var(--primary))' },
    { name: 'Available', value: 13, color: 'hsl(var(--muted))' },
    { name: 'Maintenance', value: 5, color: 'hsl(var(--destructive))' },
    { name: 'Reserved', value: 8, color: 'hsl(var(--accent-foreground))' },
  ];

  const bookingTrendsData = [
    { month: 'Jan', bookings: 18 },
    { month: 'Feb', bookings: 24 },
    { month: 'Mar', bookings: 32 },
    { month: 'Apr', bookings: 28 },
    { month: 'May', bookings: 36 },
    { month: 'Jun', bookings: 42 },
  ];

  const maintenanceData = [
    { month: 'Jan', completed: 12, pending: 3 },
    { month: 'Feb', completed: 18, pending: 5 },
    { month: 'Mar', completed: 15, pending: 2 },
    { month: 'Apr', completed: 20, pending: 4 },
    { month: 'May', completed: 22, pending: 6 },
    { month: 'Jun', completed: 16, pending: 3 },
  ];

  // Stats cards data
  const statsData = [
    {
      title: 'Total Revenue',
      value: '$18,600',
      previousValue: '$16,200',
      change: 14.8,
      trend: 'positive'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      previousValue: '72%',
      change: 8.3,
      trend: 'positive'
    },
    {
      title: 'Average Stay',
      value: '4.2 months',
      previousValue: '3.8 months',
      change: 10.5,
      trend: 'positive'
    },
    {
      title: 'Maintenance Costs',
      value: '$3,250',
      previousValue: '$2,800',
      change: 16.1,
      trend: 'negative'
    }
  ];

  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 shadow-soft rounded-md border border-border/50 text-sm">
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="font-medium">
              {entry.name === 'revenue' ? 
                `Revenue: $${entry.value.toLocaleString()}` : 
                entry.name === 'bookings' ?
                `Bookings: ${entry.value}` :
                `${entry.name}: ${entry.value}`
              }
            </p>
          ))}
          <p className="text-muted-foreground text-xs">{label}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 shadow-soft rounded-md border border-border/50 text-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-muted-foreground text-xs">
            {Math.round((payload[0].value / 68) * 100)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">Analytics and reports</p>
          </div>
          
          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`flex items-center text-xs mt-1 ${
                    stat.trend === 'positive' ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {stat.trend === 'positive' ? 
                      <ArrowUp className="h-3 w-3 mr-1" /> : 
                      <ArrowDown className="h-3 w-3 mr-1" />}
                    <span>{stat.change}% {stat.trend === 'positive' ? 'increase' : 'decrease'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Main Charts Area */}
          <Card className="shadow-sm mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Performance Analytics
                  </CardTitle>
                  <CardDescription>Visualize key metrics and trends</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="revenue" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="revenue" onClick={() => setChartView('revenue')}>
                    <BarChart className="mr-2 h-4 w-4" />
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger value="occupancy" onClick={() => setChartView('occupancy')}>
                    <PieChart className="mr-2 h-4 w-4" />
                    Occupancy
                  </TabsTrigger>
                  <TabsTrigger value="bookings" onClick={() => setChartView('bookings')}>
                    <LineChart className="mr-2 h-4 w-4" />
                    Booking Trends
                  </TabsTrigger>
                  <TabsTrigger value="maintenance" onClick={() => setChartView('maintenance')}>
                    <BarChart className="mr-2 h-4 w-4" />
                    Maintenance
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="revenue" className="m-0">
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis 
                          tickFormatter={(value) => `$${value/1000}k`}
                          axisLine={false} 
                          tickLine={false}
                          width={50}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar 
                          name="revenue"
                          dataKey="revenue" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]}
                          barSize={30} 
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="occupancy" className="m-0">
                  <div className="flex flex-col md:flex-row items-center justify-between h-[400px] w-full">
                    <div className="w-full md:w-2/5 h-full flex flex-col justify-center">
                      <div className="space-y-3">
                        <h3 className="text-xl font-medium">Room Occupancy</h3>
                        <p className="text-sm text-muted-foreground">Current room allocation status</p>
                        <div className="space-y-2 mt-4">
                          {occupancyData.map((entry, index) => (
                            <div key={`legend-${index}`} className="flex items-center text-sm">
                              <div 
                                className="h-3 w-3 rounded-sm mr-2" 
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-muted-foreground">{entry.name}:</span>
                              <span className="ml-1 font-medium">{entry.value} rooms</span>
                              <span className="ml-1 text-xs text-muted-foreground">
                                ({Math.round((entry.value / 68) * 100)}%)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-3/5 h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={occupancyData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={120}
                            paddingAngle={4}
                            dataKey="value"
                            animationDuration={800}
                            animationBegin={300}
                          >
                            {occupancyData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color} 
                                stroke="transparent"
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<PieTooltip />} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="bookings" className="m-0">
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={bookingTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="bookings" 
                          name="bookings"
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="maintenance" className="m-0">
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={maintenanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar 
                          dataKey="completed" 
                          name="Completed"
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]}
                          barSize={20} 
                        />
                        <Bar 
                          dataKey="pending" 
                          name="Pending"
                          fill="hsl(var(--muted))" 
                          radius={[4, 4, 0, 0]}
                          barSize={20} 
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end mt-4 pt-4 border-t">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Room Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Room Type Distribution</CardTitle>
                <CardDescription>Breakdown of room types and their occupancy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Single Rooms</span>
                    <span className="text-sm font-medium">28/32 (88%)</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Double Rooms</span>
                    <span className="text-sm font-medium">16/20 (80%)</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Deluxe Rooms</span>
                    <span className="text-sm font-medium">6/10 (60%)</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Shared Dormitories</span>
                    <span className="text-sm font-medium">12/16 (75%)</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Statistics</CardTitle>
                <CardDescription>Payment methods and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment Methods</h4>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Credit Card</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bank Transfer</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cash</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment Status</h4>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Paid On Time</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Late Payments</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Unpaid</span>
                        <span className="text-sm font-medium">7%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Average Stay</h4>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Short Term (&lt; 1 month)</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Medium (1-3 months)</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Long Term (&gt; 3 months)</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Resident Demographics</h4>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Students</span>
                        <span className="text-sm font-medium">55%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Professionals</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tourists</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
