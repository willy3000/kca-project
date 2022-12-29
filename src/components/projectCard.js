import React from "react";
import { Avatar, Box, Paper, IconButton, Typography, Tooltip, Chip } from "@mui/material";
import { CircularProgressWithLabel } from "../constants";
import CodeIcon from "@mui/icons-material/Code";
import AdbIcon from "@mui/icons-material/Adb";
import AppleIcon from "@mui/icons-material/Apple";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { StyledTableCell } from "../constants";
import { StyledTableRow } from "../constants";
import TableHead from '@mui/material/TableHead';
import { Link } from "react-router-dom";





export default function ProjectCard(props) {
  const { project } = props;


  const getProgress = () => {
    let count = 0
    let percentage = 0
    if (project.documents.proposal.documentUrl){
      count = count+1
    }
    if (project.documents.srs.documentUrl){
      count = count+1
        }
    if (project.documents.sds.documentUrl){
      count = count+1
    }
    if (project.documents.final.documentUrl){
      count = count+1
    }

    if(count>0){
      percentage = (count/4) * 100
    }

    console.log(percentage)

    return percentage
  }


  return (


        <Paper elevation={24}  sx={{display: 'flex', alignItems: 'center', maxWidth: '1800px', justifyContent: 'space-between', margin: '25px', padding: '25px', borderRadius: '3ch', borderColor: 'primary'}} key={project.id}>
          <Box sx={{display: 'flex', gap: '5px', alignItems: 'center'}}>
          {project.technology === 'android' && <IconButton sx={{boxShadow: 8, padding: "15px", color: 'green'}}><AdbIcon/></IconButton>}
          {project.technology === 'web' && <IconButton sx={{boxShadow: 8, padding: "15px", color: 'orange'}}><CodeIcon/></IconButton>}
          {project.technology === 'ios' && <IconButton sx={{boxShadow: 8, padding: "15px", color: 'grey'}}><AppleIcon/></IconButton>}
          </Box>

          <Chip label={project.name} color='primary'></Chip>

          <Box sx={{display: 'flex', gap: '7px', justifyContent: 'flex-end'}}>
                <CircularProgressWithLabel value={getProgress()}/>
            </Box>

            <Box sx={{display: 'flex', gap: '7px', justifyContent: 'flex-end'}}>
                <Tooltip title="view project details">
                  <Link to={`/projects/${project.id}`}>
                  <IconButton>
                  <ArrowForwardIosIcon/>
                  </IconButton>
                  </Link>
                </Tooltip>
              </Box>
        </Paper>

        
  )
}

// {project.technology === 'android' && <IconButton sx={{boxShadow: 8, padding: "15px", color: 'green'}}><AdbIcon/></IconButton>}
// {project.technology === 'web' && <IconButton sx={{boxShadow: 8, padding: "15px", color: 'orange'}}><CodeIcon/></IconButton>}
// {project.technology === 'ios' && <IconButton sx={{boxShadow: 8, padding: "15px", color: 'grey'}}><AppleIcon/></IconButton>}
// <Typography variant='h5'>{project.name}</Typography>
// <CircularProgressWithLabel value={Math.floor(Math.random() * 100) + 1}/>