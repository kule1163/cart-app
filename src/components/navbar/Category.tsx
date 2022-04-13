import React from 'react'
import {Box, Theme} from "@mui/material"
import { makeStyles } from '@mui/styles'
import { useAppSelector } from '../../app/hooks';
import { GoPrimitiveDot } from 'react-icons/go';
import CustomLink from "../CustomLink"


interface StylesProps {
    appBar?: string;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
    mainBox: {
        display: "inline-flex",
        boxSizing: "border-box",
        flexWrap: "wrap",
        backgroundColor: "white",
        padding: ({appBar}) => appBar === "appBar" ? "1rem": "0 1rem",
        border: ({appBar}) => appBar === "appBar" ? "1px solid black": "none",
        cursor: "pointer",
        /* flexDirection: ({appBar}) => appBar === "appBar" ? "row" : "column", */
        [theme.breakpoints.down("md")]: {
            flexDirection: "column"
        }
    },
    itemBox: {
        display: "flex",
        alignItems: "start",
        "&:not(:last-child)": {
            marginRight: ".6rem"
        }
    },
    categoryText: {
        marginLeft: ".2rem !important",
        fontSize: ".9em !important",
        display: "flex !important", 
        alignItems: "center !important", 
        justifyContent: "center !important",
        transition: "color .5s ease !important", 
        ["&:hover"]: {
            color: "red !important"
        }
    },
    categoryIcon: {
        color: "black",
    },
    text: {
        fontSize: "1.2em"
    }
}))

export interface CategoryProps {
    appBar?: string;
    handleClose: () => void
}
const Category = ({appBar, handleClose}:CategoryProps) => {
    
    const categories = useAppSelector(state => Array.from(new Set(state.product.categories)))
    const stylesProps = {appBar}
    const classes = useStyles(stylesProps)

    return (
    <Box className={classes.mainBox}>
        {categories.map((item) => (
            <Box key={item} className={classes.itemBox}>
                <GoPrimitiveDot className={classes.categoryIcon}/>
                <CustomLink 
                to={item === "all" ? `/products` : `/category/${item.replaceAll("'", "").replaceAll(" ", "")}`}
                    onClick={() => handleClose()} 
                    className={classes.categoryText}
                >
                    {item.toUpperCase()}
                </CustomLink>
            </Box>
        ))}
    </Box>
  )
}

export default Category