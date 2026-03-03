import PageHeading from "../../components/ui/PageHeading";
import {
  Button,
  Dropdown,
  Image,
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
import { useGetAllEmployeesQuery } from "../../redux/features/Users/usersApi";
import { useState } from "react";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { errorAlert } from "../../lib/helpers/alert";
import { debounceSearch } from "../../utils/debounce";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import CPagination from "../../components/ui/CPagination";
import { formatTwoDigits } from "../../lib/helpers/getTwoDisit";
import { GoOrganization } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import EmployeeModal from "../../components/dashboard/EmployeeModal";

const Employees = () => {
  const navigate = useNavigate();
  const { messageApi } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<TUniObject | null>(null);
  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
  });

  //   const [suspendUser] = useSuspendUserMutation();

  const { data, isLoading, isError, error } = useGetAllEmployeesQuery(
    queryFormat(query),
  );

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
      title: "Userame",
      dataIndex: ["name"],
      render: (text: string, record: TUniObject) => (
        <div className="flex gap-3 items-center">
          <Image src={record.profileImage} className="size-10! rounded-full" />
          <p>
            {text}
            <br />
            <span className="text-xs">{record.email}</span>
          </p>
        </div>
      ),
    },
    {
      title: "Phone No.",
      dataIndex: ["phoneNumber"],
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (value) => <p>{value || "N/A"}</p>,
      // align: "center",
    },
    {
      title: "Role",
      dataIndex: ["role"],
      render: (text: string, record: TUniObject) => (
        <div className="">
          <p className="capitalize">{text.split("_").join(" ")}</p>
          <span className="text-xs text-gray-500">{record.expertiseArea}</span>
        </div>
      ),
    },
    {
      title: "Experience",
      dataIndex: "experience",
      render: (value) => <p>{value ? value + " Years" : "N/A"}</p>,
    },
    {
      title: "Status",
      dataIndex: ["isActive"],
      render: (text: string) => <p>{text ? "Active" : "Inactive"}</p>,
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
                label: <span onClick={() => {}}>Details</span>,
              },
              {
                key: "3",
                label: (
                  <Popconfirm
                    title={`Delete`}
                    description={`Are you sure you want to delete this user?`}
                    onConfirm={() => confirm(record)}
                    onCancel={() => messageApi.error("Cancelled")}
                    okText="Delete"
                    cancelText="Cancel"
                    placement="bottomRight"
                    arrow={false}
                  >
                    <span>Delete</span>
                  </Popconfirm>
                ),
                danger: true,
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
  return (
    <div>
      <div className="flex gap-4 drop-shadow-xs border border-gray-100 bg-white rounded-lg p-4 2xl:p-6">
        <div className="p-3 bg-secondery/80 rounded-lg">
          <GoOrganization className="size-12 text-white" />
        </div>
        <div className="space-y-1">
          <p className="text-2xl xl:text-3xl font-semibold capitalize">
            Total all Employees
          </p>
          <p className="text-2xl">
            {formatTwoDigits({ num: data?.meta?.total })}
          </p>
        </div>
      </div>
      <div className="flex justify-between gap-2 pt-8 pb-4">
        <PageHeading title={`All Employees`} hideIcon className="capitalize" />
        <div className="flex justify-end gap-3">
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
          <Button
            onClick={() => {
              setOpenModal(true);
              setModalData({ type: "create" });
            }}
            className="h-10! pb-0.5!"
            shape="round"
            variant="outlined"
            color="primary"
          >
            Add Employee
            <IoIosAddCircle className="size-4 mt-1" />
          </Button>
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
      <EmployeeModal
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        modalData={modalData}
      />
    </div>
  );
};

export default Employees;
