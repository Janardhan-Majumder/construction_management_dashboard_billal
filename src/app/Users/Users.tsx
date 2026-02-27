import PageHeading from "../../components/ui/PageHeading";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Popconfirm,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";
import { FaUserFriends } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useAppContext } from "../../lib/provider/ContextProvider";
import type { TQuery, TUniObject } from "../../types/common.type";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";
import {
  useGetAllUserQuery,
  useSuspendUserMutation,
} from "../../redux/features/Users/usersApi";
import { useEffect, useState } from "react";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { errorAlert } from "../../lib/helpers/alert";
import { debounceSearch } from "../../utils/debounce";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import CPagination from "../../components/ui/CPagination";
import DashboardModal from "../../components/DashboardModal";

const Users = ({ viewType }: { viewType: "driver" | "rider" }) => {
  const navigate = useNavigate();
  const { messageApi } = useAppContext();
  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
    role: viewType.toUpperCase(),
    exclude: "PENDING",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<TUniObject | null>(null);
  const [suspendUser] = useSuspendUserMutation();

  const { data, isLoading, isError, error } = useGetAllUserQuery(
    queryFormat(query),
  );
  // const [isOpenModal, setIsOpenModal] = useState(false);
  // const [modalData, setModalData] = useState({});
  // const pathname = location.pathname.split("/")[2];
  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      role: viewType.toUpperCase(),
    }));
  }, [viewType]);
  const confirm = async (userData: TUniObject) => {
    try {
      await suspendUser({
        id: userData._id,
        status: userData.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
      }).unwrap();
      messageApi.success(
        `Successfully ${userData.status === "ACTIVE" ? "Suspended" : "Activated"}!`,
      );
    } catch (error) {
      errorAlert({ error });
    }
  };
  console.log(modalData);

  // const handleMenuClick = (exerciseId: string) => (info: any) => {
  //   // if (info.key === "2") {
  //   //   navigate(`edit-exercise/${exerciseId}`);
  //   // }
  //   console.log(exerciseId, info);
  // };
  const columns: TableColumnsType = [
    {
      title: "#ID",
      dataIndex: "_id",
      render: (text) => (
        <Typography.Paragraph copyable className="mb-0!">
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Username",
      dataIndex: ["name"],
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Email ",
      dataIndex: ["email"],
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
      title: "Adjustment Date",
      dataIndex: "createdAt",
      render: (text: string) => <p>{new Date(text).toLocaleString()}</p>,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string, _record, _index: number) => <p>{text}</p>,
      align: "center",
    },
    {
      title: "Action",
      render: (record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <span
                    onClick={() => {
                      if (record.role[0] === "DRIVER") {
                        navigate(`/users/driver/${record._id}`);
                      } else {
                        setIsModalOpen(true);
                        setModalData(record);
                      }
                    }}
                  >
                    View Details
                  </span>
                ),
              },
              {
                key: "2",
                label: (
                  <Popconfirm
                    title={`${record.status === "ACTIVE" ? "Suspend" : "Unsuspend"} ${record.name}`}
                    description={`Are you sure you want to ${record.status === "ACTIVE" ? "suspend" : "activate"} this user?`}
                    onConfirm={() => confirm(record)}
                    onCancel={() => messageApi.error("Cancelled")}
                    okText="Yes"
                    cancelText="No"
                    placement="bottomRight"
                    arrow={false}
                  >
                    <span>
                      {record.status === "ACTIVE" ? "Suspend" : "Unsuspend"}
                    </span>
                  </Popconfirm>
                ),
              },
            ],
            // onClick: handleMenuClick(record._id),
          }}
          placement="bottomRight"
          // className="!absolute top-[4%] right-[3%]"
        >
          <Button
            shape="circle"
            size="small"
            style={{ background: "none" }}
            icon={<HiDotsVertical size={14} className="mt-0.75" />}
          />
        </Dropdown>
      ),
      align: "center",
    },
  ];
  // const tempData: TUniObject[] = [];
  // Array.from({ length: 10 }).forEach((_, index) => {
  //   tempData.push({
  //     transactionId: "#12345678",
  //     user: { username: "Mr Victor", email: "user@gmail.com" },
  //     userCategory: "Client",
  //     accountNumber: "**** **** **** *545",
  //     accountHolderName: "Victor",
  //     address: "321/2A city house, District,country",
  //     currency: "USD",
  //     createdAt: "10-22-2024",
  //     _id: index,
  //   });
  // });
  return (
    <div>
      <div className="flex gap-4 drop-shadow-xs border border-gray-100 bg-white rounded-lg p-4 2xl:p-6">
        <div className="p-3 bg-secondery/80 rounded-lg">
          <FaUserFriends className="size-12 text-white" />
        </div>
        <div className="space-y-1">
          <p className="text-2xl xl:text-3xl font-semibold capitalize">
            Total {viewType}s
          </p>
          <p className="text-2xl">120</p>
        </div>
      </div>
      <div className="flex justify-between gap-2 pt-16 pb-4">
        <PageHeading
          title={`All ${viewType} List`}
          hideIcon
          className="capitalize"
        />
        <div className="flex justify-end gap-3">
          <DatePicker.RangePicker
            // onFocus={(_, info) => {
            //   console.log("Focus:", info.range);
            // }}
            onChange={(_value, string) =>
              setQuery((c) => ({
                ...c,
                startDate: string[0],
                endDate: string[1],
              }))
            }
            className="w-55 rounded-full!"
          />
          {/* <DatePicker
            // allowClear
            onChange={(_date, dateString) => {
              setQuery((c) => ({
                ...c,
                date: dateString ? new Date(dateString as string) : undefined,
              }));
            }}
            className="rounded-full!"
          /> */}
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
      <LoaderWraperComp isError={isError} error={error}>
        <div className="w-full overflow-x-auto">
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={data?.data?.users}
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
      <DashboardModal
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
      </DashboardModal>
    </div>
  );
};

export default Users;
