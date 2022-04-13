import React, { useEffect, useRef } from 'react'
import {Grid, Typography, Box, Button} from "@mui/material"
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import gsap from "gsap"
import {useNavigate} from "react-router-dom"

const useStyles = makeStyles((theme:Theme) => ({
    item: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    mainText: {
        color: "white",
        fontWeight: "bolder",
        fontSize: "2.5em",
        [theme.breakpoints.down("md")]: {
            fontSize: "2em",
            "&:first-child": {
                marginBottom: ".5rem"
            }
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "3em",
        },
        [theme.breakpoints.down(500)]: {
            fontSize: "2.5em",
        }
    },
    textBox: {
        marginBottom: "1rem",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2rem"
        },
        [theme.breakpoints.down(700)]: {
           textAlign: "center"
        }
    },
    mainBox: {
        display:"inline-flex",
        flexDirection: "column",
        
    },
    buttonBox: {
        display: "inline-flex",
        marginLeft: "auto",
        transition: "width ease 1s",
        
        
    },
    button: {
        color: "white",
        transition: "all ease 1s",
        marginLeft: "auto",
        border: "1px solid white",
        "&:hover": {
            backgroundColor: " rgba(255,255,255,0.1)",
            color: "black",
            border: "1px solid black",
        }
    }
}))




const HomeText = () => {
    
    const navigate = useNavigate()
    const classes = useStyles()

    const el = useRef<HTMLDivElement>()
    const q = gsap.utils.selector(el)
    const tl = useRef<GSAPTimeline>()

    useEffect(() => {
        tl.current = gsap.timeline({delay: 3.5})
            .from(q(".firstText"), {xPercent: -100, opacity: 0, duration: 1, ease: "elastic"})
            .from(q(".secondText"), {scale: 0, opacity: 0, duration: 2.5, ease: "back"})
            .from(q(".buttonAnim"), {xPercent: -100, opacity: 0, duration: 1, ease: "elastic"})
    },[])


    return (
    <Grid container>
        <Grid item className={classes.item} xs={12}>
            <Box className={classes.mainBox} ref={el}>
                <Box className={classes.textBox}>
                    <Typography className={`${classes.mainText} firstText`} variant="h4">FILL YOUR BAG</Typography>
                    <Typography className={`${classes.mainText} secondText`}  variant="h4">WITH QUALITY</Typography>
                </Box>
                <Box className={`${classes.buttonBox} buttonAnim`} >
                    <Button onClick={() => navigate("/products")} fullWidth className={classes.button} color='error' variant="outlined">Fill NOw</Button>
                </Box>
            </Box>
        </Grid>
    </Grid>
  )
}

export default HomeText