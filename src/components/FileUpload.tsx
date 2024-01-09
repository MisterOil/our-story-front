import React, { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { saveStory } from "../services/apiServices";
import { fetchStories } from "../slices/storySlice";
import { AppDispatch } from "../store/store";
import theme from "../theme/theme";

interface Props {
  handleCloseModal: () => void;
}
const FileUpload: React.FC<Props> = ({handleCloseModal}) => {
  const [file, setFile] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fileError, setFileError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
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
      await saveStory("storys", {
        image_data: base64File,
        title,
        description,
      });
      setFile(null);
      dispatch(fetchStories());
      handleCloseModal();
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <Paper square={false} sx={{ width: "100%" }} elevation={24}>
      <FormControl
        sx={{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          marginLeft: "12%",
          width: "75%",
        }}
      >
        {/* <InputLabel htmlFor="title" error={titleError} shrink>
          Title
        </InputLabel> */}
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
        {/* <InputLabel htmlFor="description" error={descriptionError} shrink>
          Description
        </InputLabel> */}
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
        {/* <InputLabel htmlFor="file-upload" error={fileError} shrink>Image</InputLabel> */}
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
      {/* {file && (
          <Typography variant="body2" color="textSecondary">
            Selected file: {file.name}
          </Typography>
        )} */}
    </Paper>
  );
};

const getBase64 = (file: any, cb: (a: string | ArrayBuffer | null) => void) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export default FileUpload;
