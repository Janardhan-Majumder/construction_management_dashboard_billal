import { Outlet } from "react-router";

const Auth = () => {
  return (
    <div
      // style={{
      //   background: `linear-gradient(90deg ,rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(${bg})`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
      className="min-h-screen max-w-[1536px] mx-auto w-full flex justify-center items-center px-8 py-4 xl:py-8"
    >
      <Outlet />
    </div>
  );
};

export default Auth;
