"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "firebase/auth";

interface ChatContextState {
  chatId: string;
  user: User;
}

type ChatAction = {
  type: "CHANGE_USER";
  payload: User;
};

interface ChatContextValue {
  data: ChatContextState;
  dispatch: React.Dispatch<ChatAction>;
}

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextValue | undefined>(
  undefined
);

const INITIAL_STATE: ChatContextState = {
  chatId: "null",
  user: {} as User,
};

const chatReducer = (
  state: ChatContextState,
  action: ChatAction
): ChatContextState => {
  switch (action.type) {
    case "CHANGE_USER":
      return {
        user: action.payload,
        chatId:
          state.user.uid > action.payload.uid
            ? state.user.uid + action.payload.uid
            : action.payload.uid + state.user.uid,
      };
    default:
      return state;
  }
};

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(chatReducer, {
    ...INITIAL_STATE,
    user: currentUser || ({} as User),
  });

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
