import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite.url)
      .setProject(conf.appwrite.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const account = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (!account) return null;
      // return account
      // login account after create
      return await this.login({ email, password });
    } catch (err) {
      console.error("Appwrite Error:: createAccount : ", err);
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      const account = await this.account.createEmailSession(email, password);
      if (!account) return null;
      return account;
    } catch (err) {
      console.error("Appwrite Error:: login : ", err);
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.error("Appwrite Error:: getCurrentUser : ", err);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (err) {
      console.error("Appwrite Error:: logout : ", err);
    }
  }
}

const authService = new AuthService();

export default authService;
