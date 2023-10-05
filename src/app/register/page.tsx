"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Check if the user is not logged in and redirect to the login page
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const displayName = (e.currentTarget[0] as HTMLInputElement).value;
    const email = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[2] as HTMLInputElement).value;
    const fileInput = e.currentTarget[3] as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            router.push("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } else {
      // Handle the case when no file is selected
      console.error("No file selected for upload");
      setLoading(false);
    }
  };

  return (
    <div className="formContainer bg-[var(--color-bg)] h-100vh flex items-center justify-center">
      <div className="formWrapper bg-white py-[20px] px-[60px] border-r-[10px] flex flex-col gap-3 items-center">
        <span className="logo">
          <Image src="/Speso-Text-1.png.webp" alt="" height={300} width={300} />
        </span>
        <span className="title text-lg text-[var(--color-text)]">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            type="text"
            placeholder="display name"
            className="text-[var(--color-text)]"
          />
          <input
            required
            type="email"
            placeholder="email"
            className="text-[var(--color-text)]"
          />
          <input
            required
            type="password"
            placeholder="password"
            className="text-[var(--color-text)]"
          />
          <input
            required
            type="file"
            id="file"
            className="text-[var(--color-text)]"
          />
          <label
            htmlFor="file"
            className="flex items-center gap-3 bg-[var(--color-primary)] text-lg cursor-pointer"
          >
            <BsFillPersonFill size={30} />
            <span>Add an avatar</span>
          </label>
          <button
            disabled={loading}
            className="bg-[var(--color-primary-variant)]"
          >
            Sign up
          </button>
          <div
            className="text[(--color-text
          )]"
          >
            {loading && "Uploading and compressing the image please wait..."}
            {err && <span>Something went wrong</span>}
          </div>
        </form>
        <p className="text-[var(--color-text)]">
          You do have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
