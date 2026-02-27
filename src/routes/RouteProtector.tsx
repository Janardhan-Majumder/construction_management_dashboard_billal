import { Navigate, useLocation } from "react-router";
import { Spin } from "antd";
import type { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";

const RouteProtector = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-900">
        <Spin fullscreen />
      </div>
    );
  }
  if (!!user?.role) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/sign-in" />;
};

export default RouteProtector;
