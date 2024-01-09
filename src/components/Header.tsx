import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import FileUpload from "./FileUpload";

const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontFamily: "Schoolbell, cursive",
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          Our Story
        </Typography>
        <IconButton size="large" onClick={handleOpenModal}>
          <ControlPointOutlinedIcon fontSize="inherit" />
        </IconButton>
        <Modal open={modalOpen} onClose={handleCloseModal} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <FileUpload handleCloseModal={handleCloseModal} />
          </div>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
