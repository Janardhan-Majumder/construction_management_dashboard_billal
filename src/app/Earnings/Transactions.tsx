import StatusCart from "../../components/ui/StatusCart";
import TransactionList from "../../components/earnings/TransactionList";
import { useAdminStatusQuery } from "../../redux/features/others/othersApi";
import { cn } from "../../utils/cn";
import { formatTwoDigits } from "../../lib/helpers/getTwoDisit";

const Transactions = () => {
  const { data, isLoading } = useAdminStatusQuery(undefined);

  const statusData = [
    {
      category: "Total Earnings",
      total: `$${formatTwoDigits({ num: data?.totalRevenue, allToString: true })}`,
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
    <>
      <div
        className={cn("col-span-4 grid grid-cols-3 gap-x-5 gap-y-8 pb-16", {
          "opacity-60 animate-pulse": isLoading,
        })}
      >
        {statusData.map((item, index) => (
          <StatusCart
            key={index}
            data={item}
            className=" space-y-4 border-[#B0B0B0]"
          />
        ))}
      </div>

      <TransactionList btnType="view" needSearch={true} />
    </>
  );
};

export default Transactions;
