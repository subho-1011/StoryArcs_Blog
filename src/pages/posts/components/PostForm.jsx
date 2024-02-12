import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { service as appwriteService } from "../../../services/appwrite";
import { Select, Button, Input } from "../../../components";
import RTE from "./RTE";
import { addPost, updatePost } from "../../../services/store/slice/postSlice";

export default function PostForm({ post }) {
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm({
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      contentParagraph: post?.contentParagraph || "",
      status: post?.status || "draft",
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // * get the current user
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData);

  const submit = async (data) => {
    console.log(data);
    if (post) {
      console.log(data);
      console.log(post);
      const imageFile = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (imageFile) appwriteService.deleteFile(post.coverImage);

      const newPostData = {
        ...data,
        coverImage: imageFile ? imageFile.$id : undefined,
      };

      if (newPostData) {
        dispatch(updatePost(post.$id, { newPostData }));
      }
    } else {
      const imageFile = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (imageFile) {
        const imageFileId = imageFile.$id;
        data.coverImage = imageFileId;
      }

      const newPostData = {
        ...data,
        userId: userData.$id,
        author: userData.name,
      };

      if (newPostData) {
        dispatch(addPost(newPostData));
      }
    }
    navigate("/");
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return "";
  }, []);

  useEffect(() => {
    const subcription = watch((value, { name }) => {
      if (name === "title")
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
    });

    return () => subcription.unsubscribe();
  }, [watch, post, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap ">
      <div className="w-2/3 px-2">
        <label>Title</label>
        <Input
          text={post?.title || ""}
          placeholder="Title..."
          className="mb-4 text-white dark:text-gray-600"
          {...register("title", { required: true })}
        />
        <label>Slug</label>
        <Input
          text={post?.slug || ""}
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          disabled
        />
        <RTE
          label="Content :"
          name="contentParagraph"
          control={control}
          defaultValue={
            post?.contentParagraph ||
            post?.content ||
            getValues("contentParagraph") ||
            "Hello World!"
          }
        />
      </div>
      <div className="w-1/3 px-2">
        <label>Image</label>
        <Input
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
          // {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.coverImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-700" : undefined}
          className="w-full"
          text={post ? "Update" : "Submit"}
        ></Button>
      </div>
    </form>
  );
}
