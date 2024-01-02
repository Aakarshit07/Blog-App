import config from "../conf/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    // create post services
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage, 
                    status, 
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // update post services
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage, 
                    status, 
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // delete post services
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // get post services
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // get all/list of posts services
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error.message);
            return false;
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    //file delete service
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFalse :: error", error);
            return false;
        }
    }

    //preview file
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

}


const service = new Service()
export default service; 