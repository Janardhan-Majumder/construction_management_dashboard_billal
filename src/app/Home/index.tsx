import { Typography } from "antd";
import EarningBarChart from "../../components/dashboard/EarningChart";
import TransactionList from "../../components/earnings/TransactionList";
import StatusCart from "../../components/ui/StatusCart";
import { useAdminStatusQuery } from "../../redux/features/others/othersApi";
import { cn } from "../../utils/cn";
import { formatTwoDigits } from "../../lib/helpers/getTwoDisit";
const { Title } = Typography;

const Home = () => {
  const { data, isLoading } = useAdminStatusQuery(undefined);
  const statusData = [
    {
      category: "Total Earnings",
      total: `$${formatTwoDigits({ num: data?.totalRevenue, allToString: true })}`,
    },
    {
      category: "Total Users",
      total: formatTwoDigits({ num: data?.totalUsers }),
    },
    {
      category: "Withdrawable",
      total: `$${formatTwoDigits({ num: data?.totalWithdrawals, allToString: true })}`,
    },
    {
      category: "Total Drivers",
      total: formatTwoDigits({ num: data?.totalDrivers }),
    },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4 2xl:gap-5">
        <EarningBarChart className="col-span-8" />
        <div
          className={cn("col-span-4 grid grid-cols-2 gap-x-5 gap-y-8", {
            "opacity-60 animate-pulse": isLoading,
          })}
        >
          {statusData.map((item, index) => (
            <StatusCart
              key={item.category}
              data={item}
              className={index++ % 2 == 0 ? "bg-[#E6ECEA]" : undefined}
            />
          ))}
        </div>
      </div>
      <Title level={3} className="text-brand! mt-10!">
        Recent Transactions
      </Title>
      <TransactionList />
    </div>
  );
};

export default Home;
