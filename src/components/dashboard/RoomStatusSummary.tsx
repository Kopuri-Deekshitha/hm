
import React from 'react';
import { BedDouble, AlertTriangle, Check } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const RoomStatusSummary = () => {
  // Room data
  const roomStatus = {
    total: 68,
    occupied: 42,
    available: 21,
    maintenance: 5
  };

  // Calculate percentages
  const occupiedPercentage = Math.round((roomStatus.occupied / roomStatus.total) * 100);
  const availablePercentage = Math.round((roomStatus.available / roomStatus.total) * 100);
  const maintenancePercentage = Math.round((roomStatus.maintenance / roomStatus.total) * 100);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Room Status</CardTitle>
        <CardDescription>Current room allocation overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <BedDouble className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Occupied</p>
                <p className="text-muted-foreground text-xs">{occupiedPercentage}% of rooms</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{roomStatus.occupied} rooms</p>
              <Progress value={occupiedPercentage} className="h-2 w-24" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2">
                <Check className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-muted-foreground text-xs">{availablePercentage}% of rooms</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{roomStatus.available} rooms</p>
              <Progress value={availablePercentage} className="h-2 w-24" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Maintenance</p>
                <p className="text-muted-foreground text-xs">{maintenancePercentage}% of rooms</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{roomStatus.maintenance} rooms</p>
              <Progress value={maintenancePercentage} className="h-2 w-24" />
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-2">
            View All Rooms
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomStatusSummary;
