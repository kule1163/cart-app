import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Grid, Typography } from '@mui/material';
import MyAppBar from './components/navbar/MyAppBar';
import { fetchProduct } from './features/product/productSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Search from './pages/Search';
import ShoppingCart from "./pages/ShoppingCart"
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  
`;

function App() {
  const dispatch = useAppDispatch()
  const statues = useAppSelector(state => state.product.loading)

  useEffect(() => {
    if (statues === "idle") {
      dispatch(fetchProduct())
    }
  }, [dispatch, statues])


  if (statues === "failed") {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>oooopsss we are sory. we had a problem. page didnt load</Typography>
        </Grid>
      </Grid>
    )
  }

  if (statues === "succeded") {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <MyAppBar />
            
                <Routes>
                  <Route path="/" element={<Home />} />
                 
                    <Route path="/products" element={<Products />} />
                    <Route path="/category/:categoryID" element={<Categories />} />
                    <Route path='/search' element={<Search />} />
                    <Route path="/cart" element={<ShoppingCart />} />

                </Routes>
            
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <Grid sx={{ width: "100vw", height: "100vh" }} alignItems="center" container>
      <Grid item xs={12}>
        <div>
          <CircleLoader css={override} size={100} />
        </div>
      </Grid>
    </Grid>
  )
}

export default App;
