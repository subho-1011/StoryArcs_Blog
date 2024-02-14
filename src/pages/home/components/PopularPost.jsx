import parse from "html-react-parser";
import { Link } from "react-router-dom";

const PopularPost = ({ $id, slug, title, content }) => {
  return (
    <div className="py-3">
      <Link to={`/post/${slug}/${$id}`}>
        <div className="flex">
          <h1 className="bg-slate-300 dark:bg-slate-500 my-1 py-1 px-4 rounded-xl text-md dark:hover:bg-slate-600">
            {title}
          </h1>
        </div>
      </Link>
      <p>{parse(String(content))}</p>
    </div>
  );
};

export default PopularPost;
