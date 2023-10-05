"use client";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useRouter } from "next/navigation"; // Import from "next/router" instead of "next/navigation"
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Check if the user is not logged in and redirect to the login page
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
