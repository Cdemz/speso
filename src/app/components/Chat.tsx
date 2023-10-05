"use client ";
import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import Image from "next/image";
import { BsPersonFillAdd } from "react-icons/bs";
import { BiSolidVideo } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";

const Chat = () => {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    // Handle the case where the context is not available (undefined)
    return null;
  }

  const { data } = chatContext;

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <BiSolidVideo />
          <BsPersonFillAdd />
          <CiMenuKebab />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
