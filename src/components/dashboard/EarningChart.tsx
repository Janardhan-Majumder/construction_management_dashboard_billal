/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { DatePicker, type DatePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { cn } from "../../utils/cn";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";
import { useGetEarnigsChartQuery } from "../../redux/features/transaction/transactionApi";
import type { TUniObject } from "../../types/common.type";
import LoaderWraperComp from "../LoaderWraperComp";
// import { useGetMonthlyEarningsQuery } from "@/redux/features/wallet/wallet.api";

const EarningBarChart = ({ className }: { className?: string }) => {
  const [cartYear, setCartYear] = useState(new Date().getFullYear());
  const { data, isError, error } = useGetEarnigsChartQuery([
    { name: "year", value: cartYear },
  ]);

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setCartYear(new Date(dateString as string).getFullYear());
  };

  // Format data for the chart - include all 12 months
  // const demoEarningsData = {
  //   currency: "USD",
  //   months: [
  //     { month: "Jan", earnings: 12500, transactionCount: 18 },
  //     { month: "Feb", earnings: 9800, transactionCount: 14 },
  //     { month: "Mar", earnings: 15300, transactionCount: 22 },
  //     { month: "Apr", earnings: 8700, transactionCount: 11 },
  //     { month: "May", earnings: 19400, transactionCount: 29 },
  //     { month: "Jun", earnings: 21200, transactionCount: 31 },
  //     { month: "Jul", earnings: 17600, transactionCount: 25 },
  //     { month: "Aug", earnings: 16200, transactionCount: 23 },
  //     { month: "Sep", earnings: 14100, transactionCount: 19 },
  //     { month: "Oct", earnings: 18900, transactionCount: 27 },
  //     { month: "Nov", earnings: 22100, transactionCount: 33 },
  //     { month: "Dec", earnings: 24800, transactionCount: 38 },
  //   ],
  // };

  return (
    <div
      className={cn(
        "rounded-xl border border-secondery/50 p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex justify-between items-center mb-6 px-4">
        <h4 className="text-[20px] font-medium">Earnings</h4>
        <DatePicker
          prefix={"Year"}
          placeholder="Year"
          allowClear={false}
          picker="year"
          value={dayjs(`${cartYear}`, "YYYY")}
          onChange={onChange}
          style={{
            border: "none",
            borderBottom: "1px solid gray",
            borderRadius: 0,
            width: "120px",
            paddingLeft: 5,
            paddingRight: 5,
          }}
        />
      </div>
      <LoaderWraperComp isLoading={false} isError={isError} error={error}>
        <div className="w-full max-w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data?.map((item: TUniObject, index: number) => ({
                month: item.month,
                earnings: item.totalEarnings,
                transactionCount: item.transactionCount,
                key: index,
              }))}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray=""
                stroke="#587F71"
              />
              <XAxis
                dataKey="month"
                tick={{ stroke: "#7D7D7D", strokeWidth: 0 }}
              />
              <YAxis
                axisLine={false}
                tick={{ stroke: "#959393", strokeWidth: 0 }}
                tickFormatter={(value) =>
                  `${value.toString().length < 2 ? "0" + value : value / 1000}K`
                }
              />
              <Tooltip content={<CustomTooltip currency={"USD"} />} />
              <Bar
                dataKey="earnings"
                fill="#587F71"
                barSize={30}
                activeBar={<Rectangle fill="#16B989" stroke="#00D698" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </LoaderWraperComp>
    </div>
  );
};

interface CustomTooltipProps extends TooltipProps<any, any> {
  payload?: any[];
  label?: string | number;
  currency?: string;
}

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload, label, currency = "USD" } = props;
  if (active && payload && payload.length) {
    const earnings = payload[0].payload.earnings;
    const transactionCount = payload[0].payload.transactionCount;

    return (
      <div className="bg-[#EEF7E6] p-3 rounded shadow-lg border border-gray-100 min-w-30">
        <p className="text-green-600 font-semibold text-sm">{label}</p>
        <p className="text-green-500 font-bold text-base mt-1">
          {currency} {earnings.toFixed(2)}
        </p>
        {transactionCount > 0 && (
          <p className="text-gray-600 text-xs mt-1">
            {transactionCount}{" "}
            {transactionCount === 1 ? "transaction" : "transactions"}
          </p>
        )}
      </div>
    );
  }
  return null;
};
export default EarningBarChart;
