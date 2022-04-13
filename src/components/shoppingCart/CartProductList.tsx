import React, {useEffect} from 'react'
import {Grid, Box, Button} from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import CartProduct from './CartProduct'
import { makeStyles } from '@mui/styles'
import { clearAll } from '../../features/product/productSlice'

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
    },
    buttonItem: {
        display: "flex"
    },
    buttonBox: {
        marginLeft: "auto"
    }
}))

const CartProductList = () => {

    const dispatch = useAppDispatch()
    const cartProducts = useAppSelector(state => state.product.cartProducts)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartProducts))

    }, [cartProducts])

    const classes = useStyles()
    
    return (
    <Grid container className={classes.container}>
        {cartProducts.map((item) => (
            <Grid item key={item.id} xs={12} sm={12}>
                <CartProduct item={item}/>
            </Grid>
        ))}
        <Grid className={classes.buttonItem} item xs={12}>
            <Box className={classes.buttonBox}>
                <Button onClick={() => dispatch(clearAll())} variant="contained" color="error">CLEAR ALL</Button>
            </Box>
        </Grid>
        
    </Grid>
  )
}

export default CartProductList