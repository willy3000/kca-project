import React from "react";
import {
  Dialog,
  Typography,
  Box,
  Paper,
  
} from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


export default function Remarks(props) {
  const { remarksOpen, setRemarksOpen, remarks, setRemarks } = props;

  const handleRemarksClose = () => {
    setRemarksOpen(false);
    setRemarks([])
  };


  return (
    <Dialog open={remarksOpen} onClose={handleRemarksClose}>
      <Box
        sx={{
          margin: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px",
          width: "450px",
        }}
      >
        <HistoryEduIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Supervisors Remarks
        </Typography>
        <Box
          sx={{ marginTop: 1, width: "100%" }}
        >

            {remarks.map((remark) => 
            <Paper elevation={24}
            sx={{padding: '15px', margin: '5px'}}
            >
                <Box sx={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                }}>
                <Typography variant='h9' sx={{margin: '7px'}}>{remark}</Typography>
                </Box>
            </Paper>
            )}

        </Box>
      </Box>
    </Dialog>
  );
}