import Home from "../app/Home";
import Notification from "../app/Notification";
import type { DashboardItem } from "../types/sidebar.type";
import { ROLE } from "../types/common.type";
import { LuMonitorCog, LuSettings } from "react-icons/lu";
import { RiShieldUserLine } from "react-icons/ri";
import {
  MdOutlineHistoryEdu,
  MdOutlineSecurityUpdateWarning,
  MdWorkspacePremium,
} from "react-icons/md";
import Settings from "../app/Settings/Settings";
import { TbUsersGroup } from "react-icons/tb";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import Utils from "../app/Settings/Utils";
import EditUtils from "../app/Settings/EditUtils";
import Companies from "../app/Companies";
import CompanyDetails from "../app/Companies/CompanyDetails";
import { FiPackage } from "react-icons/fi";
import SubscriptionHistory from "../app/Subscriptions/SubscriptionHistory";
import SubscriptionPlans from "../app/Subscriptions/SubscriptionPlans";
import Employees from "../app/Employees";
import { VscFolderActive } from "react-icons/vsc";
import ActiveSites from "../app/ActiveSites";
import { GoTasklist } from "react-icons/go";
import AssignedSites from "../app/Tasks/AssignedSites";
import AssignedDetails from "../app/Tasks/AssignedDetails";

export const dashboardItems: DashboardItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: LuMonitorCog,
    element: <Home />,
    role: [ROLE.ADMIN, ROLE.OFFICE_ADMIN],
  },
  {
    path: "notifications",
    element: <Notification />,
  },
  {
    name: "Companies",
    path: "companies",
    icon: TbUsersGroup,
    element: <Companies />,
    role: [ROLE.ADMIN],
  },
  {
    path: "companies/:id",
    element: <CompanyDetails />,
    role: [ROLE.ADMIN],
  },
  {
    name: "Employee Management",
    path: "employees",
    icon: TbUsersGroup,
    element: <Employees />,
    role: [ROLE.OFFICE_ADMIN],
  },
  {
    name: "Active Sites",
    path: "active-sites",
    icon: VscFolderActive,
    element: <ActiveSites />,
    role: [ROLE.OFFICE_ADMIN],
  },
  {
    name: "Assigned Task",
    path: "assigned-task",
    icon: GoTasklist,
    element: <AssignedSites />,
    role: [ROLE.OFFICE_ADMIN],
  },
  {
    path: "/assigned-task/:id",
    element: <AssignedDetails />,
    role: [ROLE.OFFICE_ADMIN],
  },
  // {
  //   name: "Reassined Task",
  //   path: "reassigned-task",
  //   icon: LuListRestart,
  //   element: <ReassignedTasks />,
  //   role: [ROLE.OFFICE_ADMIN],
  // },
  {
    name: "Subscriptions",
    path: "subscriptions",
    icon: MdWorkspacePremium,
    role: [ROLE.ADMIN],
    children: [
      {
        name: "All Plan's",
        path: "subscriptions/all-plan",
        icon: FiPackage,
        element: <SubscriptionPlans />,
        role: [ROLE.ADMIN],
      },
      {
        name: "History",
        path: "subscriptions/history",
        icon: MdOutlineHistoryEdu,
        element: <SubscriptionHistory />,
        role: [ROLE.ADMIN],
      },
    ],
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
