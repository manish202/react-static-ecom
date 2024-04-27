import styled from "styled-components";
import StyledSection from "./styles/StyledSection";
import {useEffect,useReducer,createContext} from "react";
import Filters from "./partials/Filters";
import ProGroup from "./partials/ProGroup";
import products from "./data/products";
export const ProductContext = createContext();
const StyledProducts = styled(StyledSection)`
    max-width:1200px;
    align-items: flex-start;
    @media (max-width: ${({theme}) => theme.media.tab}){
        justify-content: flex-start;
    }
`;
const reducer = (state,action) => {
    switch(action.type){
        case "LOADING":
            return {...state,productsLoading:action.payload};
        case "FILTERED_PRODUCTS":
            return {...state,productsLoading:false,filtered_data:action.payload};
        case "SET_SORT_VAL":
            return {...state,sorting:action.payload};
        case "SET_SEARCH_VAL":
            return {...state,search:action.payload};
        case "SET_CAT_VAL":
            return {...state,category:action.payload};
        case "SET_COMPANY_VAL":
            return {...state,company:action.payload};
        case "SET_COLOR_VAL":
            return {...state,color:action.payload};
        case "SET_PRICE_VAL":
            return {...state,price:action.payload};
        case "CLEAR_FILTERS":
            return {...state,sorting:"DEF",search:"",category:"All",company:"All",color:"All",price:0};
    }
}
const initialState = {
    productsLoading:false,
    filtered_data:[],
    sorting:"DEF",
    search:"",
    category:"All",
    company:"All",
    color:"All",
    price:0,
}
const Products = () => {
    console.log("App > Products");
    const [state,dispatch] = useReducer(reducer,initialState);
    useEffect(() => {
        let tmp = [];
        let {sorting,search,category,company,color,price} = state;
        dispatch({type:"LOADING",payload:true});
        tmp = products.sort((a,b) => {
            return (sorting == "DEF" && null) || (sorting == "PHL" && b.price - a.price) || (sorting == "PLH" && a.price - b.price) ||
            (sorting == "NAZ" && a.name.localeCompare(b.name)) || (sorting == "NZA" && b.name.localeCompare(a.name));
        });
        if(search){
            tmp = tmp.filter(pro => pro.name.toLowerCase().includes(search.toLowerCase()));
        }
        if(category !== "All"){
            tmp = tmp.filter(pro => pro.category === category);
        }
        if(company !== "All"){
            tmp = tmp.filter(pro => pro.company === company);
        }
        if(color !== "All"){
            tmp = tmp.filter(pro => pro.colors.join(" ").toLowerCase().includes(color));
        }
        if(price > 0){
            tmp = tmp.filter(pro => pro.price <= price);
        }
        setTimeout(() => {
            dispatch({type:"FILTERED_PRODUCTS",payload:tmp});
        },3000);
    },[state.sorting,state.search,state.category,state.company,state.color,state.price]);
    return(
        <ProductContext.Provider value={{...state,dispatch}}>
            <StyledProducts>
                <Filters />
                <ProGroup />
            </StyledProducts>
        </ProductContext.Provider>
    )
}
export default Products;