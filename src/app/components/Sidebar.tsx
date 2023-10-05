"use client";
import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="sidebar f flex-1 bg-[var(--color-bg-variant)] relative">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
