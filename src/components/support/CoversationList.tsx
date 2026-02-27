import { cn } from "../../utils/cn";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { handleImageError } from "../../lib/helpers/handleImageError";
import type { TQuery, TUniObject } from "../../types/common.type";
import Cookies from "js-cookie";
import { server_url } from "../../config";
import type { SearchProps } from "antd/es/input";
import { accessToken } from "../../constants";
import LoaderWraperComp from "../LoaderWraperComp";

// const demoConversations: TUniObject[] = [
//   {
//     _id: "c1",
//     chatWith: {
//       name: "John Smith",
//       image: "https://randomuser.me/api/portraits/men/45.jpg",
//     },
//     last_message_name: "Hey, I need help with my booking.",
//     updated_at: "2026-01-12T08:30:00Z",
//     isActive: false,
//   },
//   {
//     _id: "c2",
//     chatWith: {
//       name: "Sophia Williams",
//       image: "https://randomuser.me/api/portraits/women/65.jpg",
//     },
//     last_message_name: "Thank you for the quick response!",
//     updated_at: "2026-01-12T09:10:00Z",
//     isActive: true,
//   },
//   {
//     _id: "c3",
//     chatWith: {
//       name: "Michael Brown",
//       image: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     last_message_name: "Can you please update me on the status?",
//     updated_at: "2026-01-11T18:45:00Z",
//     isActive: false,
//   },
//   {
//     _id: "c4",
//     chatWith: {
//       name: "Emma Johnson",
//       image: "https://randomuser.me/api/portraits/women/12.jpg",
//     },
//     last_message_name: "I’ve sent the required documents.",
//     updated_at: "2026-01-11T14:22:00Z",
//     isActive: false,
//   },
//   {
//     _id: "c5",
//     chatWith: {
//       name: "Daniel Lee",
//       image: "https://randomuser.me/api/portraits/men/78.jpg",
//     },
//     last_message_name: "Is the payment confirmed?",
//     updated_at: "2026-01-10T20:05:00Z",
//     isActive: true,
//   },
// ];
const ConversationList = ({
  conversationid,
  setConversationId,
  className,
}: {
  conversationid?: TUniObject;
  setConversationId: React.Dispatch<
    React.SetStateAction<TUniObject | undefined>
  >;
  className?: string;
}) => {
  //   const navigate = useNavigate();
  const [data, setData] = useState<TUniObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<TQuery>({
    page: 1,
    limit: 10,
  });

  const fetchData = async ({
    searchTerm,
    type,
  }: {
    searchTerm?: string;
    type?: "search" | "next";
  }) => {
    let params = `?page=1`;
    if (type === "search") {
      params = `?searchTerm=${searchTerm}&page=1`;
    } else if (type === "next") {
      params = !!searchTerm
        ? `?searchTerm=${searchTerm}&page=${query.page}`
        : `?page=${query.page}`;
    }
    try {
      if (type === "next") {
        if (!query.page) return;
      } else {
        setIsLoading(true);
      }
      const token = Cookies.get(accessToken);
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Custom-Header": "custom-value",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(server_url + "supports" + params, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      const resData = await response.json();
      setQuery((c) => ({ ...c, page: resData?.pagination?.nextPage }));
      if (type === "next") {
        setData((c) => [...c, ...resData?.data]);
      } else {
        setData(resData?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //   useEffect(() => {
  //     if (data?.length && conversationId) {
  //       setCommunicator(
  //         data.find((con) => con?._id === conversationId) as TUniObject
  //       );
  //     }
  //   }, [data, conversationId]);

  useEffect(() => {
    fetchData({});
  }, []);

  const onSearch: SearchProps["onSearch"] = (value, _e, _info) => {
    fetchData({ type: "search", searchTerm: value });
  };

  return (
    <div
      className={cn("w-full rounded-xl shadow-sm p-4 pr-0.5 h-full", className)}
    >
      {/* Search Input */}
      <div className="mr-4">
        <Input.Search
          allowClear
          placeholder="Search here..."
          onSearch={onSearch}
          enterButton
          size="large"
          style={{ marginBottom: 8 }}
        />
      </div>
      <LoaderWraperComp
        isError={false}
        isLoading={isLoading}
        loader={<LoadingContent />}
        dataEmpty={data?.length < 1}
      >
        <div
          className="h-full overflow-y-auto max-h-[calc(100vh-245px)]"
          onScroll={(e) => {
            const target = e.target as HTMLElement;
            if (
              target.scrollTop + target.offsetHeight ===
              target.scrollHeight
            ) {
              fetchData({ type: "next" });
            }
          }}
        >
          {data.map((conversation: TUniObject, index: number) => (
            <div
              key={index}
              className={`text-black px-4 py-2.5 border-b border-gray-100 hover:bg-blue-50/80 cursor-pointer transition-all ${
                conversationid?._id === conversation?._id ? "bg-blue-50" : ""
              }`}
              onClick={() => setConversationId(conversation)}
            >
              <div className="flex items-center gap-4 w-full">
                <div className="rounded-full overflow-hidden w-12.5 h-12.5 shrink-0 border border-blue-200 p-px">
                  <img
                    src={conversation.userId.profilePicture}
                    alt={conversation.userId.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center w-full gap-3">
                  <div>
                    <h1 className="font-medium text-lg">
                      {conversation?.userId?.name}
                    </h1>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {new Date(conversation?.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-xs font-medium",
                      conversation.status === "OPEN" && "text-green-600",
                      conversation.status === "CLOSED" && "text-yellow-500",
                    )}
                  >
                    {conversation.status === "OPEN" ? "Open" : "Closed"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default ConversationList;

const LoadingContent = () => {
  return (
    <div className="w-full h-full space-y-3 px-2">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="mx-auto w-full p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-12 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-none"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
