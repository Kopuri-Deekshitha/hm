
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const BookingSummaryCards = ({ isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Today's Check-ins</CardTitle>
          <CardDescription>May 17, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm font-medium">Sarah Williams</p>
                    <p className="text-xs text-muted-foreground">Room 102</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Check In</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Today's Check-outs</CardTitle>
          <CardDescription>May 17, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm font-medium">John Adams</p>
                    <p className="text-xs text-muted-foreground">Room 204</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Check Out</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Summary</CardTitle>
          <CardDescription>Current Status</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-sm font-medium">42</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Active Guests</p>
                <p className="text-sm font-medium">16</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-sm font-medium">24</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Available Rooms</p>
                <p className="text-sm font-medium">12</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummaryCards;
