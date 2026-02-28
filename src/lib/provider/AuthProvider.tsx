import { useEffect } from "react";
import { useGetUserByTokenQuery } from "../../redux/features/Auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import type { TCommonProps } from "../../types/common.type";
import { setUser } from "../../redux/features/Auth/authSlice";

const AuthProvider = ({ children }: TCommonProps) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserByTokenQuery(undefined);
  // console.log(data);
  useEffect(() => {
    if (!isLoading) {
      dispatch(
        setUser({
          user: { ...data },
        }),
      );
    }
  }, [data, isLoading]);
  // console.log({ isLoading, data });
  if (isLoading) {
    return (
      <div className="min-h-screen h-full flex flex-col justify-center items-center gap-2">
        <div className=" mx-auto max-w-44 2xl:max-w-52 animate-pulse pl-4 pb-4">
          {/* <img src={"/images/logo.png"} alt="" /> */}
          <p className="text-6xl">Welcome!!</p>
        </div>
        {/* <p className="animate-pulse text-sm md:text-xl uppercase font-medium">
          Welcome
        </p> */}
      </div>
    );
  } else {
    return children;
  }
};

export default AuthProvider;
