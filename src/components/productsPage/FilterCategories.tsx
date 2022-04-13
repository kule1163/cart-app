import React from "react";
import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useStyles } from "./filterStyles"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

interface FilterCategoriesProps {
    handleCategory: () => void;
    categoryToggle: boolean;
    currentIndex: number;
    setCurrentCategory: ActionCreatorWithPayload<string, string>;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setShowAll: ActionCreatorWithPayload<boolean, string>;
    filterCategoryDisplay: boolean

}

const FilterCategories = ({
    handleCategory,
    categoryToggle,
    currentIndex,
    setCurrentCategory,
    setCurrentIndex,
    setShowAll,
    filterCategoryDisplay

}: FilterCategoriesProps) => {

    const uniqueCategories = useAppSelector(state => Array.from(new Set(state.product.categories)))
    const dispatch = useAppDispatch()

    const props = { categoryToggle, filterCategoryDisplay}
    const classes = useStyles(props)

    return (
        <Box className={classes.categoryDisplayBox}>
            <Box className={classes.sectionBox}>
                <Box className={classes.filterContent}>
                    <Typography className={classes.filterTextTitle}>CATEGORIES</Typography>
                    <Typography className={classes.toggleText} onClick={handleCategory}>{categoryToggle ? (<b>-</b>) : (<b>+</b>)}</Typography>
                </Box>
                <Box sx={{ paddingLeft: "1rem" }}>
                    <Box className={classes.categoriesBox}>

                        {uniqueCategories.map((item, index) => (
                            <Typography
                                key={item}
                                className={index === currentIndex ? `${classes.filterCategText} ${classes.currentCategText}` : `${classes.filterCategText}`}
                                onClick={() => {
                                    dispatch(setCurrentCategory(item))
                                    setCurrentIndex(index)
                                    if (item === "all") {
                                        dispatch(setShowAll(true))
                                    } else {
                                        dispatch(setShowAll(false))
                                    }

                                }}
                            >
                                - {item.toUpperCase()}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default FilterCategories