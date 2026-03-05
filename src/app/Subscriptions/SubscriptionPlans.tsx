import { Button, Form, Input, InputNumber, type FormProps } from "antd";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DashboardModal from "../../components/DashboardModal";
import PageHeading from "../../components/ui/PageHeading";
import { IoChevronBack } from "react-icons/io5";
import type { TUniObject } from "../../types/common.type";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { useCreateSubscriptionMutation } from "../../redux/features/subscription/subscriptionApi";
import { errorAlert } from "../../lib/helpers/alert";

const SubscriptionPlans = () => {
  const [form] = Form.useForm();
  const { messageApi } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addMutation, { isLoading: muLoading }] =
    useCreateSubscriptionMutation();

  const onFinish: FormProps<TUniObject>["onFinish"] = async (values) => {
    try {
      await addMutation(values).unwrap();
      setIsModalOpen(false);
      messageApi.open({
        key: "employee",
        type: "success",
        content: "Successfully created!",
        duration: 4,
      });
    } catch (error) {
      errorAlert({ error: error });
    }
    console.log("Success:", values);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <PageHeading backIcon={IoChevronBack} title="Subscription Plans" />
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="bg-brand text-white pb-0.5!"
          shape="round"
          size="large"
        >
          Create Subscription
        </Button>
      </div>

      <div className="bg-white p-6 rounded-md">
        {/* Placeholder for subscription plans list */}
        <p className="text-gray-500">No subscription plans available.</p>
      </div>

      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="600px"
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-6 text-brand text-center">
            Create Subscription Plan
          </h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ features: [""] }}
            requiredMark={false}
          >
            <Form.Item
              name="name"
              label="Plan Name"
              rules={[
                { required: true, message: "Please input the plan name!" },
              ]}
            >
              <Input placeholder="e.g. 12 Month" size="large" />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="duration"
                label="Duration (days)"
                rules={[
                  { required: true, message: "Please input the duration!" },
                ]}
              >
                <InputNumber
                  placeholder="360"
                  size="large"
                  className="w-full!"
                  min={1}
                />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input the price!" }]}
              >
                <InputNumber
                  placeholder="1500"
                  size="large"
                  className="w-full!"
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name="yearlyPrice"
                label="Yearly Price"
                rules={[
                  { required: true, message: "Please input the yearly price!" },
                ]}
              >
                <InputNumber
                  placeholder="1800"
                  size="large"
                  className="w-full!"
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name="discount"
                label="Discount (%)"
                rules={[
                  { required: true, message: "Please input the discount!" },
                ]}
              >
                <InputNumber
                  placeholder="15"
                  size="large"
                  className="w-full!"
                  min={0}
                  max={100}
                />
              </Form.Item>
            </div>
            <div className="mt-4">
              <label className="block mb-2 font-medium">Features</label>
              <Form.List name="features">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="flex items-center gap-2">
                        <Form.Item
                          {...restField}
                          name={[name]}
                          rules={[
                            { required: true, message: "Missing feature" },
                          ]}
                          style={{ width: "100%" }}
                        >
                          <Input
                            placeholder="Write feature"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className="text-red-500 text-lg mb-5.5"
                          />
                        )}
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Feature
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <Button size="large" onClick={() => setIsModalOpen(false)} block>
                Cancel
              </Button>
              <Button
                loading={muLoading}
                type="primary"
                htmlType="submit"
                size="large"
                className="bg-brand"
                block
              >
                Create Plan
              </Button>
            </div>
          </Form>
        </div>
      </DashboardModal>
    </div>
  );
};

export default SubscriptionPlans;
