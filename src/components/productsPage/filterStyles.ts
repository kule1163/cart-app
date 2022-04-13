import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import { deepOrange, red } from '@mui/material/colors';

interface StylesProps {
    categoryToggle?: boolean;
    priceToggle?: boolean;
    filterCategoryDisplay?: boolean;
    
}

export const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
    categoryDisplayBox: {
        display: ({filterCategoryDisplay}) => filterCategoryDisplay ? "block" : "none",
        width: "100%"
    },
    mainBox: {
        display: "inline-flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "1rem",
        paddingBottom: "1rem"
    },
    sectionBox: {
        marginTop: "1rem",
        borderBottom: "1px solid grey",
        width: "100%",
      
    },
    filterContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "1rem"
    },
    categoriesBox: {
        display: ({categoryToggle}) => categoryToggle ? "flex" : "none",
        flexDirection: "column",
        alignItems: "start",
    },
    sliderBox: {
        display: ({priceToggle}) => priceToggle ? "block" : "none"
    },
    sliderPriceBox: {
        display: "flex",
        justifyContent: "space-between"
    },
    toggleText: {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        cursor: "pointer"
    },
    filterTextTitle: {
        marginRight: "1rem", 
        fontSize: "1.1em",
        color: "blue", 
        paddingLeft: "1rem"
    },
    filterCategText: {
        marginRight: "1rem", 
        fontSize: ".9em", 
        cursor: "pointer",
        transition: "all 1s ease",
        
        "&:hover": {
            color: `${deepOrange[500]}`,
            letterSpacing: "2px"
        }
    },
    currentCategText: {
        transition: "all 1s ease",
        color: "blue",
        letterSpacing: "2px",
        "&:hover": {
            color: "blue"
        }
    },
}))
