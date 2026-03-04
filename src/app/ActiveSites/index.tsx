import PageHeading from "../../components/ui/PageHeading";
import {
  Button,
  Dropdown,
  Input,
  Popconfirm,
  Table,
  type TableColumnsType,
} from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { useAppContext } from "../../lib/provider/ContextProvider";
import type { TQuery, TUniObject } from "../../types/common.type";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { queryFormat } from "../../lib/helpers/queryFormat";
import { errorAlert } from "../../lib/helpers/alert";
import { debounceSearch } from "../../utils/debounce";
import LoaderWraperComp from "../../components/LoaderWraperComp";
import CPagination from "../../components/ui/CPagination";
import { useGetActiveSitesQuery } from "../../redux/features/tasks/tasksApi";
import DashboardModal from "../../components/DashboardModal";

const ActiveSites = () => {
  const { messageApi } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<TUniObject | null>(null);
  const [query, setQuery] = useState<TQuery<TUniObject>>({
    page: 1,
    limit: 15,
  });

  //   const [suspendUser] = useSuspendUserMutation();

  const { data, isLoading, isError, error } = useGetActiveSitesQuery(
    queryFormat(query),
  );

  const confirm = async (userData: TUniObject) => {
    try {
      //   await suspendUser({
      //     id: userData._id,
      //     status: userData.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
      //   }).unwrap()
      console.log(userData);
      messageApi.success(`Successfully deleted!`);
    } catch (error) {
      errorAlert({ error });
    }
  };
  const columns: TableColumnsType = [
    {
      title: "Site Name",
      dataIndex: ["siteTitle"],
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Owner’s Name",
      dataIndex: ["siteOwner"],
      render: (text: string) => (
        <div className="">
          <p className="capitalize">{text}</p>
        </div>
      ),
    },
    {
      title: "Site Location",
      dataIndex: ["location", "address"],
      render: (value) => <p>{value || "N/A"}</p>,
      // align: "center",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value) => <p>{new Date(value).toLocaleString()}</p>,
    },
    {
      title: "Action",
      render: (record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <span
                    onClick={() => {
                      setOpenModal(true);
                      setModalData({ type: "view", ...record });
                    }}
                  >
                    Details
                  </span>
                ),
              },
              {
                key: "2",
                label: (
                  <p onClick={() => {}}>
                    Edit <span className="text-xs! inline-block">✍🏻</span>
                  </p>
                ),
              },
              {
                key: "3",
                label: (
                  <Popconfirm
                    title={`Delete`}
                    description={`Are you sure you want to delete this site?`}
                    onConfirm={() => confirm(record)}
                    onCancel={() => messageApi.error("Cancelled")}
                    okText="Delete"
                    cancelText="Cancel"
                    placement="bottomRight"
                    arrow={false}
                  >
                    <span>Delete</span>
                  </Popconfirm>
                ),
                danger: true,
              },
            ],
            // onClick: handleMenuClick(record._id),
          }}
          placement="bottomRight"
          // className="!absolute top-[4%] right-[3%]"
        >
          <Button
            shape="circle"
            size="small"
            style={{ background: "none" }}
            icon={<HiDotsVertical size={14} className="mt-0.75" />}
          />
        </Dropdown>
      ),
      align: "center",
    },
  ];
  return (
    <div>
      <div className="flex justify-between gap-2 pt-8 pb-4">
        <PageHeading
          title={`Active Sites List`}
          hideIcon
          className="capitalize"
        />
        <div className="flex justify-end gap-3">
          <Input
            onChange={(e) =>
              debounceSearch({
                setter: setQuery,
                newValue: e.target.value,
                name: "searchTerm",
              })
            }
            allowClear
            placeholder="Search here.."
            suffix={<IoSearchOutline size={18} />}
            className="rounded-full! xl:w-64!"
          />
        </div>
      </div>
      <LoaderWraperComp isError={isError} error={error}>
        <div className="w-full overflow-x-auto">
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={data?.data}
            pagination={false}
            rowKey={"_id"}
          />
        </div>
      </LoaderWraperComp>
      <CPagination
        setQuery={setQuery}
        query={query}
        totalData={data?.meta?.total}
      />
      <DashboardModal
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        maxWidth="600px"
      >
        <div className="w-full">
          <PageHeading
            title="Site Details"
            hideIcon
            className="justify-center pb-2.5"
          />
        </div>
        <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {modalData?.siteTitle || "N/A"}
        </h1>
        <p className="text-gray-500 mt-1">
          Owned by {modalData?.siteOwner || "N/A"}
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
            {modalData?.buildingType || "N/A"}
          </span>

          <span
            className={`px-3 py-1 text-sm rounded-full ${
              status === "To-Do"
                ? "bg-yellow-100 text-yellow-700"
                : status === "Completed"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status || "Unknown"}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Location */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Location</h2>

          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Address:</span>{" "}
              {modalData?.location?.address || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Latitude:</span>{" "}
              {modalData?.location?.coordinates?.lat ?? "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Longitude:</span>{" "}
              {modalData?.location?.coordinates?.lng ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Project Info */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Project Info</h2>

          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">End Date:</span>{" "}
              {modalData?.endDate
                ? new Date(modalData?.endDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Created At:</span>{" "}
              {modalData?.createdAt
                ? new Date(modalData?.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Photos */}
      {modalData?.photos?.length > 0 && (
        <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Project Photos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {modalData?.photos.map((photo: string, index: number) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={photo}
                  alt="Site"
                  className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
      </DashboardModal>
    </div>
  );
};

export default ActiveSites;
