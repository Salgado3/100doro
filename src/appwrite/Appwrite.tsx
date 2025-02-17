import { Account, Client, OAuthProvider } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('');

export const account = new Account(client);
export { OAuthProvider };
