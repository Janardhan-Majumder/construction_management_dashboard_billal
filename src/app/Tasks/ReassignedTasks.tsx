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
import { useState } from "react";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { errorAlert } from "../../lib/helpers/alert";
import { debounceSearch } from "../../utils/debounce";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import CPagination from "../../components/ui/CPagination";
import { useGetAssinedSitesQuery } from "../../redux/features/tasks/tasksApi";
import { useNavigate } from "react-router";

const ReassignedTasks = () => {
  const navigate = useNavigate();
  const { messageApi } = useAppContext();
  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
  });

  //   const [suspendUser] = useSuspendUserMutation();

  const { data, isLoading, isError, error } = useGetAssinedSitesQuery(
    queryFormat(query),
  );

  const confirm = async (userData: TUniObject) => {
    try {
      //   await suspendUser({
      //     id: userData._id,
      //     status: userData.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
      //   }).unwrap();
      console.log(userData);
      messageApi.success(`Successfully Deleted!`);
    } catch (error) {
      errorAlert({ error });
    }
  };

  const columns: TableColumnsType = [
    {
      title: "Employee",
      dataIndex: ["assignedUser", "name"],
      render: (text: string, record: TUniObject) => (
        <div className="flex gap-3 items-center">
          <Image
            src={record?.assignedUser?.profileImage}
            className="size-10! rounded-full"
          />
          <p>
            {text}
            <br />
            <span className="text-xs">{record?.assignedUser?.email}</span>
          </p>
        </div>
      ),
    },
    {
      title: "Assigned User Role",
      render: (record: TUniObject) => (
        <div className="">
          <p className="capitalize">
            {record?.assignedUser?.role?.split("_").join(" ")}
          </p>
        </div>
      ),
      align: "center",
    },
    {
      title: "Site Name",
      dataIndex: "siteTitle",
      render: (value) => <p>{value ? value : "N/A"}</p>,
    },
    {
      title: "Site Location",
      dataIndex: ["location", "address"],
      render: (value) => <p>{value || "N/A"}</p>,
      // align: "center",
    },
    {
      title: "Last Update",
      dataIndex: ["updatedAt"],
      render: (text: string) => <p>{new Date(text).toLocaleString()}</p>,
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
                    onClick={() =>
                      navigate(
                        `/assigned-task/${record._id}_${record?.assignedUser?._id}`,
                      )
                    }
                  >
                    Details
                  </span>
                ),
              },
              {
                key: "2",
                label: <span onClick={() => {}}>Update</span>,
              },
              {
                key: "3",
                label: (
                  <Popconfirm
                    title={`Delete`}
                    description={`Are you sure you want to delete this site?`}
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
      <div className="flex justify-between gap-2 pt-8 pb-4">
        <PageHeading
          title={`Reassigned sites`}
          hideIcon
          className="capitalize"
        />
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

export default ReassignedTasks;
