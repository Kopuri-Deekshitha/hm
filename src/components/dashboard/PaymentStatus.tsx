
import React from 'react';
import { CreditCard, CheckCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const payments = {
  paid: [
    { id: 1, resident: 'Michael Brown', room: '405', amount: '$700', date: 'May 5, 2024' },
    { id: 2, resident: 'Lisa Wang', room: '210', amount: '$650', date: 'May 3, 2024' },
  ],
  pending: [
    { id: 3, resident: 'David Wilson', room: '203', amount: '$650', dueDate: 'May 20, 2024' },
    { id: 4, resident: 'Sarah Chen', room: '118', amount: '$550', dueDate: 'May 21, 2024' },
  ],
  overdue: [
    { id: 5, resident: 'James Miller', room: '302', amount: '$700', dueDate: 'May 10, 2024', daysLate: 5 },
    { id: 6, resident: 'Olivia Davis', room: '115', amount: '$600', dueDate: 'May 8, 2024', daysLate: 7 },
  ]
};

const PaymentStatus = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Payment Status
            </CardTitle>
            <CardDescription>Track resident payments</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Record Payment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="paid" className="flex items-center">
              <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
              Paid ({payments.paid.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center">
              <Clock className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
              Pending ({payments.pending.length})
            </TabsTrigger>
            <TabsTrigger value="overdue" className="flex items-center">
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5 text-rose-500" />
              Overdue ({payments.overdue.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="paid" className="mt-0">
            <div className="space-y-3">
              {payments.paid.map(payment => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                  <div>
                    <p className="font-medium">{payment.resident}</p>
                    <p className="text-sm text-muted-foreground">Room {payment.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{payment.amount}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">
                        Paid
                      </Badge>
                      <span className="ml-2">{payment.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <div className="space-y-3">
              {payments.pending.map(payment => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                  <div>
                    <p className="font-medium">{payment.resident}</p>
                    <p className="text-sm text-muted-foreground">Room {payment.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{payment.amount}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20">
                        Due
                      </Badge>
                      <span className="ml-2">{payment.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="overdue" className="mt-0">
            <div className="space-y-3">
              {payments.overdue.map(payment => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                  <div>
                    <p className="font-medium">{payment.resident}</p>
                    <p className="text-sm text-muted-foreground">Room {payment.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{payment.amount}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-rose-500/20">
                        {payment.daysLate} days late
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Button variant="outline" size="sm" className="w-full mt-4">
          <span>View All Payments</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentStatus;
