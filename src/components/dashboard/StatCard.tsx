
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  MinusIcon 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ElementType;
  change?: number;
  trend?: 'positive' | 'negative' | 'neutral';
  trendLabel?: string;
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  trend = 'neutral',
  trendLabel,
  className 
}: StatCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 rounded-xl card-hover animate-in fade-in", 
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </div>
      
      <div className="flex items-baseline">
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
      
      {(change !== undefined || trendLabel) && (
        <div className={cn(
          "flex items-center mt-2 text-xs font-medium",
          trend === 'positive' && "text-emerald-500",
          trend === 'negative' && "text-rose-500",
          trend === 'neutral' && "text-muted-foreground"
        )}>
          <span className="flex items-center mr-1">
            {trend === 'positive' && <ArrowUpIcon className="h-3 w-3 mr-1" />}
            {trend === 'negative' && <ArrowDownIcon className="h-3 w-3 mr-1" />}
            {trend === 'neutral' && <MinusIcon className="h-3 w-3 mr-1" />}
            {change !== undefined && (
              <span>{change > 0 ? '+' : ''}{change}%</span>
            )}
          </span>
          {trendLabel && <span>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
