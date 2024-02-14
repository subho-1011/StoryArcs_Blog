import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../../services/appwrite/config";
import { Button } from "../../components";
import { Container } from "../../layout";
import { deletePostById } from "../../services/store/slice/postSlice";

const Post = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  get the user data from store
  const userData = useSelector((state) => state.auth.userData);

  //  get allpost from store
  const posts = useSelector((state) => state.post.posts);

  //  get the current post
  const post = posts.find((post) => post.$id === id);

  //  check if the user is currently logged in user
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    dispatch(deletePostById(id));
    // dispatch(fetchAllPosts());
    navigate("/");
  };

  return post ? (
    <div className="py-20 bg-white dark:bg-slate-700 dark:text-gray-200">
      <Container>
        <div className="w-auto flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post?.coverImage)}
            className="w-auto h-auto rounded-xl object-contain"
            alt={post?.title}
          />
          {isAuthor && (
            <div className="absolute right-2 top-2">
              <Link to={`/edit-post/${slug}/${post.$id}`}>
                <Button text={"Edit"} bgColor="bg-green-500" className="mr-3" />
              </Link>
              <Button
                text={"Delete"}
                bgColor="bg-red-500"
                onClick={deletePost}
              />
            </div>
          )}
        </div>
        <div className="w-full text-left mb-6">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
        </div>
        <div className="browser-css text-left">
          {parse(String(post?.content || post?.contentParagraph))}
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
