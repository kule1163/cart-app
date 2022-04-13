import React from 'react'
import { Grid} from "@mui/material"
import { useAppSelector } from '../../app/hooks'
import Product from './Product'

const ProductList = () => {

    const value = useAppSelector(state => state.product.value)
    const showAll = useAppSelector(state => state.product.showAll)
    const currentCategory = useAppSelector(state => state.product.currentCategory)

    const products = useAppSelector(state => state.product.products)
        .filter(item => item.price > value[0] && item.price < value[1])
    const catagoriedProducts = products.filter(item => item.category === currentCategory)
        .filter(item => item.price > value[0] && item.price < value[1])

    return (
        <Grid container spacing={1}>
            {showAll ? 
                products.map((item) => (
                    <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <Product item={item} />
                    </Grid>
                )) :
                catagoriedProducts.map((item) => (
                    <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <Product item={item} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ProductList