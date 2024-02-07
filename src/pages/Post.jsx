import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (id) {
      appwriteService.getPost(id).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, id, navigate]);

  // TODO: delete post off now
  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.coverImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-20">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post?.coverImage)}
            className="w-full h-96 rounded-xl object-cover"
            alt={post.title}
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
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
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
      <div className="browser-css">{parse(String(post?.content || post?.contentParagraph))}</div>
      </Container>
    </div>
  ) : null;
}
