import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-pro-react";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "../../lib/provider/ContextProvider";
import { errorAlert } from "../../lib/helpers/alert";
import PageHeading from "../../components/ui/PageHeading";
import { utilityHeading } from "../../constants";
import type { TUniObject } from "../../types/common.type";
import {
  useGetSettingQuery,
  useUpdateSettingsMutation,
} from "../../redux/features/settings/settingApi";
import LoaderWraperComp from "../../components/LoaderWraperComp";

const EditUtils = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { messageApi } = useAppContext();
  const [content, setContent] = useState("Write here");
  const pathName = location.pathname;
  const [mutation, { isLoading: muLoading }] = useUpdateSettingsMutation();
  const { data, isLoading, isError } = useGetSettingQuery(
    `${pathName.split("/")[2]}`,
  );

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data.data.description);
    }
  }, [data]);
  const handleSave = async () => {
    try {
      await mutation({
        url: `${pathName.split("/")[2]}/update`,
        body: { description: content },
      }).unwrap();
      messageApi.open({
        key: "auth",
        type: "success",
        content: "Mutation successful.",
        // content: response.message || "Mutation successful.",
        duration: 4,
      });
      navigate(-1);
    } catch (error) {
      errorAlert({ error: error });
    }
  };
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    uploader: {
      url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
    },
    filebrowser: {
      ajax: {
        url: "https://xdsoft.net/jodit/finder/",
      },
    },
    minHeight: 650,
    buttons: [
      "fontsize", // Change font size
      "bold", // Bold text
      "italic", // Italic text
      "underline", // Underline text
      "strikethrough", // Strikethrough text
      "link", // Insert a link
      // "image", // Insert an image
      // "video", // Insert a video
      // "quote", // Insert a blockquote
      // "code", // Insert code snippet
      "undo", // Undo
      "redo", // Redo
      // "clean", // Clean content
      "align", // Align buttons (left, center, right)
      "font", // Change font family
      // "forecolor", // Text color
      // "backcolor", // Background color
      "table", // Insert table
      "ul", // Unordered list
      "ol", // Ordered list
      "outdent", // Outdent
      "indent", // Indent
    ],
  };
  return (
    <div className="space-y-4">
      <PageHeading
        title={`Edit ${(utilityHeading as TUniObject)[pathName.split("/")[2]]}`}
      />
      <LoaderWraperComp
        isLoading={isLoading}
        isError={isError}
        className={"min-h-[50vh]"}
      >
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(_newContent) => {}}
        />
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            loading={muLoading}
            size="large"
            type="primary"
            htmlType="submit"
            className="px-8 w-62.5"
          >
            Save Changes
          </Button>
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default EditUtils;
