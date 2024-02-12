import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../services/appwrite/config";
import { Container } from "../../layout";
import { PostForm } from "./components";

//  FIXME EDIT POST NOT WORK
const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      appwriteService.getPost(id).then((post) => {
        // console.log(post);
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, id, navigate]);

  return post ? (
    <div className="py-8 bg-white dark:bg-slate-700 dark:text-gray-200">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
