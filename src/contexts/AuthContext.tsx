import { AxiosRequestConfig } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../FireBaseApp';
import { User } from '../models/User';
import AxiosHandler from '../shared/AxiosHandler';
import Loading from '../shared/loading/Loading';

export interface AuthContextType {
  user: User | null;
  setUser(user: User | null): void;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

//For Functional components
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ render: any }> = ({
  children,
  render,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const setUser = (user: User | null) => {
    setCurrentUser(user);
    render({});
  };

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const config: AxiosRequestConfig = {
        params: {
          email: firebaseUser.email,
        },
      };

      AxiosHandler.get(`/get/user`, config)
        .then((res) => {
          if (res && res.data) {
            setUser(res.data);
          }
          setIsLoading(false);
        })
        .catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    user: currentUser,
    setUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {isLoading && <Loading type="bubbles" />}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
