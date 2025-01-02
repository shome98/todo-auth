"use client";
import { Provider } from "react-redux";
import store from "./store/store";
import { ReactNode } from "react";

interface WrapperProps{
    children:ReactNode;
}
export default function Wrapper({children}:WrapperProps){
    return (<Provider store={store}>{children}</Provider>)
}