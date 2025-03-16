
import { Badge } from '@/components/ui/badge';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
    'checked-in': "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    'checked-out': "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
  };

  const displayText = {
    confirmed: "Confirmed",
    'checked-in': "Checked In",
    'checked-out': "Checked Out",
    pending: "Pending",
    cancelled: "Cancelled"
  };

  return (
    <Badge variant="outline" className={`${statusStyles[status]} font-normal`}>
      {displayText[status]}
    </Badge>
  );
};

export default StatusBadge;
