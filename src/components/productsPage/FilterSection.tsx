import { Box, Typography, Slider, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { GrPowerReset} from 'react-icons/gr';
import { deepOrange, red } from '@mui/material/colors';
import FilterCategories from './FilterCategories'
import {useStyles} from "./filterStyles"
import FilterPrice from './FilterPrice'
import {setShowAll, setCurrentCategory, setValue} from "../../features/product/productSlice"


interface FilterSectionProps{
    category: boolean
}

const FilterSection = ({category}:FilterSectionProps) => {

    const value = useAppSelector(state => state.product.value)
    const dispatch = useAppDispatch()

    const [categoryToggle, setCategoryToggle] = useState<boolean>(false)
    const [priceToggle, setPriceToggle] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [filterCategoryDisplay, setFilterCategoryDisplay] = useState<boolean>(category)
    
    const handleCategory = () => setCategoryToggle((prev) => !prev)
    const handlePrice = () => setPriceToggle((prev) => !prev)
    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setValue(newValue as number[]));
    };

    const props = {}
    const classes = useStyles(props)

    return (
        <Box className={classes.mainBox}>
            <FilterCategories 
                handleCategory={handleCategory}
                categoryToggle={categoryToggle}
                currentIndex={currentIndex}
                setCurrentCategory={setCurrentCategory}
                setCurrentIndex={setCurrentIndex}
                setShowAll={setShowAll}
                filterCategoryDisplay={filterCategoryDisplay}
            />
            <FilterPrice 
                handlePrice={handlePrice}
                handleChange={handleChange}
                priceToggle={priceToggle}
                setValue={setValue}
                value={value}
            />
        </Box>
    )
}

export default FilterSection