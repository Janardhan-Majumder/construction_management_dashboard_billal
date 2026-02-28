import { NavLink, useLocation, useNavigate } from "react-router";
import { createElement, useState } from "react";
import Swal from "sweetalert2";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineArrowRight } from "react-icons/md";
import { routeLinkGenerators } from "../../lib/helpers/generateLink";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { TUserRole } from "../../types/common.type";
import { cn } from "../../utils/cn";
import { dashboardItems } from "../../constants/router.constants";
import { handleImageError } from "../../lib/handleImageError";
import { logout } from "../../redux/features/Auth/authSlice";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [openNome, setOpenNome] = useState<{ name: string | null }>({
    name: null,
  });
  const handleLogOut = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "     Logout     ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(logout());
        navigate("/auth");
      }
    });
  };
  // useEffect(() => {

  // }, [location.pathname]);
  // console.log(routeLinkGenerators(dashboardItems, "admin"));
  return (
    <div className="fixed top-0 left-0 w-62.5 2xl:w-70 min-h-screen h-full py-3.5 z-20">
      <div className="h-full flex flex-col justify-between drop-shadow-sm pt-px rounded-r-lg inset-shadow-2xs shadow-md">
        <div className="">
          <div className="w-full flex flex-col items-center justify-center p-6">
            <img
              className="w-full"
              src={`/statics/logo.svg`}
              alt=""
              onError={handleImageError}
            />
            {/* <h4 className="text-sm font-semibold mt-3">{user?.name}</h4>
            <span className="text-xs">Administrator</span> */}
          </div>
          <ul className=" max-h-[calc(100vh-220px)] overflow-y-auto space-y-1 mt-5">
            {routeLinkGenerators(dashboardItems, user?.role as TUserRole).map(
              ({ name, icon, path, children, rootPath }, indx) =>
                children?.length ? (
                  <li key={indx} className="overflow-hidden">
                    <button
                      onClick={() => {
                        setOpenNome((c) => ({
                          name: c?.name === name ? null : name,
                        }));
                      }}
                      className={cn(
                        "hover:text-primary hover:bg-primary/5 outline-none text-[#373643] w-full pl-5 pr-4 py-3 flex items-center justify-between gap-3 2xl:text-lg transition-all rounded-lg group",
                        {
                          "text-primary bg-primary/5":
                            name !== openNome?.name &&
                            location.pathname.includes(rootPath as string) &&
                            openNome.name,
                          "text-primary":
                            name === openNome?.name ||
                            (location.pathname.includes(rootPath as string) &&
                              !openNome.name),
                        },
                      )}
                    >
                      <div className="flex items-center justify-start gap-2.5">
                        <div>{createElement(icon, { size: "20" })}</div>
                        <span>{name}</span>
                      </div>
                      <MdOutlineArrowRight
                        className={cn(
                          "text-slate-500 group-hover:text-[#373643] cursor-pointer transition-all",
                          {
                            "rotate-90 text-[#373643] group-hover:text-slate-500 cursor-auto":
                              name === openNome?.name ||
                              (location.pathname.includes(rootPath as string) &&
                                !openNome.name),
                          },
                        )}
                        size={20}
                      />
                    </button>
                    <div
                      className={cn("space-y-0.5 h-0 overflow-hidden", {
                        "h-fit pt-0.5":
                          name === openNome?.name ||
                          (location.pathname.includes(rootPath as string) &&
                            !openNome.name),
                      })}
                    >
                      {children?.map((child, inx) => (
                        <NavLink
                          key={inx}
                          to={child.path as string}
                          className={({ isActive }) =>
                            cn(
                              "hover:text-primary hover:bg-primary/5 text-brand w-full pl-8 pr-4 py-3 flex items-center justify-start gap-2.5 text-sm 2xl:text-base transition-all",
                              {
                                "text-primary bg-primary/5 relative before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:rounded-r-xs before:bg-primary":
                                  isActive,
                              },
                            )
                          }
                        >
                          <div>{createElement(child.icon, { size: "15" })}</div>
                          <span> {child.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      setOpenNome((c) => ({
                        name: c?.name === name ? null : name,
                      }));
                    }}
                    key={indx}
                  >
                    <NavLink
                      to={path as string}
                      className={({ isActive }) =>
                        cn(
                          " hover:text-primary hover:bg-primary/5 text-brand w-full pl-5 pr-4 py-3 flex items-center justify-start gap-2.5 2xl:text-lg transition-all",
                          {
                            "text-primary bg-primary/5 relative before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:rounded-r-xs before:bg-primary":
                              isActive,
                          },
                        )
                      }
                    >
                      <div>{createElement(icon, { size: "17" })}</div>
                      <span> {name}</span>
                    </NavLink>
                  </li>
                ),
            )}
          </ul>
        </div>
        <div className="px-2.5 mb-3 mt-auto">
          <button
            onClick={handleLogOut}
            className="bg-red-100 w-full px-4 py-3 flex items-center justify-start gap-2.5 2xl:text-lg outline-none text-[#373643] rounded-lg cursor-pointer"
          >
            <FiLogOut className="text-red-400" size={18} />
            <span className="text-red-500">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
