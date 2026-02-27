import { Button, Typography } from "antd";
import type { TUniObject } from "../../types/common.type";
import DashboardModal from "../DashboardModal";
import PageHeading from "../ui/PageHeading";
const { Paragraph } = Typography;

type TLeaveModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalData: TUniObject | null | undefined;
};

const UserDetailsModal = ({
  isModalOpen,
  modalData,
  setIsModalOpen,
}: TLeaveModalProps) => {
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
            <p>Transaction ID : </p>
            <Paragraph copyable className="mb-0!">
              {modalData?.transactionId}
            </Paragraph>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>Username : </p>
            <p>{modalData?.user?.username}</p>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>User Category : </p>
            <p>{modalData?.userCategory}</p>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>Account Number : </p>
            <p>{modalData?.accountNumber}</p>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>Account Holder Name : </p>
            <p>{modalData?.accountHolderName}</p>
          </div>
          <div className="flex justify-between pb-1.5">
            <p>Amount :</p>
            <p>
              {modalData?.amount}{" "}
              <span className="text-slate-600">({modalData?.currency})</span>
            </p>
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
  );
};

export default UserDetailsModal;
