import { Container } from "../../layout";
import { PostCard } from "./components";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const posts = useSelector((state) => state.post.posts);
  console.log(posts);

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
