import React, { createContext, useContext, useState } from "react";

import {
  makeAuthenticatedRequest,
  makeAxiosPostRequest,
} from "../utils/axiosUtils";
interface AuthProviderProps {
  children: React.ReactNode;
}

export interface loggedUser {
  name?: string;
  id: string;
  profileUrl?: string;
  blogCount?: number;
  email?: string;
}

// Create the AuthContext

const AuthContext = createContext<any>(null);

// Create a custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<loggedUser | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  // Sign in logic
  const signUp = async (name: string, email: string, password: string) => {
    console.log("singup func", email);

    const data = await makeAxiosPostRequest(
      `https://techdome-backend-production.up.railway.app/signup`,
      {
        username: name,
        email,
        password,
        profileUrl:
          "https://st4.depositphotos.com/3864435/27060/i/450/depositphotos_270605520-stock-photo-default-avatar-profile-icon-grey.jpg",
      }
    );
    console.log(data);
    window.location.href = "/auth/login";
  };

  // Log in logic
  const logIn = async (email: string, password: string) => {
    const data = await makeAxiosPostRequest(
      "https://techdome-backend-production.up.railway.app/login",
      {
        email,
        password,
      }
    );
    console.log("loggedUser Data", data);
    setJwtToken(data.user.token);
    setCurrentUser({ id: data.user.userId as string });
    if (currentUser) {
      console.log(currentUser.id);
    }

    try {
      const jwtToken = data.user.token;
      const id = data.user.userId;

      const userData = await makeAuthenticatedRequest(
        `https://techdome-backend-production.up.railway.app/get-user/${id}`,
        {},
        "GET",
        jwtToken
      );
      console.log("got User", userData.data.email);
      setCurrentUser((prevUser) => {
        return {
          ...prevUser,
          id: userData.data.id,
          name: userData.data.name,
          email: userData.data.email,
          profileUrl: userData.data.profileUrl,
          blogCount: userData.data.blogCount,
        };
      });
    } catch (error) {
      // Handle error if the second request fails
      console.log("Error retrieving user data:", error);
    }
  };

  // Sign out logic
  const signOut = () => {
    setCurrentUser(null);
    window.location.href = "/home";
  };

  // Get the current user
  const getCurrentUser = () => {
    // Implement your logic to get the current user here
    return currentUser;
  };

  const updateCurrentUser = (updatedUser: Partial<loggedUser>) => {
    setCurrentUser((prevUser) => ({
      ...(prevUser as loggedUser),
      ...updatedUser,
    }));
  };

  // Create the auth context value
  const authContextValue = {
    signUp,
    logIn,
    signOut,
    getCurrentUser,
    jwtToken,
    updateCurrentUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
