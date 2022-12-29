import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Box, Typography } from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
const fileTypes = ["PDF"];


const Design = () => {

}

function DragDrop(props) {

    const {file, setFile} = props

  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="project_proposal" types={fileTypes} />
  );
}

export default DragDrop;