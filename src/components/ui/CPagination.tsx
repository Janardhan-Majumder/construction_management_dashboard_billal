import React from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { cn } from "../../utils/cn";
import type { TQuery, TSetQuery } from "../../types/common.type";

type TProps = {
  className?: string;
  totalData: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  customNavigation?: boolean;
  minCount?: number;
  setQuery: TSetQuery;
  query: TQuery;
  size?: "small" | "default";
};

const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement,
) => {
  if (type === "prev") {
    return (
      <button className="border border-secondery/50 hover:border-secondery outline-none rounded-lg px-3 transition-all">
        Previous
      </button>
    );
  }
  if (type === "next") {
    return (
      <button className="border border-secondery/50 hover:border-secondery outline-none rounded-lg px-3 transition-all">
        Next
      </button>
    );
  }
  return originalElement;
};

const CPagination: React.FC<TProps> = ({
  className,
  totalData,
  showSizeChanger = true,
  showQuickJumper = true,
  customNavigation = true,
  setQuery,
  minCount = 10,
  query,
  size = "default",
}) => {
  if (totalData > minCount) {
    return (
      <div className={cn("w-full flex justify-center py-10 ", className)}>
        <Pagination
          size={size}
          itemRender={customNavigation ? itemRender : undefined}
          align="center"
          showQuickJumper={showQuickJumper}
          showSizeChanger={showSizeChanger}
          total={totalData || 1}
          current={query.page}
          defaultCurrent={1}
          onChange={(page) => setQuery((c) => ({ ...c, page }))}
          pageSize={query.limit}
          onShowSizeChange={(_current, size) =>
            setQuery((c) => ({ ...c, limit: size }))
          }
        />
      </div>
    );
  }
  return null;
};

export default CPagination;
