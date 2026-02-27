import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import PageHeading from "../ui/PageHeading";
import { MdArrowBackIos } from "react-icons/md";
import {
  useGetUserDetailsQuery,
  useSuspendUserMutation,
} from "../../redux/features/Users/usersApi";
import { useParams } from "react-router";
import LoaderWraperComp from "../LoaderWraperComp";
import { useState } from "react";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { errorAlert } from "../../lib/helpers/alert";

const DriverDetails = () => {
  const { id } = useParams();
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetUserDetailsQuery({ id });
  const { messageApi } = useAppContext();
  const [reason, setReason] = useState("");
  const [suspendUser] = useSuspendUserMutation();

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
  return (
    <div>
      <PageHeading
        title={`User Details`}
        backIcon={MdArrowBackIos}
        className="gap-0"
      />
      <LoaderWraperComp isLoading={isLoading} isError={isError} error={error}>
        <div className="space-y-4 mt-6 max-w-4xl">
          <div className="w-30 h-30 overflow-hidden rounded-xl bg-[#f5f5f5] flex justify-center items-center">
            {userData?.profilePicture ? (
              <Image
                src={userData?.profilePicture}
                alt={userData.name}
                width={120}
                height={120}
                preview={false}
              />
            ) : (
              <Typography.Text type="secondary">No Image</Typography.Text>
            )}
          </div>

          {/* Right Read-only Form */}
          <Form layout="vertical">
            <Row gutter={[16, 0]}>
              <Col xs={24}>
                <Form.Item label="Name">
                  <Input value={userData?.name} readOnly />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Phone">
                  <Input value={userData?.phone || "N/A"} readOnly />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="E-mail">
                  <Input value={userData?.email} readOnly />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Address">
                  <Input value={userData?.address || "N/A"} readOnly />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="NID Number">
                  <Input value={userData?.nid?.number} readOnly />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="NID">
                  <Space size={12} wrap>
                    <Button
                      block
                      style={{ minWidth: 200 }}
                      disabled={!userData?.nid?.frontPicture}
                      onClick={() =>
                        userData?.nid?.frontPicture &&
                        window.open(userData.nid.frontPicture, "_blank")
                      }
                    >
                      Picture Front
                    </Button>
                    <Button
                      block
                      style={{ minWidth: 200 }}
                      disabled={!userData?.nid?.backPicture}
                      onClick={() =>
                        userData?.nid?.backPicture &&
                        window.open(userData.nid.backPicture, "_blank")
                      }
                    >
                      Picture Back
                    </Button>
                  </Space>
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Driving License no">
                  <Input value={userData?.drivingLicense?.number} readOnly />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Driving License">
                  <Space size={12} wrap>
                    <Button
                      block
                      style={{ minWidth: 200 }}
                      disabled={!userData?.drivingLicense?.frontPicture}
                      onClick={() =>
                        userData?.drivingLicense?.frontPicture &&
                        window.open(
                          userData.drivingLicense.frontPicture,
                          "_blank",
                        )
                      }
                    >
                      Picture Front
                    </Button>
                    <Button
                      block
                      style={{ minWidth: 200 }}
                      disabled={!userData?.drivingLicense?.backPicture}
                      onClick={() =>
                        userData?.drivingLicense?.backPicture &&
                        window.open(
                          userData.drivingLicense.backPicture,
                          "_blank",
                        )
                      }
                    >
                      Picture Back
                    </Button>
                  </Space>
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Car name">
                  <Input value={userData?.carInformation?.brand} readOnly />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Model no">
                  <Input value={userData?.carInformation?.model} readOnly />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Number plate no">
                  <Input
                    value={userData?.carInformation?.licensePlate?.number}
                    readOnly
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Car Picture">
                  <Space size={12} wrap>
                    <Button
                      block
                      style={{ minWidth: 220 }}
                      disabled={
                        !userData?.carInformation?.licensePlate?.picture
                      }
                      onClick={() =>
                        userData?.carInformation?.licensePlate?.picture &&
                        window.open(
                          userData.carInformation.licensePlate.picture,
                          "_blank",
                        )
                      }
                    >
                      Car Number Plate Picture
                    </Button>
                    <Button
                      block
                      style={{ minWidth: 220 }}
                      disabled={!userData?.carPictureUrl}
                      onClick={() =>
                        userData?.carPictureUrl &&
                        window.open(userData.carPictureUrl, "_blank")
                      }
                    >
                      Car Picture
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>

            {userData?.status === "PENDING" && (
              <Row justify="space-between" gutter={12}>
                <Col xs={24} sm={12}>
                  <Popconfirm
                    overlayClassName="center-popconfirm-actions"
                    okButtonProps={{ disabled: reason.length < 5 }}
                    placement="bottomRight"
                    title="Enter the reason for rejection (min-5 characters)."
                    description={
                      <div className="space-y-2 pr-3">
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
                    onConfirm={() => confirm(userData?._id)}
                    // onCancel={cancel}
                    okText="Submit"
                    cancelText="Cancel"
                  >
                    <Button
                      danger
                      block
                      size="large"
                      //  onClick={onReject}
                    >
                      Reject
                    </Button>
                  </Popconfirm>
                </Col>
                <Col xs={24} sm={12}>
                  <Button
                    onClick={() =>
                      handleAction({ id: userData._id, status: "ACTIVE" })
                    }
                    type="primary"
                    block
                    size="large"
                  >
                    Accept
                  </Button>
                </Col>
              </Row>
            )}
          </Form>
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default DriverDetails;
