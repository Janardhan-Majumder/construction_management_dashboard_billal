import {
  Button,
  DatePicker,
  Input,
  Popconfirm,
  Table,
  Typography,
  type PopconfirmProps,
  type TableColumnsType,
} from "antd";
import type { TQuery, TUniObject } from "../../types/common.type";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useState } from "react";
import TransactionModal from "./TransactionModal";
import { sweetAlertConfirmation } from "../../lib/helpers/sweetAlertConfirmation";
import { useAppContext } from "../../lib/provider/ContextProvider";
import {
  useGetTransactionQuery,
  useWithdrawRequestConfirmationMutation,
  useWithdrawRequestRejectionMutation,
} from "../../redux/features/transaction/transactionApi";
import LoaderWraperComp from "../LoaderWraperComp";
import PageHeading from "../ui/PageHeading";
import { IoSearchOutline } from "react-icons/io5";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { debounceSearch } from "../../utils/debounce";
import CPagination from "../ui/CPagination";
import { errorAlert } from "../../lib/helpers/alert";
const { Paragraph } = Typography;

const TransactionList = ({
  btnType,
  needSearch,
}: {
  btnType?: "view" | "action";
  needSearch?: boolean;
}) => {
  const { messageApi } = useAppContext();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [reason, setReason] = useState("");
  const [query, setQuery] = useState<TQuery>({
    page: 1,
    limit: 15,
  });
  const [confirmation, {}] = useWithdrawRequestConfirmationMutation();
  const [rejection, {}] = useWithdrawRequestRejectionMutation();
  const { data, isLoading, isError, error } = useGetTransactionQuery(
    queryFormat(query),
  );

  const handleAction = async ({
    id,
    status,
    reason,
    transactionId,
  }: {
    id: string;
    status?: string;
    reason?: string;
    transactionId?: string;
  }) => {
    messageApi.loading({ key: "transaction_action", content: "Processing..." });
    try {
      if (status !== "COMPLETED") {
        await rejection({
          rejectReason: reason,
          requestId: id,
        }).unwrap();
        setReason("");
        messageApi.success({
          key: "transaction_action",
          content: `Successfully ${status === "COMPLETED" ? "Accepted" : "Rejected"} !`,
        });
      } else {
        await confirmation({
          transactionId,
          type: "WITHDRAWAL", //  Expected 'DEPOSIT' | 'WITHDRAWAL' | 'RIDE_FARE' | 'RIDE_TIP' | 'RIDE_CANCELATION'
          userId: id,
          status: "COMPLETED",
        }).unwrap();
      }
    } catch (error) {
      errorAlert({ error });
        messageApi.destroy("transaction_action");
    }
  };
  const confirm = (id: string) => {
    handleAction({ id, status: "REJECTED", reason: reason });
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    setReason("");
    // messageApi.info("Cancelled");
  };

  const columns: TableColumnsType = [
    {
      title: "#Tr.ID",
      dataIndex: "_id",
      // dataIndex: "transactionId",
      render: (text) => (
        <Paragraph copyable={!!text} className="mb-0!">
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Username",
      dataIndex: ["riderId", "name"],
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Email ",
      dataIndex: ["riderId", "email"],
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
      title: "Adjustment",
      dataIndex: "createdAt",
      render: (text: string) => <p>{new Date(text).toLocaleString()}</p>,
    },
    {
      title: "Action",
      render: (record) =>
        btnType === "action" ? (
          <div className="flex justify-center gap-2">
            <Button
              onClick={() =>
                sweetAlertConfirmation({
                  func: () =>
                    handleAction({
                      id: record._id,
                      status: "COMPLETED",
                      transactionId: record.transactionId,
                    }),
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
              onCancel={cancel}
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
            <Button
              onClick={() => showModal(record)}
              size="small"
              type="link"
              shape="circle"
            >
              <AiOutlineInfoCircle size={22} />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => showModal(record)}
            color="danger"
            variant="filled"
          >
            Details
          </Button>
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
  //     amount: 9.99,
  //     currency: "USD",
  //     createdAt: "10-22-2024",
  //     _id: index,
  //   });
  // });
  // console.log(data);
  const showModal = (data: TUniObject) => {
    setModalData(data);
    setIsOpenModal(true);
  };
  return (
    <>
      {needSearch && (
        <div className="flex justify-between gap-2 pb-4">
          <PageHeading title={"Transactions"} hideIcon />
          <div className="flex justify-end gap-3">
            <DatePicker
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
      )}
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
        {needSearch && (
          <CPagination
            setQuery={setQuery}
            query={query}
            totalData={data?.meta?.totalResults}
          />
        )}
        <TransactionModal
          isModalOpen={isOpenModal}
          setIsModalOpen={setIsOpenModal}
          modalData={modalData}
        />
      </div>
    </>
  );
};

export default TransactionList;
