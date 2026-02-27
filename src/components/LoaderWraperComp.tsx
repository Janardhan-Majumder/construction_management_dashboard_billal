import { FiInbox } from "react-icons/fi";
import { Spin } from "antd";
import { cn } from "../utils/cn";

interface ComponentProps {
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  loader?: React.ReactNode;
  dataEmpty?: boolean;
  children?: React.ReactNode;
  error?: any;
}

const LoaderWraperComp = ({
  isLoading,
  isError,
  className,
  loader,
  dataEmpty = false,
  children,
  error,
}: ComponentProps) => {
  if (isLoading || isError || dataEmpty) {
    return (
      <div
        className={cn(
          `h-[50vh] w-full flex flex-col justify-center items-center`,
          className
        )}
      >
        {isLoading ? (
          <>
            {loader || (
              // <ColorRing
              // visible={true}
              // height="80"
              // width="80"
              // ariaLabel="color-ring-loading"
              // wrapperStyle={{}}
              // wrapperClass="color-ring-wrapper"
              // colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              // />
              // <FadeLoader
              //   color={"#007BFF"}
              //   loading={true}
              //   // cssOverride={override}
              //   // size={150}
              //   // aria-label="Loading Spinner"
              //   // data-testid="loader"
              // />
                <Spin size="large"/>
            )}
          </>
        ) : isError ? (
          <div className="text-center">
            {(error?.status || error?.statusCode) && (
              <p className="text-3xl">{error.status || error.statusCode}</p>
            )}
            <p className="text-red-400">
              {error?.data?.message ||
                error?.message ||
                error?.error?.slice(10) ||
                "Something went wrong!"}
            </p>
          </div>
        ) : (
          <h1 className="text-green-400 flex flex-col items-center gap-2">
            <FiInbox size={30} />
            <div className="text-green-500">Result Empty!</div>
          </h1>
        )}
      </div>
    );
  }
  return children;
};

export default LoaderWraperComp;
