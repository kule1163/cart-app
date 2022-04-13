import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid } from "@mui/material"
import { Theme } from '@mui/system'
import { makeStyles } from '@mui/styles'
import { useAppSelector } from '../../app/hooks'

interface StylesProps {
    promo: number;
    percent: number;
    displayTooltip: boolean;
}
const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
    mainBox: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: ".5rem",
        "& > *": {
            marginBottom: "1rem"
        }
    },
    subTotalBox: {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: ".2rem",
        borderBottom: ".3px solid gray",
        "& p": {
            fontSize: "1em"
        },
        "&:last-child": {
            marginBottom: "0 !important"
        },
        [theme.breakpoints.down("md")]: {
            "& p": {
                fontSize: "1em"
            },
        }
    },
    cargoPriceBox: {

    },
    disCodeBox: {
        display: "inline-flex",
        width: "100%",
        alignItems: "end",
        justifyContent: "space-between",
        position: "relative"

    },
    disButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: ".8em",
        border: ".5px solid blue",
        color: "blue",
        padding: ".3rem .7rem",
        marginTop: "auto",
        cursor: "pointer",

    },
    disInput: {
        width: "80%",
        border: "1px solid blue",
        "&:focus": {
            border: "none",
            outline: "2px solid blue"
        }
    },
    label: {
        fontSize: ".8em",
        marginBottom: ".2rem",
        color: "gray",
        fontWeight: "lighter"
    },
    promoPrice: {
        color: ({ promo }) => promo === 0 ? "black" : "red"
    },
    motivationMainBox: {
        display: "flex",
        flexDirection: "column",
    },
    motivation: {
        width: "100%",
        height: "5px",
        border: "1px solid black",
        borderRadius: "1rem"

    },
    color: {
        width: ({ percent }) => `${percent}%`,
        height: "5px",
        borderRadius: "1rem",
        backgroundColor: "blue",
        transition: "1.5s ease width",
    },
    tooltip: {
        color: "white",
        backgroundColor: "red",
        paddingInline: ".3rem",
        position: "absolute",
        right: "3px",
        top: "-9px",
        display: ({displayTooltip}) => displayTooltip ? "block" : "none"
    }

}))

const PaymentInfo = () => {

    const [promoValue, setPromoValue] = useState<string>("")
    const [promo, setPromo] = useState<number>(0)
    const [cargoPrice, setCargoPrice] = useState<number>(10)
    const [displayTooltip, setDisplayTooltip] = useState<boolean>(false)
 
    const cartProducts = useAppSelector(state => state.product.cartProducts)
    const subTotal = Number(cartProducts.reduce((arr, item) => arr += item.cartCount * item.price, 0).toFixed(2))

    const handlePromo = () => {
        if (promoValue === "JB7") {
            setPromo(10)
        }
    }
    const percent = subTotal > 50 ? 100 : Math.ceil((100 / 50) * subTotal)
    const promoPrice = Number(((subTotal * promo) / 100).toFixed(2))
    const tax = Number(((subTotal * 7) / 100).toFixed(2))
    const finalTotal = (subTotal - promoPrice + tax + cargoPrice).toFixed(2)
    const freeCargo = subTotal < 50 && (50 - subTotal).toFixed(2)

    useEffect(() => {
        if (percent === 100) {
            setCargoPrice(0)
        } else {
            setCargoPrice(10)
        }
    }, [percent])

    const stylesProps = { promo, percent, displayTooltip }
    const classes = useStyles(stylesProps)

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box className={classes.mainBox}>
                    <Box className={classes.subTotalBox}>
                        <Typography><b>Subtotal</b></Typography>
                        <Typography>$ {subTotal}</Typography>
                    </Box>
                    <Box className={classes.subTotalBox}>
                        <Typography>Ups Shipping</Typography>
                        <Typography sx={{ color: "blue" }}>{percent === 100 ? `FREE` : `+$ ${cargoPrice}`}</Typography>
                    </Box>
                    <Box className={classes.motivationMainBox}>
                        <label style={{ fontSize: ".8em", marginLeft: "auto", marginBottom: ".2rem" }} htmlFor='motivation'>{cargoPrice && `just $ ${freeCargo} to FREE cargo`}</label>
                        <Box id="motivation" className={classes.motivation}>
                            <Box className={classes.color}></Box>
                        </Box>
                    </Box>
                    <Box className={classes.disCodeBox}>
                        <Box>
                            <label className={classes.label} htmlFor="promo">Promo/Discount Code</label>
                            <input placeholder='JB7' onChange={(e) => setPromoValue(e.target.value)} id="promo" className={classes.disInput} type="text" />
                        </Box>
                            <Typography className={classes.tooltip}>JB7</Typography>
                            <div 
                                onClick={handlePromo} 
                                onMouseOver={() => setDisplayTooltip(true)}
                                onMouseLeave={() => setDisplayTooltip(false)}
                                className={classes.disButton}
                            >
                                Apply
                            </div>              
                    </Box>
                    <Box className={classes.subTotalBox}>
                        <Typography>Promo Discount</Typography>
                        <Typography className={classes.promoPrice}>{promo === 0 ? `$ 0` : `-$ ${promoPrice}`}</Typography>
                    </Box>
                    <Box className={classes.subTotalBox}>
                        <Typography>Sales Tax</Typography>
                        <Typography sx={{ color: "blue" }}>+$ {tax}</Typography>
                    </Box>
                    <Box className={classes.subTotalBox}>
                        <Typography sx={{ color: "green" }}>FINAL TOTAL</Typography>
                        <Typography sx={{ color: "green" }}>$ {finalTotal}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default PaymentInfo