import ConversationList from "../../components/support/CoversationList";
import { BiMessageSquare } from "react-icons/bi";
import PageHeading from "../../components/ui/PageHeading";
import { MdArrowBackIos } from "react-icons/md";
import { useState } from "react";
import type { TUniObject } from "../../types/common.type";
import ReportDetails from "../../components/ui/ReportDetails";

const Support = () => {
  const [conversationid, setConversationId] = useState<
    TUniObject | undefined
  >();
  return (
    <>
      <PageHeading
        title={`Support Messages`}
        backIcon={MdArrowBackIos}
        className="capitalize mb-4"
      />
      <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-150px)]">
        <ConversationList
          conversationid={conversationid}
          setConversationId={setConversationId}
          className="col-span-4"
        />
        <div className="col-span-8 w-full rounded-xl shadow-sm p-4 pb-0">
          {conversationid ? (
            <ReportDetails conversation={conversationid} />
          ) : (
            <div className="flex justify-center items-center h-full pb-4">
              <div className="p-8 rounded-lg flex flex-col items-center">
                <div className="mb-4 bg-blue-100 p-4 rounded-full">
                  <BiMessageSquare size={48} className="text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Select a report to view details
                </h2>
                <p className="text-gray-600 mb-4">
                  Choose a report from the sidebar to start messaging
                </p>
                {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors font-medium">
                New Conversation
              </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Support;
