"use client";

import { Button } from "antd";
import { handleImageError } from "../../lib/handleImageError";
import { useCloseReportMutation } from "../../redux/features/settings/settingApi";
import type { TUniObject } from "../../types/common.type";
import { errorAlert } from "../../lib/helpers/alert";
import { useAppContext } from "../../lib/provider/ContextProvider";

export default function ReportDetails({
  conversation,
}: {
  conversation: TUniObject;
}) {
  const { messageApi } = useAppContext();
  const [closeReport, { isLoading }] = useCloseReportMutation();
  const handleCloseReport = async () => {
    try {
      await closeReport({
        id: conversation._id,
        body: {},
      });
      messageApi.open({
        key: "closeReport",
        type: "success",
        content: "Report closed successfully!",
      });
    } catch (error) {
      errorAlert({ error: error });
    }
  };
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Report Details</h2>
        <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
          {conversation.status}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={conversation.userId.profilePicture}
          alt="profile"
          onError={handleImageError}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{conversation.userId.name}</p>
          <p className="text-sm text-gray-500">{conversation.userId.email}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">Subject</p>
        <p className="font-medium">{conversation.subject}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Message</p>
        <div className="mt-1 p-4 bg-gray-50 rounded-lg text-gray-700">
          {conversation.message}
        </div>
      </div>
      <div className="text-sm text-gray-400">
        Created at: {new Date(conversation.createdAt).toLocaleString()}
      </div>
      {conversation.status === "OPEN" && (
        <div className="flex gap-3 pt-4">
          <a href={`mailto:${conversation.userId.email}`} target="_blank">
            <Button size="large" type="primary">
              ➜ Reply to User
            </Button>
          </a>
          <Button
            loading={isLoading}
            onClick={handleCloseReport}
            size="large"
            type="primary"
            danger
          >
            Close Report
          </Button>
        </div>
      )}
    </div>
  );
}
