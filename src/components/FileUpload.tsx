import React, { ChangeEvent, useState } from "react";
import { saveStory } from "../services/apiServices";
import { fetchStories } from "../slices/storySlice";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { getBase64 } from "../utils";
import theme from "../theme/theme";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";

interface Props {
  handleCloseModal: () => void;
}
const FileUpload: React.FC<Props> = ({ handleCloseModal }) => {
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [fileError, setFileError] = useState<boolean>(false);
  const [base64File, setBase64File] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [saveErr, setSaveErr] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      getBase64(selectedFile, (result) => {
        setBase64File(result?.toString() ?? "");
      });
      setFile(selectedFile);
    } else {
      console.warn("Invalid file type. Please select an image.");
      setFile(null);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      console.warn("Please fill in all required fields.");
      !file ? setFileError(true) : setFileError(false);
      !title ? setTitleError(true) : setTitleError(false);
      !description ? setDescriptionError(true) : setDescriptionError(false);

      return;
    }

    try {
      setOpenBackdrop(true);
      await saveStory("storys", {
        image_data: base64File,
        title,
        description,
      });
      setFile(null);
      setOpenBackdrop(false);
      dispatch(fetchStories());
      handleCloseModal();
    } catch (error) {
      setOpenBackdrop(false);
      setSaveErr(true);
    }
  };

  return (
    <>
      <Paper square={false} sx={{ width: "100%" }} elevation={24}>
        <FormControl
          sx={{
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: "12%",
            width: "75%",
          }}
        >
          <TextField
            label={"Title"}
            id="title"
            type="text"
            value={title}
            error={titleError}
            onChange={handleTitleChange}
            required
            helperText={titleError ? "This field is required" : null}
            variant="standard"
          />
        </FormControl>

        <FormControl
          sx={{
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: "12%",
            width: "75%",
          }}
        >
          <TextField
            label={"description"}
            id="description"
            type="text"
            value={description}
            error={descriptionError}
            onChange={handleDescriptionChange}
            required
            helperText={descriptionError ? "This field is required" : null}
            variant="standard"
            multiline
          />
        </FormControl>

        <FormControl
          sx={{
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: "12%",
            width: "75%",
          }}
        >
          <TextField
            id="file-upload"
            type="file"
            error={fileError}
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            variant="standard"
            required
            helperText={fileError ? "Image is required" : null}
          />
        </FormControl>
        <FormControl
          sx={{
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: "10%",
            width: "75%",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </FormControl>
      </Paper>
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
    </>
  );
};

export default FileUpload;
