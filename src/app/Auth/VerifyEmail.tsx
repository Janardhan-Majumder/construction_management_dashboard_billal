import { Button } from "antd";
import Form from "antd/es/form/Form";
import OTPInput from "react-otp-input";
import { useEffect, useState } from "react";
import PageHeading from "../../components/ui/PageHeading";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { useNavigate } from "react-router";
import { errorAlert, successAlert } from "../../lib/helpers/alert";
import {
  useResendOTPMutation,
  useVerifyEmailMutation,
} from "../../redux/features/Auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setToken } from "../../redux/features/Auth/authSlice";
import { accessToken } from "../../constants";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { messageApi } = useAppContext();
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const [forgetEmail, setForgetEmail] = useState<string | undefined>(undefined);
  const [mutation, { isLoading }] = useVerifyEmailMutation();
  const [resendMutation, { isLoading: resendLoading }] = useResendOTPMutation();

  const onFinish = async () => {
    try {
      if (otp.length < 6) {
        throw new Error("Please enter 6 digits OTP number!!");
      }
      const response = await mutation({
        otp: otp,
        email: forgetEmail!,
        type: "PASSWORD_RESET",
      }).unwrap();
      dispatch(
        setToken({
          [accessToken]: response?.data?.accessToken,
        }),
      );
      messageApi.open({
        key: "auth",
        type: "success",
        content: "OTP verified. You can now reset your password.",
        duration: 4,
      });
      navigate(`/auth/reset-password`);
    } catch (error) {
      errorAlert({ error: error });
    }
  };
  const handleResend = async () => {
    try {
      await resendMutation({
        email: forgetEmail!,
        type: "EMAIL_VERIFICATION",
      }).unwrap();
      // Cookies.set("token", response.data.token);
      successAlert({
        message: `An OTP has been sent to ${forgetEmail}. Please check your inbox to proceed.`,
        confirmButton: true,
      });
    } catch (error) {
      errorAlert({ error: error });
    }
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setForgetEmail(email);
    } else {
      navigate("/auth/forgot-password");
    }
  }, []);

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-secondery mx-auto w-[90%] lg:p-[8%]">
        <img
          src={"/statics/auth/verify.svg"}
          alt=""
          className="max-w-md w-full"
        />
      </div>
      <div className="order-first lg:order-last">
        <div className="w-full py-11 sm:px-4 xl:px-11 space-y-5">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth/forgot-password"}
              title={"Verify Email"}
              // hideIcon={true}
            />
            <p className=" drop-shadow text-hash mt-5 text-center lg:text-left">
              Please check your email. We have sent a code to {forgetEmail}
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
            <div className="py-3 font-medium flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    className="border border-primary outline-none rounded-xl w-full h-12.5 min-w-10 mx-1.25 text-base md:h-15 md:min-w-12.5 md:mx-2 lg:h-17.5 md:text-lg xl:min-w-17.5 xl:mx-2.5 xl:text-2xl focus:ring-2 ring-primary/20"
                  />
                )}
              />
            </div>
            <div className="w-full flex justify-center lg:justify-start items-center">
              <p>Didn’t receive code?</p>
              <Button
                onClick={handleResend}
                loading={resendLoading}
                size="small"
                htmlType="button"
                type="link"
                className="underline"
              >
                Resend
              </Button>
            </div>
            <div className="w-full flex justify-center pt-5">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                shape="round"
                htmlType="submit"
                className="px-2 w-full max-w-[80%]"
              >
                Verify Email
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
