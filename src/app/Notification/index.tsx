import { MdArrowBackIos } from "react-icons/md";
import PageHeading from "../../components/ui/PageHeading";
import type { TUniObject } from "../../types/common.type";
import { BiBell } from "react-icons/bi";
import { compareByCTime } from "../../lib/helpers/compareByCTime";
import { cn } from "../../utils/cn";

const Notification = () => {
  const allNotifications: TUniObject[] = [
    {
      _id: 1,
      title: "New Booking Received",
      message: "You have received a new booking request from a client.",
      createdAt: "2024-10-22T08:30:00Z",
      isRead: false,
    },
    {
      _id: 2,
      title: "Payment Successful",
      message: "Your payment of $120.00 has been processed successfully.",
      createdAt: "2024-10-21T16:15:00Z",
      isRead: false,
    },
    {
      _id: 3,
      title: "Booking Confirmed",
      message: "Your booking for tomorrow has been confirmed.",
      createdAt: "2024-10-21T10:45:00Z",
      isRead: true,
    },
    {
      _id: 4,
      title: "Profile Updated",
      message: "Your profile information was updated successfully.",
      createdAt: "2024-10-20T14:20:00Z",
      isRead: true,
    },
    {
      _id: 5,
      title: "Password Changed",
      message: "Your account password has been changed successfully.",
      createdAt: "2024-10-20T09:10:00Z",
      isRead: true,
    },
    {
      _id: 6,
      title: "New Message",
      message: "You have received a new message from support.",
      createdAt: "2024-10-19T18:40:00Z",
      isRead: false,
    },
    {
      _id: 7,
      title: "Service Completed",
      message: "Your recent service request has been completed.",
      createdAt: "2024-10-19T11:05:00Z",
      isRead: true,
    },
    {
      _id: 8,
      title: "Invoice Generated",
      message: "A new invoice has been generated for your order.",
      createdAt: "2024-10-18T15:55:00Z",
      isRead: true,
    },
    {
      _id: 9,
      title: "Reminder",
      message: "You have an upcoming appointment scheduled for tomorrow.",
      createdAt: "2024-10-18T08:00:00Z",
      isRead: false,
    },
    {
      _id: 10,
      title: "System Update",
      message: "The system will undergo maintenance tonight at 11 PM.",
      createdAt: "2024-10-17T20:30:00Z",
      isRead: true,
    },
  ];
  return (
    <div className="py-4">
      <PageHeading
        // backPath={"/auth"}
        title={"Notifications"}
        // hideIcon={true}
        backIcon={MdArrowBackIos}
        className="border-b border-secondery/60 px-4 gap-0 pb-3"
      />
      <div className="divide-y divide-blue-50">
        {allNotifications.map((item: TUniObject) => (
          <div
            key={item._id}
            // onClick={() => handleNotificationClick(item)}
            className="group flex items-center gap-4 px-5 sm:px-[24px] py-4 cursor-pointer hover:bg-gray-100 transition-all relative"
          >
            <BiBell
              style={{ cursor: "pointer" }}
              className={`shrink-0 bg-white border border-white w-[42px] h-10 text-[#564987] rounded-full p-1.5 shadow-xs`}
            />
            <div className="space-y-[2px] flex-1">
              <h6 className="font-medium text-lg">{item.title}</h6>
              <p className="text-sm text-gray-600">{item.message}</p>
            </div>
            <div
              className={cn(
                "w-fit flex items-center"
                //   {
                //   hidden: !!item?.isRead,
                // }
              )}
            >
              {!item?.isRead ? (
                <div className="text-[9px] font-semibold bg-yellow-400/20 px-2 h-[16px] rounded-full flex items-center justify-center pt-0.5">
                  New
                </div>
              ) : (
                <small className="text-[12px] text-gray-500">
                  {compareByCTime({ preTime: item.createdAt })}
                </small>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
