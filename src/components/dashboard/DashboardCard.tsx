
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const DashboardCard = ({ 
  children, 
  title, 
  description, 
  className,
  ...props 
}: DashboardCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 card-hover animate-in fade-in", 
        className
      )} 
      {...props}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default DashboardCard;
