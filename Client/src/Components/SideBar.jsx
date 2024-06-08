import React from "react";
import { Box, SwipeableDrawer, List, ListItem, ListItemText, ListItemIcon, Divider, Avatar, Button } from "@mui/material";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logof.png";

const SideBar = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [coursesOpen, setCoursesOpen] = React.useState(false);
  const courses = useSelector((state) => state?.course?.courses);
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = useSelector((state) => state.authReducer.isLogin);

  const handleCourseToggle = () => {
    setCoursesOpen(!coursesOpen);
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={handleClose}
      onOpen={() => {}}
    >
      <Box
        sx={{
          width: 250,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <List>
            {isLoggedIn && user && (
              <Box sx={{ textAlign: "center", py: 2 }}>
                <Avatar sx={{ width: 56, height: 56, mx: "auto" }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Box mt={1} mb={2}>
                  <strong>{user.name}</strong>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClose();
                    navigate("/profile/1");
                  }}
                  fullWidth
                >
                  View Profile
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleClose();
                    navigate("/admindashboard/0");
                  }}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Admin Panel
                </Button>
              </Box>
            )}

            {!isLoggedIn && (
              <Box sx={{ textAlign: "center", py: 2 }}>
                <Box mb={2}>
                  <img src={logo} alt="Logo" style={{ width: "100%", height: "auto" }} />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClose();
                    navigate("/login");
                  }}
                  fullWidth
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    handleClose();
                    navigate("/signup");
                  }}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Sign Up
                </Button>
              </Box>
            )}

            <Divider />
            <ListItem button onClick={handleCourseToggle}>
              <ListItemText primary="Courses" />
              <ListItemIcon>{coursesOpen ? <FaAngleDown /> : <FaAngleRight />}</ListItemIcon>
            </ListItem>
            {coursesOpen && (
              <Box sx={{ pl: 2 }}>
                {courses?.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => {
                      handleClose();
                      navigate(`/courses/${item?._id}`);
                    }}
                  >
                    <ListItemText primary={item?.name} />
                    <ListItemIcon><FaAngleRight /></ListItemIcon>
                  </ListItem>
                ))}
              </Box>
            )}
          </List>
        </Box>

        {isLoggedIn && (
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<IoLogOut />}
              onClick={() => {
                handleClose();
                // Add logout logic here
              }}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  );
};

export default SideBar;
