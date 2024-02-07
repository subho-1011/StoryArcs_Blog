import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import parse from "html-react-parser";

const HeroSection = ({ post }) => {
  return (
    <>
      <div className="w-full h-screen flex flex-col pl-16 text-left items-center">
        <h1 className="w-full flex text-5xl font-bold">
          Hello! I am Subhajit Pramanik.
        </h1>
        <p className="w-full flex mt-4 text-4xl font-semibold">
          I am a FullStack Developer.
        </p>
        <div className="w-full h-auto flex my-4 mb-20 py-10 overflow-hidden">
          <div className="w-1/2">
            <img
              src={appwriteService.getFilePreview(post?.coverImage)}
              alt={post?.title}
              className="w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col pl-10 py-2">
            <div>{post?.title.toUpperCase()}</div>
            <div className="w-full py-2">{post?.$createdAt.split("T")[0]}</div>
            <div className="w-full py-2 overflow-hidden">
              {parse(String(post?.contentParagraph))}
            </div>
            <Link to={`/post/${post?.slug}/${post?.$id}`}>
              <div className="w-full text-blue-600">Read more...</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
