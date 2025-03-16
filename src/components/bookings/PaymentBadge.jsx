
import { Badge } from '@/components/ui/badge';

const PaymentBadge = ({ status }) => {
  const paymentStyles = {
    paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    partial: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500",
    unpaid: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
  };

  const displayText = {
    paid: "Paid",
    partial: "Partial",
    unpaid: "Unpaid"
  };

  return (
    <Badge variant="outline" className={`${paymentStyles[status]} font-normal`}>
      {displayText[status]}
    </Badge>
  );
};

export default PaymentBadge;
