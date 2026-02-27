import PageHeading from "../../components/ui/PageHeading";
import {
  Button,
  DatePicker,
  Input,
  Popconfirm,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { useState } from "react";
import type { TQuery, TUniObject } from "../../types/common.type";
import { sweetAlertConfirmation } from "../../lib/helpers/sweetAlertConfirmation";
import { Link } from "react-router";
import {
  useGetAllUserQuery,
  useSuspendUserMutation,
} from "../../redux/features/Users/usersApi";
import { queryFormat } from "../../lib/helpers/queryFormat";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import CPagination from "../../components/ui/CPagination";
import { debounceSearch } from "../../utils/debounce";
import { errorAlert } from "../../lib/helpers/alert";

const RequestedLilst = () => {
  const { messageApi } = useAppContext();
  const [reason, setReason] = useState("");
  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
    status: "PENDING",
    role: "DRIVER",
  });
  const [suspendUser] = useSuspendUserMutation();
  const { data, isLoading, isError, error } = useGetAllUserQuery(
    queryFormat(query),
  );
  // const pathname = location.pathname.split("/")[2];
  const handleAction = async ({
    id,
    status,
    reason,
  }: {
    id: string;
    status: "ACTIVE" | "SUSPENDED" | "REJECTED";
    reason?: string;
  }) => {
    messageApi.loading({ key: "user_action", content: "Processing..." });
    try {
      await suspendUser({
        id: id,
        status: status,
        reason,
      }).unwrap();
      setReason("");
      messageApi.success({
        key: "user_action",
        content: `Successfully ${status === "ACTIVE" ? "Accepted" : "Rejected"} !`,
      });
    } catch (error) {
      errorAlert({ error });
      messageApi.destroy("user_action");
    }
  };
  const confirm = (id: string) => {
    handleAction({ id, status: "REJECTED", reason: reason });
  };

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
      title: "Req.Date",
      dataIndex: "createdAt",
      render: (text: string) => <p>{new Date(text).toLocaleDateString()}</p>,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => <p>{text}</p>,
      align: "center",
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex justify-center gap-2">
          <Button
            onClick={() =>
              sweetAlertConfirmation({
                func: () => handleAction({ id: record._id, status: "ACTIVE" }),
                // handleAction({ id: record._id, status: "accepted" }),
                object: "accept the withdraw request",
                okay: "Accept",
                title: "Confirmation!!",
                conBtnColor: "#00A030",
              })
            }
            size="small"
            type="text"
            style={{ background: "#00A030", color: "#fff" }}
            shape="round"
          >
            Accept
          </Button>
          <Popconfirm
            overlayClassName="center-popconfirm-actions"
            okButtonProps={{ disabled: reason.length < 5 }}
            placement="bottomRight"
            title="Enter the reason for rejection (min-5 characters)."
            description={
              <div className="space-y-2 pr-3">
                {/* <p>Write the rejected reason</p> */}
                <Input.TextArea
                  rows={3}
                  placeholder="Enter reason (optional)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  // minLength={5}
                  showCount
                  maxLength={30}
                />
              </div>
            }
            onConfirm={() => confirm(record._id)}
            // onCancel={cancel}
            okText="Submit"
            cancelText="Cancel"
          >
            <Button
              size="small"
              type="text"
              style={{ background: "#D92D20", color: "#fff" }}
              shape="round"
            >
              Reject
            </Button>
          </Popconfirm>
        </div>
      ),
      align: "center",
    },
    {
      title: "Details",
      render: (record) => (
        <Link to={`${record._id}`}>
          <Button color="danger" variant="filled">
            Details
          </Button>
        </Link>
      ),
      align: "center",
    },
  ];
  // console.log(data);
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
      <div className="flex justify-between gap-2 pb-4">
        <PageHeading title={`Requested Driver list`} hideIcon />
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
          <Input
            onChange={(e) =>
              debounceSearch({
                setter: setQuery,
                newValue: e.target.value,
                name: "search",
              })
            }
            allowClear
            placeholder="Search here.."
            suffix={<IoSearchOutline size={18} />}
            className="rounded-full! xl:w-64!"
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
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
      </div>
    </div>
  );
};

export default RequestedLilst;
