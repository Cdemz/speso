"use client ";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { BiImageAdd } from "react-icons/bi";
import { GrAttachment } from "react-icons/gr";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null); // Add type annotation

  const { currentUser } = useContext(AuthContext);
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    // Handle the case where the context is not available (undefined)
    return null;
  }

  const { data } = chatContext;

  const handleSend = async () => {
    if (!data.chatId) {
      // Handle the case where data.chatId is undefined or null
      console.error("data.chatId is undefined or null");
      return;
    }

    console.log("Updating document with chatId:", data.chatId);

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error: any) => {
          // Add type annotation
          // TODO: Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("Download URL:", downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid || "", // Add optional chaining
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            console.log("Document updated successfully");
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid, // Add optional chaining
          date: Timestamp.now(),
        }),
      });
      console.log("Document updated successfully");
    }

    if (currentUser?.uid) {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <GrAttachment />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => {
            if (e.target.files) {
              setImg(e.target.files[0]);
            }
          }}
        />
        <label htmlFor="file">
          <BiImageAdd classname="text-black" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
