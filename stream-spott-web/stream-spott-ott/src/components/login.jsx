import React, { useState, useEffect } from "react";
import Carousel from "../components/carousel";
import { useNavigate } from "react-router-dom"; // useNavigate from react-router-dom
import "../components/login.css"; // Import your CSS file here
import { db } from "../assets/firebase"; // Import Firebase auth and firestore
import {
  doc,
  getDocs,
  query,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Create a history object
  const [join, setIsJoining] = useState(false); // State to track login status

  // useEffect to check local storage for login status on component mount
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus && storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // console.log("hello");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log("hello2");
  };

  const handleJoin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password.");
      return;
    }

    try {
      // Check if the user with the given username already exists
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        alert("Username already exists. Please choose another username.");
        return;
      }

      setIsJoining(true); // Set the state to indicate the user is joining

      // Create a new user with email and password
      // const auth = getAuth();
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   `${username}@example.com`,
      //   password
      // );

      // Access the user object
      // const user = userCredential.user;

      // Update the user's display name (optional)
      // await updateProfile(user, { displayName: username });

      // Add user data to Firestore
      const usersCollection = collection(db, "users");
      await addDoc(usersCollection, {
        username: username,
        password: password,
        // Add other user-related fields...
      });

      // Signup successful
      console.log("User signed up:");

      // Navigate to the content page or any other page as needed
      navigate("/UserLogContentPage", { state: { isLoggedIn: true } });
    } catch (error) {
      // Handle signup errors
      console.error("Signup failed:", error.message);
    }

    // Clear input fields after submission (optional)
    setUsername("");
    setPassword("");
    setIsJoining(false); // Reset the state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("hello3");

    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password.");
      console.log("empty");
      return;
    }
    // // Simulate login process (replace with your actual authentication logic)
    if (username === "admin" && password === "admin") {
      // Successful login, redirect or perform necessary actions
      console.log("Login successful!");
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/UserLogContentPage", { state: { isLoggedIn: true } }); // Navigate to '/UserLogContentPage' with isLoggedIn state
    } else {
      try {
        // const usersRef = doc(db, "users");
        const usersRef = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        const userQuerySnapshot = await getDocs(usersRef);

        if (!userQuerySnapshot.empty) {
          // User with the provided username exists, now check the password
          const userDoc = userQuerySnapshot.docs[0];
          const userPassword = userDoc.data().password;

          if (userPassword === password) {
            // Passwords match, login successful

            console.log("Login successful!");
            setIsLoggedIn(true);

            localStorage.setItem("isLoggedIn", "true");
            const authenticatedUsername = userDoc.data().username;
            console.log(authenticatedUsername);

            navigate("/UserLogContentPage", {
              state: { isLoggedIn: true, username: authenticatedUsername },
            }); // Navigate to '/UserLogContentPage' with isLoggedIn state
            return true;
          } else {
            // Passwords do not match, login failed
            console.log("Invalid password. Please try again.");
            alert("Invalid password. Please try again.");
            return false;
          }
        } else {
          // No user found with the provided username
          console.log("User not found. Please check your username.");
          alert("User not found. Please check your username.");
          return false;
        }
      } catch (error) {
        console.error("Error checking user credentials:", error.message);
        return false;
      }
      //       else{

      //          // Failed login
      // alert("Invalid username or password. Please try again.");
      //       }
    }
  };
  // // Clear input fields after submission (optional)

  return (
    <div className="container">
      <div className="carousel">
        {/* Carousel content (images, videos, etc.) goes here */}
        <Carousel />
      </div>
      <h1 className="page-heading">Stream SpOTT</h1>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">Login</button>
          <button type="button" onClick={handleJoin} disabled={join}>
            {join ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* Carousel to be checked (images, videos, etc.) goes here */}
    </div>
  );
}

export default Login;
