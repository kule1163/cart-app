import React from 'react'
import { useAppSelector } from '../app/hooks'
import { Grid, Typography } from "@mui/material"
import Product from '../components/productsPage/Product'
import {red, blue} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


const Search = () => {

    const navigate = useNavigate()

    const searchValue = useAppSelector(state => state.product.searchValue)
    const products = useAppSelector(state => state.product.products)
        .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))

    if (products.length === 0) {
        return (
            <Grid container justifyContent="center" sx={{ marginTop: "5rem", paddingInline: "1rem", paddingBottom: "3rem", boxSizing: "border-box" }}>
                <Grid item justifyContent="center" xs={12}>
                    <Typography sx={{color: red[200], textAlign:  "center"}}>No Matched Value</Typography>
                    <Typography onClick={() => navigate("/")} sx={{color: blue[700], textAlign: "center", cursor: "pointer"}}>GO HOME</Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container sx={{  marginTop: "5rem", paddingInline: "1rem", paddingBottom: "3rem", boxSizing: "border-box" }} justifyContent="center" spacing={3}>
            {products.map(item => (
                <Grid key={item.id} item xs={8} sm={4} md={3}>
                    <Product item={item} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Search