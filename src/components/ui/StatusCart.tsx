import { createElement } from "react";
import type { TUniObject } from "../../types/common.type";
import { cn } from "../../utils/cn";

const StatusCart = ({
  data,
  className,
}: {
  data: TUniObject;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center drop-shadow-xs border border-gray-100 bg-white rounded-lg p-4 xl:p-6 2xl:px-8",
        className,
      )}
    >
      <div
        className={cn("p-2 rounded-xl bg-primary text-white")}
        style={{ backgroundColor: data.iconBg }}
      >
        {createElement(data.icon, { className: "text-5xl" })}
      </div>
      <div className="text-right space-y-1">
        <h3 className="text-xl text-black/50">{data.category}</h3>
        <p className="text-3xl xl:text-4xl  2xl:text-5xl font-semibold">
          {data.total}
        </p>
      </div>
    </div>
  );
};

export default StatusCart;
