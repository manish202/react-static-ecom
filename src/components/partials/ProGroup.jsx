import styled from "styled-components";
import StyledSection from "../styles/StyledSection";
import { IoGrid } from "react-icons/io5";
import { FaListAlt } from "react-icons/fa";
import ProductCard from "./ProductCard";
import SelectBox from "../styles/SelectBox";
import {useState,useContext} from "react";
import {ProductContext} from "../Products";
const Box = styled.div`
    width:calc(100% - 240px);
    padding: 0px 10px;
    @media (max-width: ${({theme}) => theme.media.tab}){
        width:100%;
    }
`;
const StyledProGroup = styled(StyledSection)`
    margin: 7px auto;
    justify-content: space-between;
    .view button{
        padding: 10px;
        margin: 10px 0px;
        font-size: 18px;
        color: ${({theme}) => theme.colors.text};
        border: none;
        background-color: lightgray;
        cursor: pointer;
        transition: all 0.2s;
        &:hover,&.active{
            background-color: ${({theme}) => theme.colors.bg};
        }
    }
    b{
        color: ${({theme}) => theme.colors.bg};
    }
`;
const Container = styled(StyledSection)`
    min-height:70vh;
`;
const SortOptions = () => {
    console.log("App > Products > ProGroup > SortOptions");
    const {sorting,dispatch} = useContext(ProductContext);
    return(
        <SelectBox value={sorting} onChange={(e) => dispatch({type:"SET_SORT_VAL",payload:e.target.value})}>
            <option value="DEF">Default</option>
            <option value="PHL">Price: High-Low</option>
            <option value="PLH">Price: Low-High</option>
            <option value="NAZ">Name: A-Z</option>
            <option value="NZA">Name: Z-A</option>
        </SelectBox>
    )
}
const ProGroup = () => {
    console.log("App > Products > ProGroup");
    const [isListView,updtState] = useState(false);
    const {productsLoading,filtered_data} = useContext(ProductContext);
    return(
        <Box>
            <StyledProGroup>
                <div className="view">
                    <button onClick={() => updtState(false)} className={!isListView ? 'active':''} type="button"><IoGrid /></button>
                    <button onClick={() => updtState(true)} className={isListView ? 'active':''} type="button"><FaListAlt /></button>
                </div>
                <b>{productsLoading && "Loading..." || `${filtered_data.length} Products`}</b>
                <SortOptions />
            </StyledProGroup>
            <Container>
                {productsLoading && <h1>Loading...</h1> || (filtered_data.length > 0 && filtered_data.map((val,i) => <ProductCard key={i} {...val} isListView={isListView} />) || <h1>No Products</h1>)}
            </Container>
        </Box>
    )
}
export default ProGroup;