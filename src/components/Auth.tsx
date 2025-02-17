import { useEffect, useState } from 'react';
import { userAuth } from '../appwrite/userAuth';

interface User {
  name: string;
  [key: string]: any;
}

export const Auth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await userAuth.getUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={userAuth.logout}>Logout</button>
        </>
      ) : (
        <button onClick={userAuth.register}>Login with Discord</button>
      )}
    </div>
  );
};
