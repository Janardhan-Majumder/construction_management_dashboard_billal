import { useParams } from "react-router";
import { useGetCompanyDetailsQuery } from "../../redux/features/Users/usersApi";
import PageHeading from "../../components/ui/PageHeading";
import { IoChevronBack, IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { formatTwoDigits } from "../../lib/helpers/getTwoDisit";
import CPagination from "../../components/ui/CPagination";
import { Button, DatePicker, Input, Table, type TableColumnsType } from "antd";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import { debounceSearch } from "../../utils/debounce";
import type { TQuery, TUniObject } from "../../types/common.type";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { BsInfoLg } from "react-icons/bs";
import { useCompanySubscriptionQuery } from "../../redux/features/subscription/subscriptionApi";

const CompanyDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "subscription">(
    "overview",
  );
  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
  });
  const { data, isLoading, isError, error } = useGetCompanyDetailsQuery({
    id,
    args: queryFormat(query),
  });
  const {
    data: subcriptionData,
    isLoading: subcriptionLoading,
    isError: subscriptionIsError,
    error: subscriptionError,
  } = useCompanySubscriptionQuery({ id });
  console.log(subcriptionData);
  const columns: TableColumnsType = [
    {
      title: "#ID No.",
      dataIndex: "_id",
      render: (text) => text,
    },
    {
      title: "Username",
      dataIndex: ["name"],
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (value) => (
        <p>
          {value || "N/A"}
          {/* <span className="text-slate-600">({record.currency})</span> */}
        </p>
      ),
      // align: "center",
    },
    {
      title: "Role",
      dataIndex: ["role"],
      render: (text: string) => (
        <p className="capitalize">{text.split("_").join(" ")}</p>
      ),
    },

    {
      title: "Expertise's",
      dataIndex: ["expertiseArea"],
      render: (text: string) => <p>{text || "N/A"}</p>,
    },
    {
      title: "Action",
      render: (record) => (
        <Button
          onClick={() => console.log(record._id)}
          shape="circle"
          size="small"
          style={{ background: "none" }}
          icon={<BsInfoLg size={14} className="mt-0.75" />}
        />
      ),
      align: "center",
    },
  ];
  const subscription = {
    activeDate: "01/01/26",
    endDate: "01/06/26",
    months: 6,
    label: "Months Subscription",
    savePercent: 15,
    price: 500,
    perYearPrice: 800,
  };
  return (
    <div>
      <PageHeading
        title={`Company Details`}
        backIcon={IoChevronBack}
        className="capitalize gap-0"
      />
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 2xl:h-20 2xl:w-20 rounded-full bg-teal-400 flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-white font-bold text-xs tracking-tight text-center leading-tight px-1 text-shadow-xs">
              {data?.company?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex flex-col gap-3 2xl:gap-4">
            <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
              {data?.company?.name || "N/A"}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "overview"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("subscription")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "subscription"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex items-center gap-10">
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-0.5">Total Employees</p>
            <p className="text-3xl font-bold text-teal-500 tracking-tight">
              {formatTwoDigits({ num: data?.meta?.total })}
            </p>
          </div>
          <div className="w-px h-12 bg-gray-100" />
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-0.5">Active Sites</p>
            <p className="text-3xl font-bold text-teal-500 tracking-tight">
              {formatTwoDigits({ num: data?.meta?.siteCount })}
            </p>
          </div>
        </div>
      </div>
      {activeTab === "overview" ? (
        <>
          <div className="flex justify-between gap-2 pt-8 pb-4">
            <PageHeading
              title={`All Employee List`}
              hideIcon
              className="capitalize"
            />
            <div className="flex justify-end gap-3">
              <DatePicker
                // allowClear
                onChange={(_date, dateString) => {
                  setQuery((c) => ({
                    ...c,
                    createdAt: dateString
                      ? new Date(dateString as string)
                      : undefined,
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
          <LoaderWraperComp isError={isError} error={error}>
            <div className="w-full overflow-x-auto">
              <Table
                loading={isLoading}
                columns={columns}
                dataSource={data?.users}
                pagination={false}
                rowKey={"_id"}
              />
            </div>
          </LoaderWraperComp>
          <CPagination
            setQuery={setQuery}
            query={query}
            totalData={data?.meta?.totalResults}
          />
        </>
      ) : (
        <LoaderWraperComp
          isLoading={subcriptionLoading}
          isError={subscriptionIsError}
          error={subscriptionError}
          className="w-full bg-white rounded-2xl overflow-hidden"
        >
          <h2 className="text-center py-5 border-b border-gray-200 text-xl font-medium text-gray-700 tracking-wide">
            Subscription Details
          </h2>
          <div className="p-8 bg-gray-50 min-h-[60vh]">
            <div className="flex flex-col gap-2 min-w-max pt-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Active Subscription :</span>{" "}
                <span>
                  {new Date(
                    subcriptionData?.subscription?.startDate,
                  ).toLocaleString()}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">End Subscription :</span>{" "}
                <span>
                  {new Date(
                    subcriptionData?.subscription?.endDate,
                  ).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-3 py-8">
              <p className="text-sm text-gray-600 font-medium">
                {subcriptionData?.plan?.name}
              </p>
              <div className="w-64 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                {/* Top section */}
                <div className="flex flex-col items-center py-6 px-4 gap-1">
                  <p className="text-sm font-semibold text-teal-500">
                    Save up to {subcriptionData?.plan?.discount}%
                  </p>
                  <p className="text-5xl font-light text-gray-800 leading-tight mt-1">
                    {subcriptionData?.plan?.duration / 30}
                  </p>
                  <p className="text-sm text-gray-500">{subscription.label}</p>
                  <p className="text-2xl font-semibold text-teal-500 mt-3 tracking-wide">
                    $ {subcriptionData?.plan?.price}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* Bottom section */}
                <div className="flex flex-col items-center py-4 px-4">
                  <p className="text-lg font-semibold text-gray-800">
                    ${subcriptionData?.plan?.yearlyPrice?.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Per Year</p>
                </div>
              </div>
            </div>
          </div>
        </LoaderWraperComp>
      )}
      {/* <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="600px"
      >
        <div className="w-full">
          <PageHeading
            title="User Details"
            hideIcon
            className="justify-center pb-2.5"
          />
          <div className="space-y-3.5 pt-5 pb-3 px-4 divide-y divide-secondery/40">
            <div className="flex justify-between pb-1.5">
              <p>Username : </p>
              <p>{modalData?.name}</p>
            </div>
            <div className="flex justify-between pb-1.5">
              <p>User Email : </p>
              <p>{modalData?.email}</p>
            </div>

            <div className="flex justify-between pb-1.5">
              <p>Account Status : </p>
              <p>{modalData?.status}</p>
            </div>
            <div className="flex justify-between pb-1.5">
              <p>User Type :</p>
              <p>{modalData?.role?.[0]}</p>
            </div>
            <div className="flex justify-between pb-1.5">
              <p>Adjustment Date : </p>
              <p>{new Date(modalData?.createdAt).toLocaleString()}</p>
            </div>
            <div className="w-full flex justify-center pt-3">
              <Button
                onClick={() => setIsModalOpen(false)}
                type="primary"
                shape="round"
                htmlType="submit"
                className="px-8!"
              >
                Okay
              </Button>
            </div>
          </div>
        </div>
      </DashboardModal> */}
    </div>
  );
};

export default CompanyDetails;
