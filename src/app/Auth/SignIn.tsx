import type { FormProps } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { Button, Checkbox, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { usePostLoginMutation } from "../../redux/features/Auth/authApi";
import { setLogin } from "../../redux/features/Auth/authSlice";
import { errorAlert } from "../../lib/helpers/alert";
import { accessToken, refreshToken } from "../../constants";

type FieldType = {
  email: string;
  password: string;
  remember?: boolean;
  // role?: TUserRole;
};

const SignIn = () => {
  const { messageApi } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [mutation, { isLoading }] = usePostLoginMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await mutation({
        email: values.email,
        password: values.password,
      }).unwrap();
      messageApi.open({
        key: "auth",
        type: "success",
        content: "Login successful! Welcome back.",
        duration: 4,
      });
      dispatch(
        setLogin({
          user: response?.user,
          [accessToken]: response?.accessToken,
          [refreshToken]: response?.refreshToken,
          remember: !!values.remember,
        }),
      );
      navigate(location.state ? location.state : "/");
    } catch (error) {
      errorAlert({ error: error });
    }
  };

  return (
    <div className="min-h-full w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-secondery mx-auto w-[92%] lg:p-[15%] lg:pr-[20%] ">
        <img
          src={"/statics/logo.svg"}
          alt=""
          className="drop-shadow-sm"
        />
      </div>
      <div className="">
        {/* order-first lg:order-last */}
        <div className="w-full py-11 sm:px-4 xl:px-11">
          <div className="pb-7.5 space-y-2">
            <h1 className="text-[33px] text-center lg:text-left font-semibold ">
              Login to Account!
            </h1>
            <p className="text-hash text-center lg:text-left lg:text-lg">
              Please enter your email and password to continue.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"
          >
            <Form.Item
              label={<span className="font-medium text-base">Email</span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid email!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input size="large" placeholder="example@gmail.com" />
            </Form.Item>
            <Form.Item
              label={<span className="font-medium text-base">Password</span>}
              className="mt-6"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="text-base text-secondery!">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => navigate("/auth/forgot-password")}
                  type="link"
                  className="text-base font-medium"
                >
                  Forget password?
                </Button>
              </Form.Item>
            </div>
            <div className="w-full flex justify-center ">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                shape="round"
                htmlType="submit"
                className="px-2 w-full max-w-[80%]"
              >
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
