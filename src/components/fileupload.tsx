// FileUpload.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { saveStory } from "../services/apiServices";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    getBase64(selectedFile, (result) => {
      return setBase64File(result?.toString() ?? '');
    });
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        console.log(base64File);
        const result = await saveStory("storys", { image_data: base64File, title:'', description:'' });
        console.log("Upload successful", result);
      } catch (error) {
        console.error("Error uploading file", error);
      }
    } else {
      console.warn("No file selected");
    }
  };

  return (
    <div>
      <Typography variant="h6">File Upload</Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
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

const base64ToArrayBuffer = (base64: string) => {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const arrayBufferToBase64 = (buffer: ArrayBufferLike) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export default FileUpload;
