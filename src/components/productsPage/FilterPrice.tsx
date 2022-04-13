import { Box, Typography, Slider } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { GrPowerReset } from 'react-icons/gr';
import { useStyles } from "./filterStyles"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"

interface FilterPriceProps {
    handlePrice: () => void;
    priceToggle: boolean;
    handleChange: (event: Event, newValue: number | number[]) => void;
    setValue: ActionCreatorWithPayload<number[], string>;
    value: number[];
}

const FilterPrice = ({
    handlePrice,
    priceToggle,
    handleChange,
    setValue,
    value,
}: FilterPriceProps) => {

    const maxPrice = useAppSelector(state => Math.ceil(Math.max(...state.product.prices)))
    const dispatch = useAppDispatch()

    const props = { priceToggle }
    const classes = useStyles(props)

    return (
        <Box className={classes.sectionBox}>
            <Box className={classes.filterContent}>
                <Typography className={classes.filterTextTitle}>PRICE</Typography>
                <Typography className={classes.toggleText} onClick={handlePrice}>{priceToggle ? (<b>-</b>) : (<b>+</b>)}</Typography>
            </Box>
            <Box className={classes.sliderBox} sx={{ width: "80%", marginX: "auto" }}>
                <Slider
                    min={0}
                    max={maxPrice}
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    sx={{ height: ".1rem !important" }}
                />
                <Box className={classes.sliderPriceBox}>
                    <Typography>{value[0]}</Typography>
                    <GrPowerReset onClick={() => dispatch(setValue([0, maxPrice]))} />
                    <Typography>{value[1]}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default FilterPrice