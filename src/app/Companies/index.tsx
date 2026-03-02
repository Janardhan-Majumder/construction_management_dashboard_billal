import PageHeading from "../../components/ui/PageHeading";
import {
  Button,
  Dropdown,
  Input,
  Popconfirm,
  Table,
  type TableColumnsType,
} from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { useAppContext } from "../../lib/provider/ContextProvider";
import type { TQuery, TUniObject } from "../../types/common.type";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";
import {
  useGetAllCompaniesQuery,
} from "../../redux/features/Users/usersApi";
import { useState } from "react";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { errorAlert } from "../../lib/helpers/alert";
import { debounceSearch } from "../../utils/debounce";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import CPagination from "../../components/ui/CPagination";
import { formatTwoDigits } from "../../lib/helpers/getTwoDisit";
import { GoOrganization } from "react-icons/go";

const Companies = () => {
  const navigate = useNavigate();
  const { messageApi } = useAppContext();
  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
  });
//   const [suspendUser] = useSuspendUserMutation();

  const { data, isLoading, isError, error } = useGetAllCompaniesQuery(
    queryFormat(query),
  );

  console.log(data);
  const confirm = async (userData: TUniObject) => {
    try {
    //   await suspendUser({
    //     id: userData._id,
    //     status: userData.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
    //   }).unwrap();
      messageApi.success(
        `Successfully ${userData.status === "ACTIVE" ? "Suspended" : "Activated"}!`,
      );
    } catch (error) {
      errorAlert({ error });
    }
  };

  // const handleMenuClick = (exerciseId: string) => (info: any) => {
  //   // if (info.key === "2") {
  //   //   navigate(`edit-exercise/${exerciseId}`);
  //   // }
  //   console.log(exerciseId, info);
  // };
  const columns: TableColumnsType = [
    // {
    //   title: "#ID",
    //   dataIndex: "_id",
    //   render: (text) => (
    //     <Typography.Paragraph copyable className="mb-0!">
    //       {text}
    //     </Typography.Paragraph>
    //   ),
    // },
    {
      title: "Company Name",
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
      title: "Phone No.",
      dataIndex: ["phone"],
      render: (text: string) => <p>{text}</p>,
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
                      navigate(`/companies/${record._id}`);
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
          <GoOrganization className="size-12 text-white" />
        </div>
        <div className="space-y-1">
          <p className="text-2xl xl:text-3xl font-semibold capitalize">
            Total All Companies
          </p>
          <p className="text-2xl">
            {formatTwoDigits({ num: data?.meta?.total })}
          </p>
        </div>
      </div>
      <div className="flex justify-between gap-2 pt-16 pb-4">
        <PageHeading title={`All Companies`} hideIcon className="capitalize" />
        <div className="flex justify-end gap-3">
          {/* <DatePicker.RangePicker
            onChange={(_value, string) =>
              setQuery((c) => ({
                ...c,
                startDate: string[0],
                endDate: string[1],
              }))
            }
            className="w-55 rounded-full!"
          /> */}

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
            dataSource={data?.data}
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

export default Companies;
