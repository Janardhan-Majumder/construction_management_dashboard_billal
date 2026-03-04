import { useParams } from "react-router";
import PageHeading from "../../components/ui/PageHeading";
import { IoChevronBack, IoSearchOutline } from "react-icons/io5";
import React, { useState } from "react";
import CPagination from "../../components/ui/CPagination";
import { Button, DatePicker, Input, Table, type TableColumnsType } from "antd";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import { debounceSearch } from "../../utils/debounce";
import type { TQuery, TUniObject } from "../../types/common.type";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { BsInfoLg, BsTelephone } from "react-icons/bs";
import { useGetAssinedUserDetailsQuery } from "../../redux/features/tasks/tasksApi";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { PiBriefcaseThin } from "react-icons/pi";
import { handleImageError } from "../../lib/handleImageError";

const AssignedDetails = () => {
  const { id } = useParams();

  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
  });
  const { data, isLoading, isError, error } = useGetAssinedUserDetailsQuery({
    id: id!,
    args: queryFormat(query),
  });
  const columns: TableColumnsType = [
    {
      title: "Site Name",
      dataIndex: "title",
      render: (value) => <p>{value ? value : "N/A"}</p>,
    },

    {
      title: "Site Location",
      dataIndex: ["siteId", "location", "address"],
      render: (value) => <p>{value || "N/A"}</p>,
      // align: "center",
    },
    {
      title: "Start Date",
      dataIndex: ["createdAt"],
      render: (text: string) => <p>{new Date(text).toLocaleString()}</p>,
    },
    {
      title: "End Date",
      dataIndex: ["dueDate"],
      render: (text: string) => <p>{new Date(text).toLocaleString()}</p>,
    },
    {
      title: "Last Update",
      dataIndex: ["updatedAt"],
      render: (text: string) => <p>{new Date(text).toLocaleString()}</p>,
    },
    {
      title: "Status",
      dataIndex: ["status"],
      render: (text: string) => <p>{text}</p>,
      align: "center"
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 my-4">
        <img
          src={data?.user?.profileImage}
          alt={"profile"}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200"
          onError={handleImageError}
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {data?.user?.name}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-gray-500 capitalize">
              {data?.user?.role?.split("_").join(" ")}
            </span>
            {data?.user?.expertiseArea && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                <span className="text-xs text-gray-500">
                  {data?.user?.expertiseArea}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <DetailItem
          icon={<CiMail className="size-5" />}
          iconBg="bg-blue-50"
          label="Email Address"
          value={data?.user?.email || "N/A"}
        />
        <DetailItem
          icon={<BsTelephone className="size-5" />}
          iconBg="bg-purple-50"
          label="Mobile Number"
          value={data?.user?.phoneNumber || "N/A"}
        />
        <DetailItem
          icon={<CiLocationOn className="size-5" />}
          iconBg="bg-orange-50"
          label="Address"
          value={data?.user?.address || "N/A"}
        />
        <DetailItem
          icon={<PiBriefcaseThin className="size-5" />}
          iconBg="bg-green-50"
          label="Experience"
          value={
            data?.user?.experience ? data?.user?.experience + " years" : "N/A"
          }
        />
      </div>
      <div className="flex justify-between gap-2 pt-8 pb-4">
        <PageHeading
          title={`All Assigned task List`}
          backIcon={IoChevronBack}
          className="capitalize gap-0"
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
            dataSource={data?.result}
            pagination={false}
            rowKey={"_id"}
          />
        </div>
      </LoaderWraperComp>
      <CPagination
        setQuery={setQuery}
        query={query}
        totalData={data?.meta?.total}
      />
    </div>
  );
};

export default AssignedDetails;

const DetailItem: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
}> = ({ icon, iconBg, label, value }) => (
  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
    <div
      className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-700 truncate">{value}</p>
    </div>
  </div>
);
