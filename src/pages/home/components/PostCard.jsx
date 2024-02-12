import { Link } from "react-router-dom";
import parse from "html-react-parser";
import appwriteService from "../../../services/appwrite/config";

const PostCard = ({
  slug,
  title,
  coverImage,
  $id,
  contentParagraph,
  $createdAt,
}) => {
  return (
    <Link to={`/post/${slug}/${$id}`}>
      <div className="flex flex-row h-80 bg-white dark:bg-gray-600 shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
        <div className="w-1/2 flex relative overflow-hidden shadow-md">
          <img
            src={appwriteService.getFilePreview(coverImage)}
            alt={title}
            className="object-top absolute h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="w-1/2 flex flex-col pl-10 py-2 text-left">
          <div>{title.toUpperCase()}</div>
          <div className="w-full py-2">{$createdAt?.split("T")[0]}</div>
          <div className="w-full py-2 overflow-hidden">
            {parse(String(contentParagraph))}
          </div>
          <Link to={`/post/${slug}/${$id}`}>
            <div className="w-full text-blue-600">Read more...</div>
          </Link>
        </div>
        <div className="px-4 lg:px-0"></div>
      </div>
    </Link>
  );
};

export default PostCard;
