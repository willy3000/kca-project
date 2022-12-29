import React, {useState, useEffect} from "react";
import {
  Dialog,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Typography,
  Autocomplete,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useSelector } from "react-redux";
import CodeIcon from "@mui/icons-material/Code";
import AdbIcon from "@mui/icons-material/Adb";
import AppleIcon from "@mui/icons-material/Apple";

const projectTypes = ["Two Semester", "One Semester"];


export default function AddProject(props) {
  const { addProjectOpen, setAddProject, getProjects } = props;

  const user = useSelector((state) => state.user.user);
  const [supervisors, setSupervisors] = useState([])

  const [alignment, setAlignment] = React.useState("web");


  const getSupervisors = () => {
    axios
      .get(`http://localhost:5000/api/auth/getSupervisors`)
      .then((res) => {
        setSupervisors([...res.data.supervisors]);
      }).catch((err) => {
          console.log(err.message)
      })
  };


  useEffect(() => {
    getSupervisors()
  }, [])


  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      projectType: "",
      technology: "web",
      supervisor: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Project Name is required"),
      description: Yup.string().required("A brief description is required"),
      projectType: Yup.string().required("Project Type is required"),
      technology: Yup.string().required("Technology is required"),
      supervisor: Yup.object().required("Supervisor is required")
    }),
    onSubmit: (values) => {
      axios.post('http://localhost:5000/api/projects/addProject', {...values, email:user.email, studentName:user.firstName+' '+user.lastName, userId: user.id}).then((res) => {
        getProjects()
        toast.success('project created')
        setAddProject(false)
        console.log(res.data)
      }).catch((err) => {
        toast.error(err.message)
      })
    },
  });
  

  const handleAddProjectClose = () => {
    setAddProject(false);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    formik.setFieldValue("technology", newAlignment);
  };

  return (
    <Dialog open={addProjectOpen} onClose={handleAddProjectClose}>
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
        <CreateNewFolderIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Add Project
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ marginTop: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <Autocomplete
            disablePortal
            fullWidth
            options={projectTypes}
            onChange={(e, value) =>
              formik.setFieldValue("projectType", value ? value : "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                id="projectType"
                name="projectType"
                margin="normal"
                label="Choose Project Type"
                onBlur={formik.handleBlur}
                value={formik.values.projectType}
                error={Boolean(
                  formik.touched.projectType && formik.errors.projectType
                )}
                helperText={
                  formik.touched.projectType && formik.errors.projectType
                }
              />
            )}
          />

          <Autocomplete
            disablePortal
            fullWidth
            options={[...supervisors]}
            onChange={(e, value) =>
              formik.setFieldValue("supervisor", value ? value : "")
            }
            getOptionLabel={(option) => option.firstName + " " + option.lastName}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.id}>
              {option.firstName + ' ' +option.lastName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                id="supervisor"
                name="supervisor"
                margin="normal"
                label="Choose Supervisor"
                onBlur={formik.handleBlur}
                value={formik.values.supervisor}
                error={Boolean(
                  formik.touched.supervisor && formik.errors.supervisor
                )}
                helperText={
                  formik.touched.supervisor && formik.errors.supervisor
                }
              />
            )}
          />

          {/* <Autocomplete
                disablePortal
                fullWidth
                options={technologies}
                onChange={(e,value) => formik.setFieldValue('technology', value ? value : "")}
                renderInput={(params) => 
                <TextField {...params} 
                    id="technology"
                    name = 'technology'
                    margin="normal" 
                    label="Choose Technology Used" 
                    onBlur={formik.handleBlur}
                    value={formik.values.technology}
                    error = {Boolean(formik.touched.technology && formik.errors.technology)}
                    helperText = {formik.touched.technology && formik.errors.technology}
                  />}
                /> */}

          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={Boolean(
              formik.touched.description && formik.errors.description
            )}
            helperText={formik.touched.description && formik.errors.description}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="web" color="warning">
                {" "}
                <CodeIcon></CodeIcon> Web
              </ToggleButton>
              <ToggleButton value="android" color="success">
                <AdbIcon></AdbIcon>Android
              </ToggleButton>
              <ToggleButton value="ios" sx={{ color: "darkgrey" }}>
                <AppleIcon></AppleIcon>iOS
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
