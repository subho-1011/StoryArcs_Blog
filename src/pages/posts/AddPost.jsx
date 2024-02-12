import { PostForm } from "./components"
import { Container } from "../../layout"

const AddPost = () => {
  return (
      <div className="py-8 bg-white dark:bg-slate-700 dark:text-gray-200">
          <Container>
              <PostForm />
          </Container>
      </div>
  );
}

export default AddPost