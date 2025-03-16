
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface OccupancyData {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-card p-2 shadow-soft rounded-md border border-border/50 text-sm">
        <p className="font-medium">{payload[0].name}: {payload[0].value}</p>
        <p className="text-muted-foreground text-xs">
          {Math.round(payload[0].payload.percent)}% of total
        </p>
      </div>
    );
  }

  return null;
};

const OccupancyChart = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const data: OccupancyData[] = [
    { name: 'Occupied', value: 42, color: 'hsl(var(--primary))' },
    { name: 'Available', value: 13, color: 'hsl(var(--muted))' },
    { name: 'Maintenance', value: 5, color: 'hsl(var(--destructive))' },
    { name: 'Reserved', value: 8, color: 'hsl(var(--accent-foreground))' },
  ];

  // Calculate percentages
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const dataWithPercent = data.map(item => ({
    ...item,
    percent: (item.value / total) * 100
  }));

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-[300px] w-full">
      <div className="w-full md:w-2/5 h-full flex flex-col justify-center">
        <div className="space-y-3">
          <h3 className="text-xl font-medium">Room Occupancy</h3>
          <p className="text-sm text-muted-foreground">Current room allocation status</p>
          <div className="space-y-2 mt-4">
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center text-sm">
                <div 
                  className="h-3 w-3 rounded-sm mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">{entry.name}:</span>
                <span className="ml-1 font-medium">{entry.value} rooms</span>
                <span className="ml-1 text-xs text-muted-foreground">
                  ({Math.round((entry.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-3/5 h-full">
        {isClient && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercent}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                animationDuration={800}
                animationBegin={300}
              >
                {dataWithPercent.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default OccupancyChart;
