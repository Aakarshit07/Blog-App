/* eslint-disable no-useless-catch */
import config from "../conf/config.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        //services
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);

    }

    // wrapped all this in createAccount method so that in future i like to use firebase or anyother service i just need to change stuff inside this function and constructor's services
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                // call another methods
                // we are calling login so that when user is created it just login directly 
                return this.login({email, password})
            } 
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
            //  if user already has account here it allows to login 
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        // if our try catch fails somehow we return null/ or when we get nothing in out this.account.get()
        return null;
    }

    async logout() {
        try {
            //logout all the sessions of a user
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: Logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;