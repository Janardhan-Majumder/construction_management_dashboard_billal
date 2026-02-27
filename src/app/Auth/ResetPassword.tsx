import { Button, Form, Input, type FormProps } from "antd";

import PageHeading from "../../components/ui/PageHeading";
import { useNavigate } from "react-router";
import { errorAlert, successAlert } from "../../lib/helpers/alert";
import { useResetPasswordMutation } from "../../redux/features/Auth/authApi";

type FieldType = {
  newPassword: string;
  confirmPassword?: string;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [mutation, { isLoading }] = useResetPasswordMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await mutation(values).unwrap();
      // Cookies.remove("token");
      console.log(values);
      successAlert({
        message: "Your password has been successfully reset. You may now log in using your new password.",
        confirmButton: true,
      });
      navigate("/auth");
    } catch (error) {
      errorAlert({ error: error });
    }
  };
  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-secondery mx-auto w-[96%] lg:p-[10%] ">
        <img src={"/statics/auth/reset-pass.svg"} alt="" />
      </div>
      <div className="order-first lg:order-last">
        <div className="w-full py-11 sm:px-4 xl:px-11 space-y-8">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth"}
              title={"Set new password"}
              // hideIcon={true}
            />
            <p className=" drop-shadow text-[#464343] mt-5">
              Your password must be 8-10 character long.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              label={
                <span className="font-medium text-base">New Password</span>
              }
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input new password!",
                },
                {
                  min: 8,
                  message: "Must be at least 8 characters!",
                },
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-medium text-base">
                  Confirm New Password
                </span>
              }
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please Re-Enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!",
                      ),
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <div className="w-full flex justify-center pt-4 ">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                shape="round"
                htmlType="submit"
                className="px-2 w-full max-w-[80%]"
              >
                Reset Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
