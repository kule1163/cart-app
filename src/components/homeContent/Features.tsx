import React, {useEffect, useRef} from 'react'
import {Grid, Box, Typography} from "@mui/material"
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import { featuresList } from '../../utils/homePageFeatures'
import gsap from "gsap"

const useStyles = makeStyles((theme:Theme) => ({
    item: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            alignItems: "center",
        }
    },
    boxContainer: {
        display: "inline-flex",
        flexDirection: "column",
        marginLeft: "auto",
        [theme.breakpoints.down("sm")]: {
            marginInline: "auto",
            flexDirection: "row",
            width: "100%"
        }
    },
    boxItem: {
        backgroundColor: "transparent",
        height: "10vh",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "start",
        color: "white",
        "&:not(:last-child)": {
            marginBottom: "1rem"
        },
        "&:nth-child(1)": {
            marginRight: "3rem"
        }
        ,
        "&:nth-child(2)": {
            marginRight: "2rem"
        }
        ,
        "&:nth-child(3)": {
            marginRight: "1rem"
        },
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            width: "33%",
            alignItems: "center",
            "&:nth-child(1)": {
                marginRight: "0rem"
            }
            ,
            "&:nth-child(2)": {
                marginRight: "0rem"
            }
            ,
            "&:nth-child(3)": {
                marginRight: "0rem"
            },
        },
        [theme.breakpoints.down(500)]: {
          flexDirection: "column"
        }
    },
    itemText: {
        fontSize: "1.3em",
        marginRight: ".6rem",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: ".7rem"
        },
        [theme.breakpoints.down(500)]: {
            fontSize: ".7rem",
            marginBottom: ".5rem"
        },
        [theme.breakpoints.down(380)]: {
            fontSize: ".6rem",
            marginBottom: ".5rem"
        }
    }
}))

const Features = () => {
  
    const classes = useStyles()

    const el = useRef<HTMLDivElement>()
    const q = gsap.utils.selector(el)
    const tl = useRef<GSAPTimeline>()

    useEffect(() => {
        tl.current = gsap.timeline({delay: 2})
            .from(q(".boxItemAnim"), {xPercent: 100, opacity: 0, duration: 1, ease: "elastic", stagger: 0.1})
    }, [])
  
    return (
    <Grid container >
        <Grid item xs={12} className={classes.item}>
            <Box className={classes.boxContainer} ref={el}>
                {featuresList.map((item) => (
                    <Box key={item.id} className={`${classes.boxItem} boxItemAnim`}>
                        <Typography className={classes.itemText} variant="body2">{item.text}</Typography>
                        <item.icon size={25}/>
                    </Box>
                ))}
            </Box>
        </Grid>
    </Grid>
  )
}

export default Features