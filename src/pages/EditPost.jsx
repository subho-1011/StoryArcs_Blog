import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(id).then((post) => {
        console.log(post);
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, id, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
