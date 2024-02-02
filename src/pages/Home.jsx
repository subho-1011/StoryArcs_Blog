import appwriteService from "../appwrite/config";
import { useEffect, useState } from "react";
import { Container, PostCard} from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  if (posts) {
    return (
      <div className="py-8 w-full mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full p-2">
              <h1 className="text-3xl font-bold">Login to read more</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  
  return (<div className="py-8 w-full">
    <Container>
        <div className="flex flex-wrap">
            {posts.map((post) => (
                <div key={post.$id} className="w-1/3 p-2">
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    </Container>
  </div>);
};

export default Home;
