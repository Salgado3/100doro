import { account, OAuthProvider } from './appwrite';

export const userAuth = {
  register: async () => {
    try {
      account.createOAuth2Session(
        OAuthProvider.Discord
        // 'http://localhost:5173',
        // 'http://localhost:5173/',
        // ['identify', 'guild']
      );
    } catch (error) {
      console.error('Discord Login error', error);
    }
  },
  getUser: async () => {
    try {
      return account.get();
    } catch (error) {
      console.error('Session error', error);
    }
  },
  getSession: async () => {
    return await account.getSession('current');
  },

  // getDiscordData: async () => {
  //   try {
  //     const session = await account.getSession('current');
  //     const { providerAccessToken } = session;
  //   } catch (error) {}
  // },

  logout: async () => {
    try {
      account.deleteSession('current');
    } catch (error) {
      console.error('Logout error', error);
    }
  },
};
