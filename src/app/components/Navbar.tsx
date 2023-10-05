import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Image from "next/image";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  // Check if currentUser is null or undefined and provide default values or handle the case
  const photoURL = currentUser?.photoURL || "/shaolin.jpg";
  const displayName = currentUser?.displayName || "Guest";

  return (
    <div className="nav  flex i items-center h-[50px] p-[10px] justify-between gap-2 bg-[var(--color-bg-variant)]">
      <span className="logo">
        <Image
          src="/Speso-Text-1.png.webp"
          alt=""
          height={300}
          width={300}
          className=" h-[20px] w-[50px]"
        />
      </span>
      <div className="user flex">
        <Image
          src={photoURL}
          alt=""
          width={300}
          height={300}
          className="h-[24px] w-[24px] rounded-[50%] object-cover"
        />
        <span className="text-xs">{displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="pointer bg-[var(--color-primary-variant)] px-1 py-1 rounded-md  md:absolute md:bottom-4 text-xs "
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
