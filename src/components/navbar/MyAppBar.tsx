import React, { useState } from 'react'
import { AppBar, Toolbar, Box, Typography, Grid, Badge} from "@mui/material"
import { blueGrey } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@mui/styles"
import {Theme } from '@mui/system'
import Brand from "../../assets/logo.png";
import { menuItemList } from '../../utils/menuItemList';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import Drawer from './Drawer';
import Category from './Category';
import { FaShoppingBag } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {setShowCategoryHover} from "../../features/product/productSlice"
import {MenuItem} from "../../utils/menuItemList"

interface StylesProps {
    showCategoryHover: boolean,
    locationLeft?: number,
    locationTop?: number;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        paddingInline: "3rem"
    },
    imgBox: {
        width: "120px",
        objectFit: "cover",
        height: "auto",
        cursor: "pointer",
        [theme.breakpoints.down(500)]: {
            width: "100px"
        }
    },
    iconBox: {
        display: "block",
        [theme.breakpoints.up(800)]: {
            display: "none"
        }
    },
    menuItemsBox: {
        display: "flex",
        [theme.breakpoints.down(800)]: {
            display: "none"
        },
        height: "58px",
        alignItems: "center",
    },
    menuItems: {
        "&:first-child": {
            marginRight: "1rem"
        },
        height: "100%",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        fontSize: "1.1em"
    },
    searchBarIn: {
        display: "block",
        [theme.breakpoints.down(800)]: {
            display: "none"
        }
    },
    currentPageBox: {
        display: "none",
        [theme.breakpoints.down(800)]: {
            display: "block",
            marginInline: "auto"
        }
    },
    categoryBox: {
        display: ({ showCategoryHover }) => showCategoryHover ? "block" : "none" ,
        position: "fixed",
        left: ({ locationLeft }) => locationLeft,
        top: "3.8rem",
        cursor: "pointer",
        zIndex: "10000",
    },
}))

const MyAppBar = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const showCategoryHover = useAppSelector(state => state.product.showCategoryHover)
    const cartProducts = useAppSelector(state => state.product.cartProducts)

    const [drawerToggle, setDrawerToggle] = useState<boolean>(false)
    const [locationLeft, setLocationLeft] = useState<number>(0)
    const [locationTop, setLocationTop] = useState<number>(0)

    const stylesProps = { showCategoryHover, locationLeft, locationTop }
    const classes = useStyles(stylesProps)

    const totalProduct = cartProducts.reduce((arr, item) => arr += item.cartCount, 0)

    const handleOpen = () => setDrawerToggle(true)
    const handleClose = () => setDrawerToggle(false)

    const handleMouseeEnter = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const targetElement = e.target as HTMLElement

        if (!targetElement.classList.contains("menuItem")) {
            dispatch(setShowCategoryHover(false))
        }
    }

    const handleNavigate = (title: string) => {
        if (title.toLowerCase() === "products") {
            navigate(`/${title.toLowerCase()}`)
        }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item:MenuItem) => {
        if(item.children) {
            const bounding = e.currentTarget.getBoundingClientRect()
            const left = bounding.left
            const top = bounding.top

            dispatch(setShowCategoryHover(true))
            setLocationLeft(left)
            setLocationTop(top)
        }
    }

    return (
        <Grid container sx={{ position: "relative" }}  >
            <Grid xs={12} item onMouseOver={handleMouseeEnter}>
                <AppBar sx={{ backgroundColor: `${blueGrey[200]}` }} >
                    <Toolbar className={classes.toolbar}>
                        <Box className={classes.iconBox}>
                            <MenuIcon sx={{cursor: "pointer"}} onClick={handleOpen} />
                        </Box>

                        <img onClick={() => navigate("/")} className={classes.imgBox} src={Brand} />

                        <Box className={classes.menuItemsBox} >
                            {menuItemList.map((item) => (
                                <Typography
                                    onMouseEnter={(e) => handleMouseEnter(e, item)}
                                    onClick={() => handleNavigate(item.title)}
                                    className={`${classes.menuItems} menuItem`}
                                    variant="body2"
                                    key={item.id}
                                >
                                    {item.title}
                                </Typography>
                            ))}
                        </Box>
                        <Box className={classes.searchBarIn}>
                            <SearchBar />
                        </Box>

                        <Box onClick={() => navigate("/cart")} sx={{cursor: "pointer"}}>
                            <Badge badgeContent={totalProduct} color="primary">
                                <FaShoppingBag size={22} color="action" />
                            </Badge>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer drawerToggle={drawerToggle} handleClose={handleClose} />
            </Grid>
            <Box onMouseLeave={() => dispatch(setShowCategoryHover(false))} className={`${classes.categoryBox}`}>
                <Category handleClose={handleClose} appBar="appBar"/>
            </Box>
        </Grid>
    )
}

export default MyAppBar