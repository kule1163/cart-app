import React from 'react'
import {Grid, Typography} from "@mui/material"
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/system'
import ProductList from '../components/productsPage/ProductList'
import FilterSection from '../components/productsPage/FilterSection'
import SearchBar from '../components/navbar/SearchBar'

const useStyles = makeStyles((theme:Theme) => ({
    item: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}))


const Products = () => {
 
    const classes = useStyles()
  
    return (
    <Grid container spacing={2} sx={{marginTop: "5rem", paddingInline: "1rem", paddingBottom: "3rem", boxSizing: "border-box"}} justifyContent="center">
        <Grid item xs={12}>
            <SearchBar />
        </Grid>
        <Grid item className={classes.item} xs={12}>
            <Typography variant="h4">PRODUCTS</Typography>  
        </Grid>
        <Grid item xs={8} sm={4} sx={{overflow: "hidden"}}>
            <FilterSection category={true}/>
        </Grid>
        <Grid item xs={8} sm={8}>
            <ProductList />
        </Grid>
    </Grid>
  )
}

export default Products