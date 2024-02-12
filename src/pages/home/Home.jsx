import { useEffect } from "react";
import { Container } from "../../layout";
import { HeroSection, PopularCat, PopularPost, PostCard } from "./components";
import { fetchAllPosts } from "../../services/store/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const userStatus = useSelector((state) => state.auth.status);
  console.log(userStatus);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div className="text-center bg-gray-100 dark:bg-slate-800 dark:text-slate-200">
      <Container className="py-8 h-auto w-full">
        <HeroSection post={posts[posts.length - 1]} />
      </Container>
      <Container className="h-auto w-full">
        <PopularCat />
      </Container>
      <Container className="py-8 pb-16 h-auto w-full">
        <div className="w-full flex flex-row justify-between">
          <div className="w-4/5">
            <h1 className="text-4xl font-bold text-left pb-10">Recent Posts</h1>
            <div className="flex h-auto w-full">
              <div className="w-full h-auto">
                {posts.map((post) => (
                  <PostCard key={post?.$id} {...post} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/5 ml-10 pl-4 text-left">
            <h1 className="text-2xl font-bold pb-10 ">Popular Posts</h1>
            <div className="h-auto">
              {posts.map((post) => (
                <PopularPost key={post.$id} {...post} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
