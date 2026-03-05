import { Button, Form, Input, type FormProps } from "antd";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { useNavigate } from "react-router";
import { errorAlert } from "../../lib/helpers/alert";
import PageHeading from "../../components/ui/PageHeading";
import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";

type FieldType = {
  email: string;
};

const ForgotPassword = () => {
  const { messageApi } = useAppContext();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await forgotPassword(values).unwrap();
      // console.log(response)
      // Cookies.set("token", response.data.token);
      sessionStorage.setItem("email", values.email);
      messageApi.open({
        key: "auth",
        type: "success",
        content: "OTP sent successfully.",
        duration: 4,
      });
      navigate(`/auth/verify-email`);
    } catch (error) {
      errorAlert({ error });
    }
  };
  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="border-r-0 lg:border-r-2 border-secondery w-[99%] p-[8%] lg:p-[12%] lg:pr-0">
        <img
          src={"/statics/auth/forgot.svg"}
          alt=""
          className="max-w-md w-full"
        />
      </div>
      <div className=" order-first lg:order-last">
        <div className="w-full py-11 sm:px-4 xl:px-11 space-y-8">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth"}
              title={"Forgot Password"}
              // hideIcon={true}
            />
            <p className="drop-shadow text-hash mt-4 text-center lg:text-start">
              Provide your email address to receive a secure verification code
              and proceed with resetting your password.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input valid email!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <div className="w-full flex justify-center pt-3">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                shape="round"
                htmlType="submit"
                className="px-2 w-full max-w-[80%]"
              >
                Get OTP
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;



