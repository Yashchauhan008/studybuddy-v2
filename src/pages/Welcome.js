// import React, { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
// import { base_url } from "../utils/baseUrl";
// import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

// const Welcome = () => {
//   const { user } = useKindeAuth();
//   console.log(user);
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [name, setName] = useState(user?.family_name || ""); // Use optional chaining and provide a default value
//   const [email] = useState(user.email); // Assuming email is read-only
//   const [profileUrl, setProfileUrl] = useState(user.picture);
//   const [role] = useState("student"); // Assuming role is fixed
//   const [workplace, setWorkplace] = useState("");
//   const [loading, setLoading] = useState(true); // Loader state

//   useEffect(() => {
//     const checkEmail = async () => {
//       try {
//         const response = await fetch(`${base_url}/user`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await response.json();
//         const existingUser = data.find((u) => u.email === email);

//         if (existingUser) {
//           // Email exists, navigate to the user's page with the username
//           setUsername(existingUser.username); // Set the username
//           navigate(`/auth/${existingUser.username}`);
//         } else {
//           // Email doesn't exist, allow the user to fill in details
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoading(true); // Allow user to fill in details if there's an error
//       }
//     };

//     checkEmail();
//   }, [email, navigate]);

//   const handleWelcome = async () => {
//     // Check if any field is empty
//     if (!username || !name || !profileUrl || !workplace) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await fetch(`${base_url}/user/new`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           name,
//           email,
//           profileUrl,
//           role,
//           workplace,
//         }),
//       });

//       const responseData = await response.json(); // Assuming the server responds with JSON

//       if (response.ok) {
//         console.log("User added successfully");
//         navigate(`/auth/${username}`);
//       } else {
//         // Handle specific error messages from backend
//         if (responseData.message === "Username already exists") {
//           alert("Username already exists. Please choose a different one.");
//         } else if (responseData.message === "Email already exists") {
//           alert("Email already exists. Please use a different email.");
//         } else if (responseData.message === "Username and email are required") {
//           alert("Please fill in both username and email fields.");
//         } else if (responseData.message === "Invalid role") {
//           alert("Invalid role specified.");
//         } else {
//           alert("Failed to add user. Please try again later.");
//         }
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to add user. Please try again later.");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loader while checking email
//   }

//   return (
//     <>
//       <h1>This page only appears once after account is created</h1>
//       <div>Welcome</div>

//       <div>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Email:
//           <input type="email" value={email} readOnly />
//         </label>
//       </div>
//       <div>
//         <label>
//           Profile Picture URL:
//           <input
//             type="text"
//             value={profileUrl}
//             onChange={(e) => setProfileUrl(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Workplace:
//           <input
//             type="text"
//             value={workplace}
//             onChange={(e) => setWorkplace(e.target.value)}
//           />
//         </label>
//       </div>

//       <button onClick={handleWelcome}>Let's go</button>
//     </>
//   );
// };

// export default Welcome;