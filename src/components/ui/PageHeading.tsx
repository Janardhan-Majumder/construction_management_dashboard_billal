import { FaArrowLeft } from "react-icons/fa6";
import { cn } from "../../utils/cn";
import { createElement } from "react";
import type { IconType } from "react-icons";
import { useNavigate } from "react-router";

const PageHeading = ({
  title,
  backPath,
  hideIcon,
  className,
  backIcon,
}: {
  title: string;
  backPath?: string;
  hideIcon?: boolean;
  className?: string;
  backIcon?: IconType;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 text-[24px] font-medium text-brand",
        className
      )}
    >
      {!hideIcon && (
        <button
          className="outline-none pr-1 cursor-pointer pt-0.5 text-brand/70"
          onClick={() => (backPath ? navigate(backPath) : navigate(-1))}
        >
          {createElement(backIcon || FaArrowLeft, { size: 19 })}
        </button>
      )}
      <h1>{title}</h1>
    </div>
  );
};

export default PageHeading;
