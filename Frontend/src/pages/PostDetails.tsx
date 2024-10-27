import { useParams } from "react-router-dom";
import {
  useGetPostFileQuery,
  useGetSinglePostQuery,
} from "../redux/features/user/userAccess.api";

const PostDetails = () => {
  const { id } = useParams();

  const parseFileUrl = (fileUrl) => {
    try {
      const parts = fileUrl?.split("/").filter(Boolean);
      if (!parts || parts.length < 2) {
        throw new Error("Invalid file URL format.");
      }
      const bucketName = parts[0];
      const fileName = parts[1];
      return { bucketName, fileName };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const { data } = useGetSinglePostQuery(id);
  const fileUrl = data?.data?.fileUrl;

  const parsedUrl = fileUrl ? parseFileUrl(fileUrl) : null;
  const { fileName } = parsedUrl || {};

  const { data: fileData } = useGetPostFileQuery(fileName);

  return (
    <div>
      <h1>Post Details</h1>
      {fileData && (
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {fileData.content}
        </pre>
      )}
    </div>
  );
};

export default PostDetails;
