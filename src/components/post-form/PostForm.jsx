import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Select, Button, Input, RTE } from "../../components";

export default function PostForm({ post }) {
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm({
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "draft",
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      console.log(data);
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) appwriteService.deleteFile(file.coverImage);

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        coverImage: file ? file.$id : undefined,
      });
      if (dbPost) navigate(`/post/${dbPost.slug}/${dbPost.$id}`);
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileID = file.$id;
        data.coverImage = fileID;
      }
      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
      });
      if (dbPost) navigate(`/post/${dbPost.slug}/${dbPost.$id}`);
    }
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
  }, [watch,post, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          text={post?.title || ""}
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          text={post?.slug || ""}
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={post?.content || getValues("content") || "Hello World!"}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
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
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          text={post ? "Update" : "Submit"}
        ></Button>
      </div>
    </form>
  );
}
