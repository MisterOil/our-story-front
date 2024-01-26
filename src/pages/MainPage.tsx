import {
  Grid,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../slices/storySlice";
import { Content, Header } from "../components";
import { useEffect, useState } from "react";

import { Story } from "../type/type";

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.stories);
  const [onOpenImage, setOnOpenImage] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<string>("");

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const onImageClick = (data: Story["image_data"]) => {
    setOnOpenImage(true);
    setShowImage(data);
  };

  const onImageClose = () => setOnOpenImage(false);

  return (
    <>
      <Header />
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {status === "succeeded" && (
        <Grid container spacing={2}>
          {data.map((story: Story) => (
            <Content story={story} key={story.id} onImageClick={onImageClick} />
          ))}
        </Grid>
      )}
      <Dialog open={onOpenImage} onClose={onImageClose}>
        <DialogContent>
          <DialogContentText>
            <img
              src={showImage}
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog open={status === "failed"}>
        <DialogTitle color={'red'}>{"Error fetching data"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Error fetching data. Please refresh page.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MainPage;
