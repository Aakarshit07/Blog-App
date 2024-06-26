
import React, { useCallback } from 'react'
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "../index"
import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function PostForm({ post }) {
    const  { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const handleSlugInput = (e) => {
        const transformedSlug = slugTransform(e.currentTarget.value);
        setValue("slug", transformedSlug, { shouldValidate: true });
    } 

    const submit = async (data) => {
        if(post) {
            const file = data.image && data.image[0] ?
            await appwriteService.uploadFile(data.image[0]) 
            : null;
           
            if(file) {
                appwriteService.deleteFile(post?.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post?.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
            } 

        } else {
            const file = data.image && data.image[0] ?
            await appwriteService.uploadFile(data.image[0])
            : null;
            
            if(file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
            }

            const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,
            });

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            const trimmedSlug = value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")  // Replace spaces with hyphens
                .replace(/^-+|-+$/g, "")  // Remove hyphens at the beginning or end
                .replace(/[^a-zA-Z0-9.\-_]/g, '') // Additional: Remove invalid characters
            
            return trimmedSlug.substring(0, 36);
        }
        return "";    
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if(name === "title") {
                setValue("slug", slugTransform(value.title,
                    {shouldValidate: true}));
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col items-center md:flex-row sm:items-start sm:flex-row">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={handleSlugInput}
            />
            <p className=" text-amber-600 mt-0 mb-2 text-left">*Slug can be of at most 36 characters.*</p>
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 p-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["Active", "Inactive"]}
                label="Status"
                className="mb-4 w-full"
                {...register("status", { required: true })}
            />
            <Button type="submit" 
                bgColor={post ? "bg-green-500"
                : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  );
}
