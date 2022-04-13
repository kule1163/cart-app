import React from 'react'
import { Grid } from "@mui/material"
import { useAppSelector } from '../app/hooks'
import { useParams } from 'react-router-dom'
import Product from '../components/productsPage/Product'
import FilterSection from '../components/productsPage/FilterSection'

const Categories = () => {

  const { categoryID } = useParams()

  const value = useAppSelector(state => state.product.value)
  const products = useAppSelector(state => state.product.products)

  const filteredProducts = products.filter(item => item.category.replaceAll("'", "").replaceAll(" ", "") === categoryID)
    .filter(item => item.price > value[0] && item.price < value[1])

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "5rem", overflow: "hidden", paddingInline: "1rem", paddingBottom: "3rem", boxSizing: "border-box"}}>
      <Grid item xs={8} sm={4}>
        <FilterSection category={false} />
      </Grid>
      <Grid item container spacing={1} xs={8}>
        {filteredProducts.map((item) => (
          <Grid justifyContent="end" key={item.id} item xs={12} sm={6} md={4}>
            <Product item={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default Categories

