import StatusCart from "../../components/ui/StatusCart";
import { useAdminStatusQuery } from "../../redux/features/others/othersApi";
import { formatTwoDigits } from "../../lib/helpers/getTwoDisit";
import { cn } from "../../utils/cn";
import CPagination from "../../components/ui/CPagination";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import {
  Button,
  ConfigProvider,
  Input,
  Select,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { debounceSearch } from "../../utils/debounce";
import PageHeading from "../../components/ui/PageHeading";
import type { TQuery, TUniObject } from "../../types/common.type";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useGetWithdrawRequestsQuery } from "../../redux/features/transaction/transactionApi";
import { useState } from "react";
import { queryFormat } from "../../lib/helpers/queryFormat";
import TransactionModal from "../../components/earnings/TransactionModal";

const WithdrawReq = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [query, setQuery] = useState<TQuery>({
    page: 1,
    limit: 15,
  });

  const { data: adminStatusData, isLoading: adminStatusLoading } =
    useAdminStatusQuery(undefined);
  const { data, isLoading, isError, error } = useGetWithdrawRequestsQuery(
    queryFormat(query),
  );

  const columns: TableColumnsType = [
    {
      title: "#Tr.ID",
      dataIndex: "_id",
      // dataIndex: "transactionId",
      render: (text) => (
        <Typography.Paragraph copyable={!!text} className="mb-0!">
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Username",
      dataIndex: ["userId", "name"],
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Email ",
      dataIndex: ["userId", "email"],
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value, _record) => (
        <p>
          {value.toFixed(2)}
          <span className="text-slate-600">(USD)</span>
        </p>
      ),
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value, _record) => (
        <p
          className={cn(
            "capitalize font-medium px-2 py-1 rounded-md inline-block text-xs",
            {
              "text-yellow-700 bg-yellow-100": value === "PENDING",
              "text-green-700 bg-green-100": value === "COMPLETED",
              "text-red-700 bg-red-100": value === "REJECTED",
            },
          )}
        >
          {value}
        </p>
      ),
      align: "center",
    },
    {
      title: "Adjustment",
      dataIndex: "createdAt",
      render: (text: string) => <p>{new Date(text).toLocaleString()}</p>,
    },
    {
      title: "Action",
      render: (record) => (
        <Button
          onClick={() => showModal(record)}
          size="small"
          type="link"
          shape="circle"
        >
          <AiOutlineInfoCircle size={22} />
        </Button>
      ),
      align: "center",
    },
  ];

  // console.log(data);

  const statusData = [
    {
      category: "Total Earnings",
      total: `$${formatTwoDigits({ num: adminStatusData?.totalRevenue, allToString: true })}`,
    },
    {
      category: "Withdrawable",
      total: `$${formatTwoDigits({ num: adminStatusData?.totalWithdrawals, allToString: true })}`,
    },
    {
      category: "Total Drivers",
      total: formatTwoDigits({ num: adminStatusData?.totalDrivers }),
    },
  ];
  const showModal = (data: TUniObject) => {
    setModalData(data);
    setIsOpenModal(true);
  };
  return (
    <div>
      <div
        className={cn("col-span-4 grid grid-cols-3 gap-x-5 gap-y-8 mb-4", {
          "opacity-60 animate-pulse": adminStatusLoading,
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
      <div className="flex justify-between gap-2 pb-4">
        <PageHeading title={"Withdraw Requests"} hideIcon />
        <div className="flex justify-end gap-3">
          {/* <DatePicker
            onChange={(_date, dateString) => {
              setQuery((c) => ({
                ...c,
                date: dateString ? new Date(dateString as string) : undefined,
              }));
            }}
            className="rounded-full!"
          /> */}
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  borderRadius: 30,
                },
              },
            }}
          >
            <Select
              allowClear
              defaultValue="PENDING"
              onChange={(value) => {
                setQuery((c) => ({
                  ...c,
                  status: value,
                }));
              }}
              className="w-32 h-10!"
              options={[
                { value: "PENDING", label: "Pending" },
                { value: "COMPLETED", label: "Completed" },
                { value: "REJECTED", label: "Rejected" },
              ]}
              placeholder="Select Status"
            />
          </ConfigProvider>
          <Input
            onChange={(e) =>
              debounceSearch({
                setter: setQuery,
                newValue: e.target.value,
                name: "search",
              })
            }
            allowClear
            placeholder="Search id here.."
            suffix={<IoSearchOutline size={18} />}
            className="rounded-full! xl:w-64!"
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <LoaderWraperComp isError={isError} error={error}>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={data?.data || []}
            pagination={false}
            rowKey={"_id"}
          />
        </LoaderWraperComp>
        <CPagination
          setQuery={setQuery}
          query={query}
          totalData={data?.meta?.totalResults}
        />
        <TransactionModal
          isModalOpen={isOpenModal}
          setIsModalOpen={setIsOpenModal}
          modalData={modalData}
          type="withdraw"
        />
      </div>
    </div>
  );
};

export default WithdrawReq;
