// src/utils/usercontext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define the user details interface
export interface UserDetails {
  id: string | null;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

// Define the context value interface
export interface UserContextType {
  userDetails: UserDetails;
  updateUserDetails: (details: Partial<UserDetails>) => void;
  clearUserDetails: () => void;
}

// Create initial state
const initialUserState: UserDetails = {
  id: null,
  username: '',
  email: '',
  isAuthenticated: false,
};

export const UserContext = createContext<UserContextType | null>(null);

// Create a provider component
export function UserProvider({ children }: { children: ReactNode }) {
  // Load user details from localStorage if available
  const [userDetails, setUserDetails] = useState<UserDetails>(() => {
    const storedUser = localStorage.getItem('userDetails');
    return storedUser ? JSON.parse(storedUser) : initialUserState;
  });

  // Save user details to localStorage whenever they change
  useEffect(() => {
    if (userDetails.isAuthenticated) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    } else {
      localStorage.removeItem('userDetails');
    }
  }, [userDetails]);

  // Function to update user details (e.g., after login)
  function updateUserDetails(details: Partial<UserDetails>) {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      ...details,
    }));
  }

  // Function to clear user details (e.g., after logout)
  function clearUserDetails() {
    setUserDetails(initialUserState);
    localStorage.removeItem('userDetails'); // Clear from storage on logout
  }

  // Create the value object
  const value = {
    userDetails,
    updateUserDetails,
    clearUserDetails,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for using the context
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}
