import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../../app/store';

export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",

    async () => {
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()

        return data as CartState[]
    } 
)

export interface CartState {
    id: number;
    price: number;
    title: string;
    category: "men's clothing" | "jewelery" | "electronics" | "women's clothing";
    description: string;
    image: string;
    amount: number;
    backGround: string;
    buttonColor: string;
    inCart: boolean;
    cartCount: number;
}

export interface InıtalState {
    products: CartState[];
    loading: 'idle' | 'loading' | 'succeded' | 'failed';
    categories: string[];
    prices: number[];
    searchValue: string;
    cartProducts: CartState[];
    totalPrice: number;
    totalProduct: number;
    showCategoryHover: boolean;
    categID:  string | undefined;
    currentCategory: string;
    showAll: boolean;
    value: number[]
}
let maxPrice = 1000
const initialState:InıtalState = {
    products: [],
    loading: "idle",
    categories: ["all"],
    prices: [],
    searchValue: "",
    cartProducts: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || "{}") : [],
    totalPrice: 0,
    totalProduct: 0,
    showCategoryHover: false,
    categID: "",
    currentCategory: "",
    showAll: true,
    value: [0, maxPrice],
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSearchValue: (state, action:PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setCategID:(state, action:PayloadAction<string | undefined>) => {
            state.categID = action.payload
        },
        setShowCategoryHover: (state, action:PayloadAction<boolean>) => {
            state.showCategoryHover = action.payload
        },
        setCurrentCategory: (state, action:PayloadAction<string>) => {
            state.currentCategory = action.payload
        },
        setShowAll: (state, action:PayloadAction<boolean>) => {
            state.showAll = action.payload
        },
        setValue: (state, action:PayloadAction<number[]>) => {
            state.value = action.payload
        },
        addCart: (state, action:PayloadAction<number>) => {
            const currentProduct = state.products.find(item => item.id === action.payload)
            if(currentProduct) {
                currentProduct.cartCount = 1
                currentProduct.inCart = true
                state.cartProducts.push(currentProduct)
            }
        },
        increase: (state, action:PayloadAction<number>) => {
            state.cartProducts = state.cartProducts.map(item => {
                if(item.id === action.payload) {
                    return {...item, cartCount: item.cartCount + 1}
                } else {
                    return {...item}
                }
            })
        },
        decrease: (state, action:PayloadAction<number>) => {
            state.cartProducts = state.cartProducts.reduce((arr, item) => {
                if(item.id === action.payload) {
                    if(item.cartCount === 1) {
                        state.products = state.products.map(item => {
                            if(item.id === action.payload) {
                                return {...item, inCart: false}
                            } else {
                                return {...item}
                            }
                        })
                        return arr
                    } else {
                        return [...arr, {...item, cartCount: item.cartCount - 1}]
                    }
                } else {
                    return [...arr, item]
                }
            }, [] as CartState[])
        },
        remove: (state, action:PayloadAction<number>) => {
            state.cartProducts = state.cartProducts.filter(item => item.id !== action.payload)

            state.products = state.products.map(item => {
                if(item.id === action.payload) {
                    return {...item, inCart: false}
                } else {
                    return {...item}
                }
            })
        },
        clearAll: (state) => {
            state.cartProducts = []

            state.products = state.products.map(item => ({...item, inCart: false}))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action:PayloadAction<CartState[]>) => {
                
                state.products = action.payload.reduce((arr, item) => {
                    const ids = state.cartProducts.map(item => item.id) 
                    if(ids.includes(item.id)) {
                        const currentitem = state.cartProducts.find(cItem => cItem.id === item.id)
                        
                        if(currentitem) arr.push({...currentitem})
                     } else {
                         arr.push({...item, inCart: false, cartCount: 0})
                     }
                    
                    return arr
                }, [] as CartState[])
                state.categories = state.products.reduce((arr, item) => {
                    
                    return [...arr, item.category]

                }, ["all"])
                state.prices = state.products.map(item => item.price)
                
                state.loading = "succeded"
            })
            builder.addCase(fetchProduct.pending, (state) => {
                state.loading = "loading"
            })
            builder.addCase(fetchProduct.rejected, (state) => {
                state.loading = "failed"
            })
            
    }
})

export const {setSearchValue, setShowCategoryHover, setCategID, setShowAll, setCurrentCategory, setValue, addCart, increase, decrease, remove, clearAll} = productSlice.actions

export default productSlice.reducer