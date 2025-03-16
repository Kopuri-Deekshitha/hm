
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerAction?: React.ReactNode;
  noPadding?: boolean;
}

const DashboardCard = ({ 
  children, 
  title, 
  description, 
  className,
  headerAction,
  noPadding = false,
  ...props 
}: DashboardCardProps) => {
  return (
    <Card 
      className={cn(
        "shadow-sm", 
        className
      )} 
      {...props}
    >
      {(title || description || headerAction) && (
        <CardHeader className={cn("flex-row items-start justify-between pb-2", noPadding && "px-0")}>
          <div>
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction && (
            <div>
              {headerAction}
            </div>
          )}
        </CardHeader>
      )}
      <CardContent className={cn(noPadding && "px-0")}>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
