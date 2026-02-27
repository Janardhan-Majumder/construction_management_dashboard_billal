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
    <div className={cn("flex flex-col justify-around drop-shadow-xs border border-gray-100 bg-white rounded-lg p-4 2xl:p-6", className)}>
      <h3 className="text-xl text-black/50">{data.category}</h3>
      <p className="text-3xl 2xl:text-4xl text-brand font-semibold">{data.total}</p>
    </div>
  );
};

export default StatusCart;
