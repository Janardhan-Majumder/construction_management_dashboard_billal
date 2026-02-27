import {
  Button,
  Input,
  Popconfirm,
  Typography,
  type PopconfirmProps,
} from "antd";
import type { TUniObject } from "../../types/common.type";
import DashboardModal from "../DashboardModal";
import PageHeading from "../ui/PageHeading";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { useState } from "react";
import {
  useWithdrawRequestConfirmationMutation,
  useWithdrawRequestRejectionMutation,
} from "../../redux/features/transaction/transactionApi";
import { errorAlert } from "../../lib/helpers/alert";
const { Paragraph } = Typography;

type TLeaveModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalData: TUniObject | null | undefined;
  type?: "withdraw";
};

const TransactionModal = ({
  isModalOpen,
  modalData,
  setIsModalOpen,
  type,
}: TLeaveModalProps) => {
  const { messageApi } = useAppContext();
  const [reason, setReason] = useState("");
  const [confirmutation, {}] = useWithdrawRequestConfirmationMutation();
  const [rejection, {}] = useWithdrawRequestRejectionMutation();
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
      } else {
        await confirmutation({
          transactionId,
          type: "WITHDRAWAL", //  Expected 'DEPOSIT' | 'WITHDRAWAL' | 'RIDE_FARE' | 'RIDE_TIP' | 'RIDE_CANCELATION'
          userId: id,
          status: "COMPLETED",
        }).unwrap();
      }
      messageApi.success({
        key: "transaction_action",
        content: `Successfully ${status === "COMPLETED" ? "Accepted" : "Rejected"} !`,
      });
    } catch (error) {
      errorAlert({ error });
      messageApi.destroy("transaction_action");
    }
  };
  const confirm = (id: string) => {
    handleAction({ id, status: "REJECTED", reason: reason });
  };
  const acceptConfirm = (record: TUniObject) => {
    handleAction({
      id: record.userId._id,
      status: "COMPLETED",
      transactionId: reason,
    });
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    setReason("");
    // messageApi.info("Cancelled");
  };
  return (
    <DashboardModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      maxWidth="600px"
    >
      <div className="w-full">
        <PageHeading
          title="Transaction Details"
          hideIcon
          className="justify-center pb-2.5"
        />
        <div className="space-y-3.5 pt-5 pb-3 px-4 divide-y divide-secondery/40">
          <div className="flex justify-between pb-1.5">
            <p>{type !== "withdraw" ? `Transaction ID` : "Request ID"} :</p>
            <Paragraph copyable className="mb-0!">
              {modalData?.transactionId || modalData?._id}
            </Paragraph>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>Username : </p>
            <p>{modalData?.userId?.name}</p>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>User Category : </p>
            <p>{modalData?.userId?.role}</p>
          </div>
          {type === "withdraw" && (
            <>
              <div className="flex justify-between pb-1.5">
                <p>Account Number : </p>
                <p>{modalData?.accountNumber}</p>
              </div>
              <div className="flex justify-between pb-1.5">
                <p>Bank Name : </p>
                <p>{modalData?.bankName}</p>
              </div>
            </>
          )}
          <div className="flex justify-between pb-1.5">
            <p>Amount :</p>
            <p>
              {modalData?.amount} <span className="text-slate-600">(USD)</span>
            </p>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>Status :</p>
            <p>{modalData?.status}</p>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>Adjustment Date : </p>
            <p>{new Date(modalData?.createdAt).toLocaleString()}</p>
          </div>
          <div className="w-full flex justify-center pt-3 gap-3">
            {type === "withdraw" && modalData?.status === "PENDING" ? (
              <>
                <Popconfirm
                  overlayClassName="center-popconfirm-actions"
                  okButtonProps={{ disabled: reason.length < 5 }}
                  placement="bottomRight"
                  title="Transaction ID."
                  description={
                    <div className="space-y-2 pr-3">
                      {/* <p>Write the rejected reason</p> */}
                      <Input
                        placeholder="Enter transaction ID"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        // minLength={5}
                      />
                    </div>
                  }
                  onConfirm={() => acceptConfirm(modalData)}
                  onCancel={cancel}
                  okText="Confirm"
                  cancelText="Cancel"
                >
                  <Button
                    size="middle"
                    type="text"
                    style={{ background: "#00A030", color: "#fff" }}
                    shape="round"
                  >
                    Accept
                  </Button>
                </Popconfirm>
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
                  onConfirm={() => confirm(modalData?._id)}
                  onCancel={cancel}
                  okText="Submit"
                  cancelText="Cancel"
                >
                  <Button
                    size="middle"
                    type="text"
                    style={{ background: "#D92D20", color: "#fff" }}
                    shape="round"
                  >
                    Reject
                  </Button>
                </Popconfirm>
              </>
            ) : (
              <Button
                onClick={() => setIsModalOpen(false)}
                type="primary"
                shape="round"
                htmlType="submit"
                className="px-8!"
              >
                Okay
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardModal>
  );
};

export default TransactionModal;
