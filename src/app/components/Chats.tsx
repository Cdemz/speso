"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import Image from "next/image";

const Chats = () => {
  const [chats, setChats] = useState<any[]>([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext)!; // Use '!' to assert that dispatch is not null or undefined

  useEffect(() => {
    const getChats = () => {
      if (currentUser) {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            const data = doc.data();
            if (data) {
              setChats(Object.entries(data));
            }
          }
        );

        return () => {
          unsub();
        };
      }
    };

    currentUser && getChats();
  }, [currentUser]);

  const handleSelect = (u: any) => {
    if (dispatch) {
      dispatch({ type: "CHANGE_USER", payload: u });
    }
  };

  return (
    <div className="chats">
      {chats
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <Image
              src={chat[1].userInfo?.photoURL || "/shaolin.jpg"}
              alt=""
              height={50}
              width={50}
            />
            <div className="userChatInfo">
              <span>{chat[1].userInfo?.displayName || "Guest"}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
