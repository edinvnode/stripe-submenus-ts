import React, { useState, useContext, ReactNode } from "react";
import sublinks from "./data";

// Define the type for the links in `sublinks`
type Link = {
  label: string;
  url: string;
};

type Sublink = {
  page: string;
  links: Link[];
};

// Define the type for the `location` state
type Coordinates = {
  center: number;
  bottom: number;
};

// Define the context value type
type AppContextType = {
  isSidebarOpen: boolean;
  isSubmenuOpen: boolean;
  location: Coordinates;
  page: Sublink | null;
  openSidebar: () => void;
  closeSidebar: () => void;
  openSubmenu: (text: string, coordinates: Coordinates) => void;
  closeSubmenu: () => void;
};

// Create the context with a default value
export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);

// Define the props type for the provider
type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [location, setLocation] = useState<Coordinates>({
    center: 0,
    bottom: 0,
  });
  const [page, setPage] = useState<Sublink | null>(null);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSubmenu = (text: string, coordinates: Coordinates) => {
    const foundPage = sublinks.find((link) => link.page === text) || null;
    setPage(foundPage);
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSubmenuOpen,
        isSidebarOpen,
        openSubmenu,
        closeSubmenu,
        openSidebar,
        closeSidebar,
        location,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};
