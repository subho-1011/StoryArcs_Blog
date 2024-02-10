import { useEffect, useState } from "react";
import appwriteService from "../../services/appwrite/config";
import { Container } from "../../layout";
import { PostCard } from "./components";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  return (
      <div className="py-4 w-full dark:bg-slate-700">
          <Container className="">
              <div className="flex flex-wrap">
                  {posts.map((post) => (
                      <div key={post.$id} className="w-full p-2">
                          <PostCard {...post} />
                      </div>
                  ))}
              </div>
          </Container>
      </div>
  );
};

export default AllPosts;
