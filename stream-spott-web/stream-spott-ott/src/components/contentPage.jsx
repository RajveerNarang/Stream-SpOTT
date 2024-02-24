import React, { useState, useEffect } from "react";
import ContentItem from "./contentItem";
import SearchComponent from "./searchComponent";
import Loader from "../components/loader"; // Import Loader component
import "../components/content.css";
import { useLocation, useNavigate } from "react-router-dom"; // Import useHistory hook
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const ContentPage = () => {
  const storage = getStorage();
  const [originalFiles, setOriginalFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if the theme preference is stored in local storage
    const storedTheme = localStorage.getItem("theme");
    // If the theme preference is stored, parse it to a boolean value
    // Otherwise, default to false (light mode)
    return storedTheme ? JSON.parse(storedTheme) : false;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state ? location.state.username : "";

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("User logged out");
    navigate("/login", { isLoggedIn });
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Store the updated theme preference in local storage
      localStorage.setItem("theme", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const storageRef = ref(storage, "vids");
        const files = await listAll(storageRef);

        const fileArray = await Promise.all(
          files.items.map(async (file) => {
            const url = await getDownloadURL(file);
            return { type: "video", source: url, title: file.name };
          })
        );

        setOriginalFiles(fileArray); // Update originalFiles
        setFileList(fileArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error.message);
      }
    };

    fetchFiles();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      // If query is empty, reset to original file list
      setFileList(originalFiles);
      return;
    }

    const filteredFiles = originalFiles.filter((file) =>
      file.title.toLowerCase().includes(query.toLowerCase())
    );
    setFileList(filteredFiles);
  };

  return (
    <div
      className={
        isDarkMode ? "content-page dark-mode" : "content-page white-ctn"
      }
    >
      <h1 className="stream-heading">Stream SpOTT</h1>
      <div
        // className={`theme-toggler ${!isDarkMode ? "white-ctn" : ""}`}
        className="theme-toggler"
        style={{ backgroundColor: !isDarkMode ? "white" : "black" }}
        onClick={toggleTheme}
      >
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </div>
      <button className="logout-button theme-toggler" onClick={handleLogout}>
        Logout
      </button>
      <SearchComponent handleSearch={handleSearch} />

      <div className={`user-greeting ${!isDarkMode ? "white-text" : ""}`}>
        Hi{" "}
        {username
          ? username.charAt(0).toUpperCase() + username.slice(1)
          : "Admin"}
      </div>

      <div className="content-grid">
        {isLoading ? (
          <Loader />
        ) : (
          fileList.map((file, index) => (
            <ContentItem key={index} source={file} />
          ))
        )}
      </div>
    </div>
  );
};

export default ContentPage;
