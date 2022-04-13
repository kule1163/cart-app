import React, {useEffect} from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CartState } from '../../features/product/productSlice'
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addCart } from "../../features/product/productSlice"


const useStyles = makeStyles((theme:Theme) => ({
    mainBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        paddingBlock: "1rem",
        borderRadius:"1rem"
    },
    headerText: {
        marginBottom: ".8rem"
    },
    price: {
        marginBlock: ".8rem"
    },
    image: {
        height: "15vh",
        width: "auto"
    },
    button: {
    }
}))

interface ProductProps {
    item: CartState
}

const Product = ({item}:ProductProps) => {
    
    const cartProducts = useAppSelector(state => state.product.cartProducts)
    const dispatch = useAppDispatch()
    const classes = useStyles()
    
    const handleAddCart = (id:number) => {
        dispatch(addCart(id))
    }
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartProducts))
    }, [cartProducts])


    return (
    <Box className={classes.mainBox}>
        <Typography className={classes.headerText} variant='body2'>{item.title.slice(0,12)}</Typography>
        <img className={classes.image} src={item.image}/>
        <Typography className={classes.price} variant="body2"><b>{item.price}</b></Typography>
        <Box className={classes.button}>
            <Button disabled={item.inCart} onClick={() => handleAddCart(item.id)} size='small' variant="contained">
                {item.inCart ? "ADDED" : "ADD TO CART"}
            </Button>
        </Box>
    </Box>
  ) 
}

export default Product