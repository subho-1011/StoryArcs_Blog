import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite.url)
      .setProject(conf.appwrite.projectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, coverImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwrite.databaseId,
        conf.appwrite.collectionId,
        ID.unique(),
        // TODO: all slug should be unique
        {
          title,
          content,
          coverImage,
          status,
          userId,
          slug
        }
      );
    } catch (err) {
      console.error("Appwrite Error:: createPost : ", err);
    }
  }

  async updatePost(slug, { title, content, coverImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwrite.databaseId,
        conf.appwrite.collectionId,
        slug,
        {
          title,
          content,
          coverImage,
          status,
        }
      );
    } catch (err) {
      console.error("Appwrite Error:: updatePost : ", err);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwrite.databaseId,
        conf.appwrite.collectionId,
        slug
      );
      return true;
    } catch (err) {
      console.error("Appwrite Error:: deletePost : ", err);
      return false;
    }
  }

  async getPost(id) {
    console.log();
    try {
      return await this.databases.getDocument(
        conf.appwrite.databaseId,
        conf.appwrite.collectionId,
        id
      );
    } catch (err) {
      console.error("Appwrite Error:: getPost : ", err);
    }
  }

  async getPosts() {
    // console.log("call getPosts");
    try {
      return await this.databases.listDocuments(
        conf.appwrite.databaseId,
        conf.appwrite.collectionId,
        [Query.equal("status", "active")]
      );
    } catch (err) {
      console.error("Appwrite Error:: getPosts : ", err);
    }
  }

  // file upload service
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwrite.bucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.error("Appwrite Error:: uploadFile : ", err);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(conf.appwrite.bucketId, fileId);
    } catch (err) {
      console.error("Appwrite Error:: deleteFile : ", err);
    }
  }

  getFilePreview(fileId) {
    if (!fileId) return null;
    return this.storage.getFilePreview(conf.appwrite.bucketId, fileId);
  }
}

const service = new Service();
export default service;
