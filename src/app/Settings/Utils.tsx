import { Button } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { ROLE, type TUniObject } from "../../types/common.type";
import PageHeading from "../../components/ui/PageHeading";
import { utilityHeading } from "../../constants";
import { useGetSettingQuery } from "../../redux/features/settings/settingApi";
import LoaderWraperComp from "../../components/LoaderWraperComp";

const Utils = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const pathName = location.pathname.split("/")[2];
  const { data, isLoading, isError } = useGetSettingQuery(`${pathName}`);

  return (
    <div className="min-h-[85vh] flex flex-col justify-between rounded-xl border border-secondery/50 py-4 shadow-sm">
      <div className="space-y-4 ">
        <PageHeading
          title={`${(utilityHeading as TUniObject)[pathName]}`}
          className="border-b border-secondery/50 px-4 pb-4"
        />
        <LoaderWraperComp
          isLoading={isLoading}
          isError={isError}
          className={"min-h-[50vh]"}
        >
          <div className="px-4">
            <div
              className="no-tailwind"
              dangerouslySetInnerHTML={{
                __html: data?.data?.description || "",
              }}
              // style={{
              //   background: "white",
              //   minHeight: "50vh",
              //   padding: "20px",
              //   borderRadius: 5,
              // }}
            ></div>
          </div>
        </LoaderWraperComp>
      </div>
      {user?.role === ROLE.ADMIN && (
        <div className="flex justify-end pt-10 px-4">
          <Button
            onClick={() => navigate("edit")}
            type="primary"
            htmlType="submit"
            className="w-100 h-14  placeholder:text-[#999999] text-[18px] font-medium"
          >
            {"Edit"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Utils;
