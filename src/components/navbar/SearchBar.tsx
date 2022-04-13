import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSearchValue } from "../../features/product/productSlice"
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.7),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.9),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: "100%",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

interface InputCompProps {
    name: string;
}

const InputComp = ({ name }: InputCompProps) => {
    const { register } = useFormContext()

    return <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} {...register(`${name}` as const)} />
}

const SearchBar = () => {

    const dispatch = useAppDispatch()
    const methods = useForm()
    const navigate = useNavigate()

    const onSubmit = (data: any) => {
        const { search } = data

        dispatch(setSearchValue(search))
        methods.reset()
        
        navigate("/search")
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <InputComp

                                    name="search"
                                />
                            </form>
                        </FormProvider>
                    </Search>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SearchBar