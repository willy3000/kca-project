import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Skeleton } from "@mui/material";
import { Add } from "@mui/icons-material";
import AddProject from "./addProject";
import { useSelector } from "react-redux";
import axios from "axios";
import ProjectCard from "./projectCard";
import { useToasts } from "react-toast-notifications";
import NoItems from "./noItems";





export default function Project() {
  const user = useSelector((state) => state.user.user);
  const [addProjectOpen, setAddProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false)

  const {addToast} = useToasts()

  const getProjects = () => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/api/projects/getProjects/${user.id}`, {timeout: 2000})
      .then((res) => {
        setProjects([...res.data.projects]);
        console.log("project", projects);
      }).catch((err) => {
        if(err.code === 'ECONNABORTED'){
          addToast(err.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      setLoading(false)
  };

  useEffect(() => {
    getProjects()
  }, []);

  return (
    <>
      <Box
        sx={{ padding: "25px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={() => setAddProject(true)}
        >
          Add Project
        </Button>
      </Box>

      {!loading ? (
        projects.length > 0 ?

        <Box sx={{maxWidth: '1800px', margin: 'auto'}}>
        <Box>
          {projects.map((project) => (
            <Box key={project.id}>
              <ProjectCard {...{project}}/>
            </Box>
          ))}
        </Box>
        </Box>

        :
        <Box sx={{margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <NoItems></NoItems>
        </Box>
      ) : (
        <Box>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
        </Box>
      )}

      <AddProject
        {...{ addProjectOpen, setAddProject, getProjects }}
      ></AddProject>

    </>
  );
}
