
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BedDouble, 
  Users, 
  Receipt, 
  Wrench, 
  Menu, 
  ChevronLeft,
  Calendar,
  CreditCard,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavItem = ({ to, icon: Icon, label, active, collapsed }) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start mb-1 transition-all",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          collapsed ? "px-3" : "px-4"
        )}
      >
        <Icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/rooms', label: 'Rooms', icon: BedDouble },
    { path: '/bookings', label: 'Bookings', icon: Calendar },
    { path: '/residents', label: 'Residents', icon: Users },
    { path: '/payments', label: 'Payments', icon: CreditCard },
    { path: '/reports', label: 'Reports', icon: BarChart },
    { path: '/maintenance', label: 'Maintenance', icon: Wrench },
  ];

  return (
    <div
      className={cn(
        "h-screen border-r border-border/40 bg-sidebar fixed top-0 left-0 transition-all duration-300 z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/40">
          {!collapsed && (
            <div className="font-semibold text-xl tracking-tight text-sidebar-foreground">
              StayEase
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto rounded-full"
          >
            {collapsed ? (
              <Menu className="h-5 w-5 text-sidebar-foreground" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-sidebar-foreground" />
            )}
          </Button>
        </div>
        
        <div className={cn("flex flex-col py-4 px-2 flex-1 overflow-auto")}>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                active={isActive(item.path)}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-border/40 mt-auto">
          {!collapsed && (
            <div className="text-xs text-sidebar-foreground/70">
              <p>StayEase v1.0</p>
              <p>© 2024 All rights reserved</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
