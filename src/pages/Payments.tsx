
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Payments = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="font-semibold tracking-tight">Payments</h1>
            <p className="text-muted-foreground">Manage resident payments</p>
          </div>
          
          <div className="bg-accent/50 p-12 rounded-lg flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-medium mb-2">Payments Management</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              This page will contain the payments management functionality. Coming soon!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payments;
