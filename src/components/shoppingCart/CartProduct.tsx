import React from 'react'
import { CartState } from "../../features/product/productSlice"
import { Box, Typography, Avatar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from '@mui/system'
import { useAppDispatch } from '../../app/hooks'
import { increase, decrease, remove } from "../../features/product/productSlice"
import { GoDiffRemoved } from 'react-icons/go';



const useStyles = makeStyles((theme: Theme) => ({
    mainBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid gray",
        backgroundColor: "white",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "start",
            paddingInline: "1rem"
        }
    },
    leftBox: {
        display: "flex",
        flexDirection: "row",
        marginRight: "auto",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "row",
        }
    },
    rightBox: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            justifyContent: "space-between"
        }
    },
    image: {
        height: "100%"
    },
    removeBox: {
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "auto"
        }

    },
    imageBox: {
        height: "20vh",
        padding: ".5rem",
        marginRight: "auto !important",
        [theme.breakpoints.down("sm")]: {
            height: "15vh"
        }
    },
    titleBox: {
        width: "70%",
        padding: ".5rem",
        "& p": {
            fontSize: "1.2em",
        },
        [theme.breakpoints.down("md")]: {
            "& p": {
                fontSize: ".8em",
            },
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            display: "flex",
            paddingTop: ".3rem",
            "& p": {
                fontSize: ".8em",
            },
        }
    },
    priceBox: {
        padding: ".5rem"
    },
    quantityBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: ".5rem"

    }
}))

interface CartProductsProps {
    item: CartState
}

const CartProduct = ({ item }: CartProductsProps) => {

    const dispatch = useAppDispatch()
    const classes = useStyles()

    const handleIncrease = (id: number) => dispatch(increase(id))
    const handleDecrease = (id: number) => dispatch(decrease(id))
    const handleRemove = (id: number) => dispatch(remove(id))
    const price = (item.price * item.cartCount).toFixed(2)

    return (
        <Box className={classes.mainBox}>
            <Box onClick={() => handleRemove(item.id)} className={classes.removeBox}>
                <Typography><GoDiffRemoved size={30} /></Typography>
            </Box>
            <Box className={classes.leftBox}>
                <Box className={classes.imageBox}>
                    <img src={item.image} className={classes.image} />
                </Box>
                <Box className={classes.titleBox}>
                    <Typography sx={{ width: "100%" }}>{item.title}</Typography>
                </Box>
            </Box>
            <Box className={classes.rightBox}>
                <Box className={classes.priceBox}>
                    <Typography>{price}$</Typography>
                </Box>
                <Box className={classes.quantityBox}>
                    <Avatar
                        sx={{ width: 24, height: 24, cursor: "pointer" }}
                        variant="square"
                        onClick={() => handleIncrease(item.id)}
                    >
                        +
                    </Avatar>
                    <Typography sx={{ marginInline: ".5rem" }}>{item.cartCount}</Typography>
                    <Avatar
                        sx={{ width: 24, height: 24, cursor: "pointer" }}
                        variant="square"
                        onClick={() => handleDecrease(item.id)}
                    >
                        -
                    </Avatar>
                </Box>
            </Box>
        </Box>
    )
}

export default CartProduct