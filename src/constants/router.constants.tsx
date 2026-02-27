import Home from "../app/Home";
import Notification from "../app/Notification";
import type { DashboardItem } from "../types/sidebar.type";
import { ROLE } from "../types/common.type";
import { LuMonitorCog, LuSettings } from "react-icons/lu";
import { RiShieldUserLine, RiUserSettingsFill } from "react-icons/ri";
import { PiHandWithdrawBold } from "react-icons/pi";
import {
  MdContactSupport,
  MdOutlineSecurityUpdateWarning,
  MdVerified,
} from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import Settings from "../app/Settings/Settings";
import { AiOutlineTransaction } from "react-icons/ai";
import Transactions from "../app/Earnings/Transactions";
import WithdrawReq from "../app/Earnings/WithdrawReq";
import { HiOutlineUsers } from "react-icons/hi";
import { TbUserShield } from "react-icons/tb";
import RequestedLilst from "../app/Verification/RequestedLilst";
import Support from "../app/Support/Support";
import Users from "../app/Users/Users";
import DriverDetails from "../components/users/DriverDetails";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import Utils from "../app/Settings/Utils";
import EditUtils from "../app/Settings/EditUtils";

export const dashboardItems: DashboardItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: LuMonitorCog,
    element: <Home />,
    role: [ROLE.ADMIN],
  },
  {
    path: "notifications",
    element: <Notification />,
  },

  {
    name: "Earnings",
    path: "earnings",
    icon: GiReceiveMoney,
    role: [ROLE.ADMIN],
    children: [
      {
        name: "Transactions",
        path: "earnings/transactions",
        icon: AiOutlineTransaction,
        element: <Transactions />,
        role: [ROLE.ADMIN],
      },
      {
        name: "Withdraw Req",
        path: "earnings/withdraw-req",
        icon: PiHandWithdrawBold,
        element: <WithdrawReq />,
        role: [ROLE.ADMIN],
      },
    ],
  },
  {
    name: "Users",
    path: "users",
    icon: RiUserSettingsFill,
    role: [ROLE.ADMIN],
    children: [
      {
        name: "Passengers",
        path: "users/passenger",
        icon: HiOutlineUsers,
        element: <Users viewType="rider" />,
        role: [ROLE.ADMIN],
      },
      {
        name: "Drivers",
        path: "users/driver",
        icon: TbUserShield,
        element: <Users viewType="driver" />,
        role: [ROLE.ADMIN],
      },
      {
        path: "users/:view/:id",
        element: <DriverDetails />,
        role: [ROLE.ADMIN],
      },
    ],
  },
  {
    name: "Verifications",
    path: "verification",
    icon: MdVerified,
    role: [ROLE.ADMIN],
    element: <RequestedLilst />,
  },
  {
    path: "verification/:id",
    role: [ROLE.ADMIN],
    element: <DriverDetails />,
  },
  {
    name: "Support",
    path: "support",
    icon: MdContactSupport,
    role: [ROLE.ADMIN],
    element: <Support />,
  },

  // settings
  {
    name: "Settings",
    path: "settings",
    icon: LuSettings,
    role: Object.values(ROLE),
    children: [
      {
        name: "Profile",
        path: "settings/prifile",
        icon: RiShieldUserLine,
        role: Object.values(ROLE),
        element: <Settings />,
      },
      {
        name: "About Us",
        icon: BiMessageSquareDetail,
        path: "settings/about",
        role: Object.values(ROLE),
        element: <Utils />,
      },
      {
        name: "Terms & Services",
        icon: FaServicestack,
        path: "settings/terms",
        role: Object.values(ROLE),
        element: <Utils />,
      },

      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy",
        role: Object.values(ROLE),
        element: <Utils />,
      },

      {
        path: "settings/:path/:path",
        role: [ROLE.ADMIN],
        element: <EditUtils />,
      },
    ],
  },
];
