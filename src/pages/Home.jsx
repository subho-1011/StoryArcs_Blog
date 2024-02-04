import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const user = await authService.getCurrentUser();
      setCurrUser(user);
      setLoading(false);

      if (user) {
        const posts = await appwriteService.getPosts([]);
        if (posts) setPosts(posts.documents);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">Loading....</div>
    )
  }

  if (!currUser) {
    return (
      <>
        <h1 className="text-3xl font-bold">Please login to see posts</h1>
      </>
    )
  }

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
              <div key={post.$id} className="w-1/3 p-2">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
