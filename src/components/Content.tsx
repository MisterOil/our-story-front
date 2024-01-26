import {
  Card,
  Typography,
  Grid,
  CardContent,
  CardMedia,
  useMediaQuery,
  Box,
  Input,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Story } from "../type/type";
import React, { useState } from "react";
import { updateStory } from "../services/apiServices";
import theme from "../theme/theme";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { fetchStories } from "../slices/storySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

interface ContentProps {
  story: Story;
  onImageClick: (data: string) => void;
}
const Content: React.FC<ContentProps> = ({ story, onImageClick }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [storys, setStorys] = useState<Story>(story);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [saveErr, setSaveErr] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(story.title);
  const [desValue, setDesValue] = useState<string>(story.description);
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const dispatch = useDispatch<AppDispatch>();

  const updateStories = async (data: Story) => {
    await updateStory("storys", data);
  };

  const handleUpdate = async () => {
    setOpenBackdrop(true);
    setIsEdit(false);
    try {
      await updateStories(storys);
      setOpenBackdrop(false);
      dispatch(fetchStories());
    } catch(e) {
      setOpenBackdrop(false);
      setSaveErr(true);
    }
  };

  const handleUpdateTextTitle = () => {
    setStorys((prevState) => ({ ...prevState, title: titleValue }));
  };

  const handleUpdateTextDes = () => {
    setStorys((prevState) => ({ ...prevState, description: desValue }));
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={storys.id}
      textAlign={"center"}
      sx={{ my: 4 }}
    >
      <Card
        elevation={8}
        sx={{ m: 4, height: "100%", maxHeight: "100%", overflow: "hidden" }}
      >
        <CardMedia
          sx={{
            maxHeight: !isSmallScreen ? "520px" : "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={storys.image_data}
            alt={storys.title}
            onClick={() => onImageClick(storys.image_data)}
            style={{ width: "100%", padding: "5%" }}
          />
        </CardMedia>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "15px",
          }}
        >
          {!isEdit ? (
            <EditSharpIcon
              fontSize="small"
              sx={{ marginRight: "5%", cursor: "pointer" }}
              onClick={() => setIsEdit(!isEdit)}
            />
          ) : (
            <>
              <CloseIcon
                sx={{ marginRight: "5%", cursor: "pointer" }}
                color="error"
                onClick={() => {
                  setIsEdit(!isEdit);
                  dispatch(fetchStories());
                }}
              />
              <CheckIcon
                onClick={() => handleUpdate()}
                color="success"
                sx={{ cursor: "pointer" }}
              />
            </>
          )}
        </Box>
        {!isEdit ? (
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {storys.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {storys.description}
            </Typography>
          </CardContent>
        ) : (
          <CardContent>
            <Box>
              <Input
                value={titleValue}
                sx={{ ".MuiInputBase-input": { textAlign: "center" } }}
                onBlur={() => handleUpdateTextTitle()}
                onChange={(e) => setTitleValue(e.target.value)}
              />
            </Box>
            <Box>
              <Input
                value={desValue}
                sx={{ ".MuiInputBase-input": { textAlign: "center" } }}
                onBlur={() => handleUpdateTextDes()}
                onChange={(e) => setDesValue(e.target.value)}
              />
            </Box>
          </CardContent>
        )}
      </Card>
      <Backdrop
        sx={{
          color: theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={saveErr} onClose={() => setSaveErr(false)}>
        <DialogTitle color={"red"}>{"Error cannot save data."}</DialogTitle>
        <DialogContent>
          <DialogContentText>Error cannot save data.</DialogContentText>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Content;
