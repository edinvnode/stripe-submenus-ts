import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";

// Define types for context values
interface Link {
  label: string;
  icon?: React.ReactNode; // Made optional
  url: string;
}

interface Page {
  page: string;
  links: Link[];
}

interface Location {
  center: number;
  bottom: number;
}

interface GlobalContext {
  isSubmenuOpen: boolean;
  location: Location;
  page: Page | null; // Allow null
}

const Submenu: React.FC = () => {
  const { isSubmenuOpen, location, page } =
    useGlobalContext() as unknown as GlobalContext; // Use 'unknown' first, then cast to 'GlobalContext'

  const container = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<string>("col-2");

  useEffect(() => {
    setColumns("col-2");
    const submenu = container.current;

    if (submenu && page) {
      // Ensure submenu exists and page is not null
      const { center, bottom } = location;
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      if (page.links.length === 3) {
        setColumns("col-3");
      } else if (page.links.length > 3) {
        setColumns("col-4");
      }
    }
  }, [location, page]);

  if (!page) return null; // Handle the case where `page` is null

  return (
    <aside
      className={`${isSubmenuOpen ? "submenu show" : "submenu"}`}
      ref={container}
    >
      <h4>{page.page}</h4>
      <div className={`submenu-center ${columns}`}>
        {page.links.map((link, index) => {
          const { label, icon, url } = link;
          return (
            <a key={index} href={url}>
              {icon && <span>{icon}</span>}
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Submenu;
