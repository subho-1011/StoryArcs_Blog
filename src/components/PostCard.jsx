import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ slug, title, coverImage, $id }) => {
  return (
    <Link to={`/post/${slug}/${$id}`}>
      <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md pb-80 mb-6">
          <img
            src={appwriteService.getFilePreview(coverImage)}
            alt={title}
            className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <h2 className="transition duration-100 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default PostCard;
