import React from 'react'
import SearchBar from '../components/navbar/SearchBar'
import { Box, Grid } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import Bag from "../assets/bag.jpg"
import HomeText from '../components/homeContent/HomeText'
import Features from '../components/homeContent/Features'

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        background: `url(${Bag}) no-repeat center center fixed`,
        backgroundSize: "cover",
        width: "100wv",
        height: "100vh",
        boxSizing: "border-box",
        overflow: "hidden",
    },
    searchBar: {
        display: "none",
        [theme.breakpoints.down(700)]: {
            marginTop: "5rem",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "auto",
        }
    },
    homeItem: {
        paddingLeft: "10%",
        paddingTop: "3rem",
        [theme.breakpoints.down(700)]: {
            paddingLeft: "5%",
        }
        ,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "0",
            paddingTop: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
        }
    },
    featuresItem: {
        paddingRight: "10%",
        display: "flex",
        paddingTop: "3rem",
        [theme.breakpoints.down(700)]: {
            paddingRight: "5%",

        },
        [theme.breakpoints.down("sm")]: {
            paddingRight: "0",
            paddingTop: "0"
        }
    }
}))


const Home = () => {

    const classes = useStyles()

    return (
        <>
            <Grid className={classes.container} container >
                <Grid item xs={12}>
                    <Box className={classes.searchBar}>
                        <SearchBar />
                    </Box>
                </Grid>
                <Grid className={classes.homeItem} item xs={12} sm={6}>
                    <HomeText />
                </Grid>
                <Grid className={classes.featuresItem} item xs={12} sm={6}>
                    <Features />
                </Grid>
            </Grid>
        </>
    )
}

export default Home