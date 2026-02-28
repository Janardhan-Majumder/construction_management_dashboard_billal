import { useEffect, useRef, useState } from "react";
import { Badge, Button } from "antd";
import { useLocation, useNavigate } from "react-router";
import { IoNotificationsOutline } from "react-icons/io5";
import { cn } from "../../utils/cn";
import { handleImageError } from "../../lib/handleImageError";
import { useAppSelector } from "../../redux/hooks";

// const socket = io(`${import.meta.env.VITE_IMAGE_URL}`);

const Header = ({ className }: { className: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  // const { total, notification } = useSelector((state) => state.notification);
  // const { data } = useAdminNotificationBadgeQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  // });
  useEffect(() => {
    // notification popup
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !(notificationRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setNotificationPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setNotificationPopup(false);
  }, [location.pathname]);
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full flex justify-between items-center px-4 relative max-w-[1920px] mx-auto bg-[#FEFEFE] shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <div className="h-20 py-3">
            <img
              src={user?.profileImage!}
              alt="image"
              onError={handleImageError}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="hidden sm:flex flex-col gap-0.5">
            <span className="text-lg text-gray-500">{getGreeting()}</span>
            <span className="text-sm font-semibold text-gray-800">
              {" Here’s your dashboard overview"}
            </span>
          </div>
        </div>
        <div className="flex gap-x-6 items-center">
          <button
            // onBlur={() => setNotificationPopup(false)}
            onClick={() => setNotificationPopup(true)}
            // onMouseEnter={() => setNotificationPopup(true)}
            className="relative flex items-center "
          >
            <Badge
              style={{ backgroundColor: " #FFD700", color: "black" }}
              // data?.data?.unreadCount || 0 + notificationCount
              count={0}
              // count={data?.data?.unreadCount || 0 + total}
              showZero
              offset={[-5, 5]}
            >
              <IoNotificationsOutline
                style={{ cursor: "pointer" }}
                className={`text-primary hover:text-secondery w-[48px] h-[48px] rounded-full border border-neutral p-2 shadow-xs transition-all`}
              />
            </Badge>
          </button>
          {/* <div
            onClick={() => navigate("/settings/prifile")}
            className="flex items-center gap-2"
          >
            <Avatar
              size={50}
              icon={
                <img
                  src={"/statics/profile.jpg"}
                  // src={ "/statics/demo.png"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              }
            />
            <p className="text-sm font-medium">{user?.role as TUserRole}</p>
          </div> */}
        </div>
        {!!notificationPopup && (
          <div
            ref={notificationRef}
            className={
              "absolute top-[88px] right-0 bg-white shadow-lg border border-gray-50 rounded-md px-3 py-4 max-w-[400px] w-fit"
            }
          >
            <div>
              {/* {data?.data?.latestNotifications.map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 px-[14px] py-2 cursor-pointer hover:bg-gray-100 transition-all"
              >
                <IoIosNotificationsOutline
                  // style={{ cursor: "pointer" }}
                  className={`border border-white min-w-[40px] min-h-[40px] rounded-lg p-1.5 shadow-sm bg-[#B2DAC4] text-info group-hover:bg-[#b3dfc7]`}
                />
                <div className="">
                  <h6 className="line-clamp-1">{item.msg}</h6>
                  <small className="text-[11px] text-gray-500">
                    {compareByCTime(item.createdAt)}
                  </small>
                </div>
              </div>
            ))} */}
            </div>
            <div className="w-fit mx-auto mt-4">
              <Button
                onClick={() => navigate("/notifications")}
                style={{ background: "#34D399", color: "white" }}
                size="middle"
                type="primary"
                className="w-40"
              >
                See More
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
