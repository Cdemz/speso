"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Specify the event type
    e.preventDefault();
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer bg-[var(--color-bg)] h-100vh flex items-center justify-center">
      <div className="formWrapper  bg-white py-[20px] px-[60px] border-r-[10px] flex flex-col gap-3 items-center">
        <span className="logo">
          <Image src="/Speso-Text-1.png.webp" alt="" height={300} width={300} />
        </span>
        <span className="title text-lg text-[var(--color-text)]">Login</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="text-[var(--color-text)]"
          />
          <input
            type="password"
            placeholder="password"
            className="text-[var(--color-text)]"
          />
          <button className="bg-[var(--color-primary-variant)]">Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p className="text-[var(--color-text)]">
          You don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
