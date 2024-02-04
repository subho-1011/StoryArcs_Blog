import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    // call getPosts for getting all posts
    appwriteService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
    // get current user
    authService.getCurrentUser().then((user) => {
      setCurrUser(user);
    });
  }, []);

  // if currUser is null, it means user is not logged in, please login
  if (!currUser) {
    return (
      <div className="py-8 w-full mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full p-2">
              <h1 className="text-3xl font-bold">Please login</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return posts ? (
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
  ) : (
      <div className="py-8 w-full mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full p-2">
              <h1 className="text-3xl font-bold">Don`t have any posts</h1>
            </div>
          </div>
        </Container>
      </div>
    );
};

export default Home;
