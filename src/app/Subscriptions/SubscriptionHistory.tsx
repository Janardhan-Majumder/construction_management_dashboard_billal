import { IoChevronBack, IoSearchOutline } from "react-icons/io5";
import PageHeading from "../../components/ui/PageHeading";
import { Button, DatePicker, Input } from "antd";
import { useSubscriptionHistoryQuery } from "../../redux/features/subscription/subscriptionApi";
import { useState } from "react";
import type { TQuery, TUniObject } from "../../types/common.type";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import { BsInfo } from "react-icons/bs";
import CPagination from "../../components/ui/CPagination";
import { debounceSearch } from "../../utils/debounce";

const SubscriptionHistory = () => {
  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
  });
  const { data, isLoading, isError, error } = useSubscriptionHistoryQuery(
    queryFormat(query),
  );
  return (
    <div>
      <div className="flex justify-between gap-2 pt-8 pb-4">
        <PageHeading
          title={`Subscription History`}
          backIcon={IoChevronBack}
          className="capitalize"
        />
        <div className="flex justify-end gap-3">
          <DatePicker
            // allowClear
            onChange={(_date, dateString) => {
              setQuery((c) => ({
                ...c,
                date: dateString ? new Date(dateString as string) : undefined,
              }));
            }}
            className="rounded-full!"
          />
          <Input
            onChange={(e) =>
              debounceSearch({
                setter: setQuery,
                newValue: e.target.value,
                name: "searchTerm",
              })
            }
            allowClear
            placeholder="Search here.."
            suffix={<IoSearchOutline size={18} />}
            className="rounded-full! xl:w-64!"
          />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-12 gap-2 xl:gap-4 bg-primary py-2.5 px-4 rounded-lg text-white divide-x divide-white/20 mb-4">
          <p className="col-span-3">Company Name</p>
          <p className="col-span-2 text-center">Status</p>
          <p className="col-span-2">Price</p>
          <p className="col-span-2">Payment Due</p>
          <p className="col-span-2">Plan Name</p>
          <p className="col-span-1 text-center">Action</p>
        </div>
        <LoaderWraperComp
          dataEmpty={data?.data?.length === 0}
          isLoading={isLoading}
          isError={isError}
          error={error}
        >
          {data?.data?.map((item: TUniObject, inex: number) => (
            <div
              key={inex}
              className="grid items-center grid-cols-12 gap-2 xl:gap-4 py-2.5 px-4 divide-x divide-white/20 bg-gray-100 hover:bg-gray-50 rounded-lg mt-2"
            >
              <div className="col-span-3">
                <p className="font-semibold">{item?.userId?.companyId?.name}</p>
                <p className="text-sm">
                  {item?.userId?.companyId?.workType || "N/A"}
                </p>
              </div>
              <p className="col-span-2 capitalize text-center">
                {item.status === "active" ? (
                  <IoIosCheckmarkCircle className="text-green-400 size-[18px] inline mr-0.5" />
                ) : (
                  <IoIosCloseCircle className="text-red-400 size-[18px] inline mr-0.5" />
                )}
                {item.status}
              </p>
              <p className="col-span-2">${item.amountPaid}</p>
              <div className="col-span-2">
                {new Date(item.endDate) > new Date() ? (
                  <p>
                    <span>
                      {Math.ceil(
                        (new Date(item.endDate).getTime() - Date.now()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      Days
                    </span>
                    <br />
                    <span className="text-sm text-gray-500">
                      {new Date(item.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                ) : (
                  <span className="text-red-400">Not Valid</span>
                )}
              </div>
              <p className="col-span-2">{item.planId.name}</p>
              <div className="col-span-1 text-center">
                <Button
                  shape="circle"
                  size="small"
                  style={{ background: "none" }}
                  icon={<BsInfo size={20} className="mt-[1.2px] ml-[1.7px]" />}
                />
              </div>
            </div>
          ))}
        </LoaderWraperComp>
        <CPagination
          setQuery={setQuery}
          query={query}
          totalData={data?.meta?.total}
        />
      </div>
    </div>
  );
};

export default SubscriptionHistory;
