import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Avatar, Button, Drawer, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { IoIosSearch } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightLong } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from './SideBar';
import { RxCross2 } from "react-icons/rx";
import { logoutAuth } from '../store/authReducer';
import toast from 'react-hot-toast';
import CreateCourse from './CreateCourse';
import { alpha, styled } from '@mui/material/styles';
import logo from "../assets/logof.png";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const NavBar = () => {
    const courses = useSelector(state => state?.course?.courses);
    const [search, setSearch] = useState('');
    const [searchedCourse, setSearchedCourse] = useState([]);
    const [open, setOpen] = useState(false);
    const [courseOpen, setCourseOpen] = useState(false);
    const token = useSelector((state) => state.authReducer.isLogin);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setSearchedCourse(
            courses?.filter((item) => (
                item?.name?.toLowerCase()?.includes(search?.toLowerCase())
            ))
        );
    }, [search, courses]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(logoutAuth());
        toast.success("Logged Out Successfully");
        navigate("/login");
    };

    return (
        <>
            <SideBar open={open} handleClose={() => setOpen(false)} />
            <AppBar position="static" sx={{ backgroundColor: '#ff6e00' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(true)}
                    >
                        <GiHamburgerMenu />
                    </IconButton>
                    <img src={logo} alt="Logo" style={{ width: '150px', cursor: 'pointer' }} onClick={() => navigate('/')} />
                    <Search>
                        <SearchIconWrapper>
                            <IoIosSearch />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search Courses…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {!token && (
                            <>
                                <Button color="inherit" onClick={() => navigate('/login')}>Log In</Button>
                                <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
                            </>
                        )}
                        {token && user?.isAdmin && (
                            <Button color="inherit" onClick={() => navigate('/admindashboard/0')}>Admin Page</Button>
                        )}
                        {token && (
                            <>
                                <Button color="inherit" onClick={() => navigate('/profile/0')}>My Courses</Button>
                                <IconButton color="inherit" onClick={handleLogout}>
                                    <ImExit />
                                </IconButton>
                                <IconButton color="inherit" onClick={() => navigate('/profile/1')}>
                                    <Avatar src="https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png" />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {search && searchedCourse.length > 0 && (
                <Box sx={{ position: 'absolute', top: '64px', left: '50%', transform: 'translateX(-50%)', width: '300px', bgcolor: 'background.paper', boxShadow: 3, zIndex: 1 }}>
                    <List>
                        {searchedCourse.map((item, index) => (
                            <ListItem button key={index} onClick={() => { navigate(`/courses/${item?._id}`); setSearchedCourse([]); setSearch(''); }}>
                                <ListItemText primary={item?.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </>
    );
};

export default NavBar;
