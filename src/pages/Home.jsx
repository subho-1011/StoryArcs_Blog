import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currUser, setCurrUser] = useState(null);

  const fetchPosts = async () => {
    const user = await authService.getCurrentUser();
    setCurrUser(user);

    if (user) {
      const posts = await appwriteService.getPosts([]);
      if (posts) setPosts(posts.documents);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!currUser) {
    return (
      <div className="py-8 flex w-full h-screen items-center bg-white dark:bg-slate-900">
        <h1 className="w-full text-3xl font-bold dark:text-white text-center">
          Please login to see posts
        </h1>
      </div>
    );
  }

  return (
    <div className="py-8 flex w-full bg-white dark:bg-slate-900">
      <Container>
        <div className="flex flex-col-reverse items-center">
          {posts.map((post) => (
            <div key={post.$id} className="w-2/3 p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;