import React, {useEffect, useRef} from 'react'
import { Grid, Typography, Box } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import CartProductList from '../components/shoppingCart/CartProductList'
import { useAppSelector } from "../app/hooks"
import {red, blue} from "@mui/material/colors"
import { useNavigate } from 'react-router-dom'
import gsap from "gsap"
import PaymentInfo from "../components/shoppingCart/PaymentInfo"

interface StylesProps {
    cartDisplay: boolean
}
const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
    container: {
        marginTop: "5rem",
        paddingInline: "1rem",
        justifyContent: "center",
        alignItems: "start",
        display: ({ cartDisplay }) => cartDisplay ? "flex" : "none"
    },
    emptyContainer: {
        display: ({ cartDisplay }) => cartDisplay ? "none" : "block",
        marginTop: "6rem"
    },
    item: {
        "&:not(last-child)": {
            borderLeft: "1px solid black",
        }
    },
    headerText: {
        fontSize: ".8em",
        paddingLeft: ".5rem",
    },
    emptyCardBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
    },
    firstText: {
        color: red[200],
        fontWeight: "bolder"
    },
    secondText: {
        color: blue[700],
        fontWeight: "bolder",
        cursor: "pointer"
    }
}))

const ShoppingCart = () => {

    const navigate = useNavigate()
    const cartProducts = useAppSelector(state => state.product.cartProducts)
    const cartDisplay = cartProducts.length > 0 ? true : false

    const stylesProps = { cartDisplay }
    const classes = useStyles(stylesProps)

    const el = useRef<HTMLDivElement>()
    const q = gsap.utils.selector(el)
    const tl = useRef<GSAPTimeline>()

    useEffect(() => {
        tl.current = gsap.timeline()
            .from(q(".animSecondText"), {xPercent: 100, opacity: 0, duration: 1, ease: "elastic", delay: 1})
    },[])

    return (
        <>
            <Grid sx={{paddingBottom: "3rem", boxSizing: "border-box"}} container alignItems="center" spacing={2} className={classes.container}>
                <Grid item xs={12}>
                    <Typography sx={{ textAlign: "center" }} variant="h4">SHOPPING CART</Typography>
                </Grid>
                <Grid item xs={10} sm={8}>
                    <CartProductList />
                </Grid>
                <Grid item xs={10} sm={4}>
                    <PaymentInfo />
                </Grid>
            </Grid>
            <Grid className={classes.emptyContainer} container>
                <Grid item xs={12}>
                    <Box className={classes.emptyCardBox} ref={el}>
                        <Typography className={classes.firstText}>You Dont Have Any Item In Your Bag </Typography>
                        <Typography onClick={() => navigate("/products")} className={`${classes.secondText} animSecondText`}>LETS ENJOY</Typography>
                    </Box>
                </Grid> 
            </Grid>
        </>
    )
}

export default ShoppingCart