import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import DragDrop from "./dragAndDrop";
import storage from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Remarks from "./remarks";

export default function ProjectOverview() {
  const [project, setProject] = useState();

  const [remarksOpen, setRemarksOpen] = useState(false);
  const [remarks, setRemarks] = useState([]);

  const [docType, setDocType] = useState("proposal");

  const [file, setFile] = useState(null);

  const elevation = 24;

  const params = useParams();

  const user = useSelector((state) => state.user.user);

  const projectId = params.projectId;

  const getProject = () => {
    axios
      .get(`http://localhost:5000/api/projects/getProject/${projectId}`)
      .then((res) => {
        setProject(res.data.project[0]);
        console.log(res.data.project[0]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getProject();
  }, []);

  const getRemarks = () => {
    axios
      .get(`http://localhost:5000/api/projects/getRemarks/${projectId}/${docType}`)
      .then((res) => {
        setRemarks(res.data.remarks)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getRemarks();
  }, [remarksOpen])

  const uploadProposal = async (project, fileType) => {
    if (file) {
      const storageRef = ref(
        storage,
        `/${user.firstName + " " + user.lastName + " " + user.id}/proposal/${
          file.name
        }`
      );
      await uploadBytesResumable(storageRef, file);
      const documentUrl = await getDownloadURL(
        ref(
          storage,
          `/${user.firstName + " " + user.lastName + " " + user.id}/proposal/${
            file.name
          }`
        )
      );
      console.log(documentUrl);
      setFile(null);

      axios
        .post(
          `http://localhost:5000/api/projects/uploadDocumentUrl/${project.id}`,
          { fileType, documentUrl, fileName: file.name }
        )
        .then((res) => {
          console.log(res.data);
          getProject();
        });
    }
  };

  const uploadSrs = async (project, fileType) => {
    if (file) {
      const storageRef = ref(
        storage,
        `/${user.firstName + " " + user.lastName + " " + user.id}/srs/${
          file.name
        }`
      );
      await uploadBytesResumable(storageRef, file);
      const documentUrl = await getDownloadURL(
        ref(
          storage,
          `/${user.firstName + " " + user.lastName + " " + user.id}/srs/${
            file.name
          }`
        )
      );
      console.log(documentUrl);
      setFile(null);

      axios
        .post(
          `http://localhost:5000/api/projects/uploadDocumentUrl/${project.id}`,
          { fileType, documentUrl, fileName: file.name }
        )
        .then((res) => {
          console.log(res.data);
          getProject();
        });
    }
  };

  const uploadSds = async (project, fileType) => {
    if (file) {
      const storageRef = ref(
        storage,
        `/${user.firstName + " " + user.lastName + " " + user.id}/proposal/${
          file.name
        }`
      );
      await uploadBytesResumable(storageRef, file);
      const documentUrl = await getDownloadURL(
        ref(
          storage,
          `/${user.firstName + " " + user.lastName + " " + user.id}/proposal/${
            file.name
          }`
        )
      );
      console.log(documentUrl);
      setFile(null);

      axios
        .post(
          `http://localhost:5000/api/projects/uploadDocumentUrl/${project.id}`,
          { fileType, documentUrl, fileName: file.name }
        )
        .then((res) => {
          console.log(res.data);
          getProject();
        });
    }
  };

  const uploadFinal = async (project, fileType) => {
    if (file) {
      const storageRef = ref(
        storage,
        `/${user.firstName + " " + user.lastName + " " + user.id}/proposal/${
          file.name
        }`
      );
      await uploadBytesResumable(storageRef, file);
      const documentUrl = await getDownloadURL(
        ref(
          storage,
          `/${user.firstName + " " + user.lastName + " " + user.id}/proposal/${
            file.name
          }`
        )
      );
      console.log(documentUrl);
      setFile(null);

      axios
        .post(
          `http://localhost:5000/api/projects/uploadDocumentUrl/${project.id}`,
          { fileType, documentUrl, fileName: file.name }
        )
        .then((res) => {
          console.log(res.data);
          getProject();
        });
    }
  };

  const handleUploadProposal = (project, fileType) => {
    toast.promise(uploadProposal(project, fileType), {
      loading: "uploading",
      success: "file uploaded",
      error: "Error uploading file",
    });
  };

  const handleUploadSrs = (project, fileType) => {
    toast.promise(uploadSrs(project, fileType), {
      loading: "uploading",
      success: "file uploaded",
      error: "Error uploading file",
    });
  };

  const handleUploadSds = (project, fileType) => {
    toast.promise(uploadSds(project, fileType), {
      loading: "uploading",
      success: "file uploaded",
      error: "Error uploading file",
    });
  };

  const handleUploadFinal = (project, fileType) => {
    toast.promise(uploadFinal(project, fileType), {
      loading: "uploading",
      success: "file uploaded",
      error: "Error uploading file",
    });
  };

  const handleOpenRemarksDialog = (type) => {
    setDocType(type);
    setRemarksOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          padding: "25px",
          width: "97%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" color="primary">
          {project?.name}
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            padding: "55px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "2ch",
            gap: "15px",
          }}
        >
          <Typography variant="h5">Project Documents</Typography>

          <Paper
            elevation={elevation}
            sx={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "2ch",
              gap: "8px",
              width: "85%",
              position: "relative",
            }}

            // onMouseOver={() => setElevation(24)}
            // onMouseOut={() => setElevation(4)}
          >
            <Tooltip title="view remarks">
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  Zindex: 1,
                }}
                onClick={() => handleOpenRemarksDialog("proposal")}
              >
                <CommentOutlinedIcon></CommentOutlinedIcon>
              </IconButton>
            </Tooltip>

            <Typography sx={{ fontWeight: "bold" }}>
              Project Proposal
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!project?.documents.proposal.documentUrl ? (
                <img src="/assets/addfile.png" alt="" width={100} />
              ) : (
                <img src="/assets/pdfimage.png" alt="" width={200} />
              )}

              <Typography>
                {project?.documents.proposal.documentName
                  ? project?.documents.proposal.documentName
                  : "No File Uploaded"}
              </Typography>
            </Box>
            <DragDrop {...{ file, setFile }}></DragDrop>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {project?.documents.proposal.status === "pending submission" && (
                <Chip
                  label={project?.documents.proposal.status}
                  color="warning"
                ></Chip>
              )}
              {project?.documents.proposal.status === "denied" && (
                <Chip
                  label={project?.documents.proposal.status}
                  color="error"
                ></Chip>
              )}
              {project?.documents.proposal.status === "pending approval" && (
                <Chip
                  label={project?.documents.proposal.status}
                  color="info"
                ></Chip>
              )}
              {project?.documents.proposal.status === "approved" && (
                <Chip
                  label={project?.documents.proposal.status}
                  color="success"
                ></Chip>
              )}
              <Button
                startIcon={<FileUploadOutlinedIcon />}
                variant="contained"
                onClick={() => handleUploadProposal(project, "proposal")}
              >
                Upload
              </Button>
            </Box>
          </Paper>
          <Paper
            elevation={elevation}
            sx={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "2ch",
              gap: "8px",
              width: "85%",
              position: "relative",
            }}

            // onMouseOver={() => setElevation(24)}
            // onMouseOut={() => setElevation(4)}
          >
            <Tooltip title="view remarks">
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  Zindex: 1,
                }}
                onClick={() => handleOpenRemarksDialog("srs")}
              >
                <CommentOutlinedIcon></CommentOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Typography sx={{ fontWeight: "bold" }}>
              System Requirements Specification
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!project?.documents.srs.documentUrl ? (
                <img src="/assets/addfile.png" alt="" width={100} />
              ) : (
                <img src="/assets/pdfimage.png" alt="" width={200} />
              )}

              <Typography>
                {project?.documents.srs.documentName
                  ? project?.documents.srs.documentName
                  : "No File Uploaded"}
              </Typography>
            </Box>
            <DragDrop {...{ file, setFile }}></DragDrop>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {project?.documents.srs.status === "pending submission" && (
                <Chip
                  label={project?.documents.srs.status}
                  color="warning"
                ></Chip>
              )}
              {project?.documents.srs.status === "denied" && (
                <Chip
                  label={project?.documents.srs.status}
                  color="error"
                ></Chip>
              )}
              {project?.documents.srs.status === "pending approval" && (
                <Chip label={project?.documents.srs.status} color="info"></Chip>
              )}
              {project?.documents.srs.status === "approved" && (
                <Chip
                  label={project?.documents.srs.status}
                  color="success"
                ></Chip>
              )}
              <Button
                startIcon={<FileUploadOutlinedIcon />}
                variant="contained"
                onClick={() => handleUploadSrs(project, "srs")}
              >
                Upload
              </Button>
            </Box>
          </Paper>
          <Paper
            elevation={elevation}
            sx={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "2ch",
              gap: "8px",
              width: "85%",
              position: "relative",
            }}

            // onMouseOver={() => setElevation(24)}
            // onMouseOut={() => setElevation(4)}
          >
            <Tooltip title="view remarks">
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  Zindex: 1,
                }}
                onClick={() => handleOpenRemarksDialog("sds")}
              >
                <CommentOutlinedIcon></CommentOutlinedIcon>
              </IconButton>
            </Tooltip>

            <Typography sx={{ fontWeight: "bold" }}>
              System Design Specification
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!project?.documents.sds.documentUrl ? (
                <img src="/assets/addfile.png" alt="" width={100} />
              ) : (
                <img src="/assets/pdfimage.png" alt="" width={200} />
              )}

              <Typography>
                {project?.documents.sds.documentName
                  ? project?.documents.sds.documentName
                  : "No File Uploaded"}
              </Typography>
            </Box>
            <DragDrop {...{ file, setFile }}></DragDrop>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {project?.documents.sds.status === "pending submission" && (
                <Chip
                  label={project?.documents.sds.status}
                  color="warning"
                ></Chip>
              )}
              {project?.documents.sds.status === "denied" && (
                <Chip
                  label={project?.documents.sds.status}
                  color="error"
                ></Chip>
              )}
              {project?.documents.sds.status === "pending approval" && (
                <Chip label={project?.documents.sds.status} color="info"></Chip>
              )}
              {project?.documents.sds.status === "approved" && (
                <Chip
                  label={project?.documents.sds.status}
                  color="success"
                ></Chip>
              )}
              <Button
                startIcon={<FileUploadOutlinedIcon />}
                variant="contained"
                onClick={() => handleUploadSds(project, "sds")}
              >
                Upload
              </Button>
            </Box>
          </Paper>
          <Paper
            elevation={elevation}
            sx={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "2ch",
              gap: "8px",
              width: "85%",
              position: "relative",
            }}

            // onMouseOver={() => setElevation(24)}
            // onMouseOut={() => setElevation(4)}
          >
            <Tooltip title="view remarks">
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  Zindex: 1,
                }}
                onClick={() => handleOpenRemarksDialog("final")}
              >
                <CommentOutlinedIcon></CommentOutlinedIcon>
              </IconButton>
            </Tooltip>

            <Typography sx={{ fontWeight: "bold" }}>Final Document</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!project?.documents.final.documentUrl ? (
                <img src="/assets/addfile.png" alt="" width={100} />
              ) : (
                <img src="/assets/pdfimage.png" alt="" width={200} />
              )}

              <Typography>
                {project?.documents.final.documentName
                  ? project?.documents.final.documentName
                  : "No File Uploaded"}
              </Typography>
            </Box>
            <DragDrop {...{ file, setFile }}></DragDrop>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {project?.documents.final.status === "pending submission" && (
                <Chip
                  label={project?.documents.final.status}
                  color="warning"
                ></Chip>
              )}
              {project?.documents.final.status === "denied" && (
                <Chip
                  label={project?.documents.final.status}
                  color="error"
                ></Chip>
              )}
              {project?.documents.final.status === "pending approval" && (
                <Chip
                  label={project?.documents.final.status}
                  color="info"
                ></Chip>
              )}
              {project?.documents.final.status === "approved" && (
                <Chip
                  label={project?.documents.final.status}
                  color="success"
                ></Chip>
              )}
              <Button
                startIcon={<FileUploadOutlinedIcon />}
                variant="contained"
                onClick={() => handleUploadFinal(project, "final")}
              >
                Upload
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Remarks {...{ remarksOpen, setRemarksOpen, remarks, setRemarks }}></Remarks>
    </>
  );
}
