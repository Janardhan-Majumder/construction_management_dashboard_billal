import EarningBarChart from "../../components/dashboard/EarningChart";
import StatusCart from "../../components/ui/StatusCart";
import { useAdminStatusQuery } from "../../redux/features/others/othersApi";
import { cn } from "../../utils/cn";
import { formatTwoDigits } from "../../lib/helpers/getTwoDisit";
import { CiDollar, CiMedicalCase } from "react-icons/ci";
import { PiUsersThreeLight } from "react-icons/pi";
import { useAppSelector } from "../../redux/hooks";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useAdminStatusQuery(undefined);
  const statusData = [
    {
      iconBg: "#F58220",
      icon: CiDollar,
      category: user?.role === "admin" ? "Total Earnings" : "Total Sites",
      total:
        user?.role === "admin"
          ? `$${formatTwoDigits({ num: data?.totalEarnings })}`
          : `${formatTwoDigits({ num: data?.totalRevenue })}`,
    },
    {
      iconBg: "#7FB036",
      icon: PiUsersThreeLight,
      category: "Total Users",
      total: formatTwoDigits({ num: data?.totalUsers }),
    },
    {
      iconBg: "#03A188",
      icon: CiMedicalCase,
      category: user?.role === "admin" ? "Total Companies" : "Total Projects",
      total:
        user?.role === "admin"
          ? `${formatTwoDigits({ num: data?.totalCompanies })}`
          : `${formatTwoDigits({ num: data?.totalProjects })}`,
    },
  ];
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div
          className={cn("grid grid-cols-3 gap-x-5 2xl:gap-x-6 gap-y-8", {
            "opacity-60 animate-pulse": isLoading,
          })}
        >
          {statusData.map((item, index: number) => (
            <StatusCart
              key={index}
              data={item}
              // className={index++ % 2 == 0 ? "bg-[#E6ECEA]" : undefined}
            />
          ))}
        </div>
        <EarningBarChart className="mt-10 2xl:mt-16" />
      </div>
    </div>
  );
};

export default Home;
