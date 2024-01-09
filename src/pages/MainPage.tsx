// MainPage.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FileUpload from "../components/FileUpload";
import Content from "../components/Content";
import Header from "../components/Header";
import { fetchStories } from "../slices/storySlice";
import { AppDispatch } from '../store/store';

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Content />
    </>
  );
}

export default MainPage;
