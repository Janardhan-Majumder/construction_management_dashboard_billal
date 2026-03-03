import DashboardModal from "../DashboardModal";
import type { TUniObject } from "../../types/common.type";
import { Button, Form, Input, InputNumber, Select, type FormProps } from "antd";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { errorAlert } from "../../lib/helpers/alert";
import { useAddEmployeeMutation } from "../../redux/features/Users/usersApi";
import { useEffect } from "react";

const EmployeeModal = ({
  isModalOpen,
  modalData,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalData: TUniObject | null | undefined;
}) => {
  const [form] = Form.useForm();
  const { messageApi } = useAppContext();
  const [addMutation, { isLoading }] = useAddEmployeeMutation();
  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    try {
      await addMutation(values).unwrap();
      setIsModalOpen(false);
      messageApi.open({
        key: "employee",
        type: "success",
        content: "Successfully added!",
        duration: 4,
      });
    } catch (error) {
      errorAlert({ error: error });
    }
  };
  useEffect(() => form.resetFields(), [isModalOpen]);
  return (
    <DashboardModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      maxWidth="600px"
      onClose={() => setIsModalOpen(false)}
    >
      <h1 className="text-2xl text-center">
        {modalData?.type === "create" ? "Add Employee" : "Employee Details"}
      </h1>
      <div className="w-full mt-2">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            employmentType: "Full-time",
            role: "worker",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Phone number is required" },
              //   {
              //     pattern: /^01[3-9]\d{8}$/,
              //     message: "Enter valid BD phone number",
              //   },
            ]}
          >
            <Input placeholder="01XXXXXXXXX" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select
              placeholder="Select role"
              options={[
                { label: "Admin", value: "admin" },
                { label: "Office Admin", value: "office_admin" },
                { label: "Worker", value: "worker" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Experience (Years)"
            name="experience"
            rules={[{ required: true, message: "Experience is required" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Expertise Area"
            name="expertiseArea"
            rules={[{ required: true, message: "Expertise area is required" }]}
          >
            <Input placeholder="e.g., React, Backend, UI/UX" />
          </Form.Item>
          <Form.Item
            label="Employment Type"
            name="employmentType"
            rules={[{ required: true, message: "Employment type is required" }]}
          >
            <Select
              placeholder="Select employment type"
              options={[
                { label: "Full-time", value: "Full-time" },
                { label: "Part-time", value: "Part-time" },
                { label: "Contract", value: "Contract" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </DashboardModal>
  );
};

export default EmployeeModal;
