import styled from "styled-components";
import ColorPicker from "../styles/ColorPicker";
import Button from "../styles/Button";
import ToggleBtn from "../styles/ToggleBtn";
import { FaArrowLeft,FaArrowDown } from "react-icons/fa";
import SelectBox from "../styles/SelectBox";
import {useState,useEffect,useContext} from "react";
import {ProductContext} from "../Products";
import products from "../data/products";
const StyledFilters = styled.div`
    width: 240px;
    padding: 10px;
    position:relative;
    .search{
        padding: 7px;
        text-transform: capitalize;
        border-radius: 3px;
        outline: none;
        border: 2px solid ${({theme}) => theme.colors.text2};
        margin: 10px 0px;
        font-size: 16px;
    }
    h2{
        color: ${({theme}) => theme.colors.text2};
        padding: 10px 0;
        letter-spacing: 1px;
    }
    ul li{
        padding: 3px 0px;
        cursor: pointer;
        &.active{
            color:${({theme}) => theme.colors.text2};
        }
    }
    p{
        color: ${({theme}) => theme.colors.bg};
    }
    .range{
        display: block;
        margin: 15px 0;
    }
    .clr-box{
        max-width: 180px;
        b{
            cursor:pointer;
        }
    }
    @media (max-width: ${({theme}) => theme.media.tab}){
        .toggle-me{
            position: absolute;
            left: -150%;
            top:35px;
            background-color: whitesmoke;
            padding: 15px;
            z-index:8;
            transition: all 0.2s;
            &.active{
                left:0%;
            }
        }
    }
`;
const ClearFilter = styled(Button)`
    font-size: 14px;
    letter-spacing: 1px;
`;
const ApplyFilters = styled(ClearFilter)`
    display:none;
    @media (max-width: ${({theme}) => theme.media.tab}){
        display:block;
    }
`;
const ToggleButton = styled(ToggleBtn)`
    position: absolute;
    top: -15px;
    left: 10px;
`;
const SearchInput = ({dispatch,resetInp}) => {
    console.log("App > Products > Filters > SearchInput");
    const [inp,chinp] = useState("");
    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch({type:"SET_SEARCH_VAL",payload:inp});
        },500);
        return () => clearTimeout(timer);
    },[inp]);
    useEffect(() => chinp(""),[resetInp]);
    return <input type="text" className="search" value={inp} onChange={(e) => chinp(e.target.value)} />;
}
const Pricing = ({isLoading,minPrice,maxPrice,dispatch,resetInp}) => {
    console.log("App > Products > Filters > Pricing");
    const [dePrice,chDePrice] = useState(0);
    useEffect(() => {
        let timer = setTimeout(() => {
            dePrice > 0 && dispatch({type:"SET_PRICE_VAL",payload:dePrice});
        },500);
        return () => clearTimeout(timer);
    },[dePrice]);
    useEffect(() => {
        maxPrice > 0 && chDePrice(maxPrice);
    },[maxPrice]);
    useEffect(() => chDePrice(maxPrice ?? 0),[resetInp]);
    return(
        <>
            <h2>Price</h2>
            <p>{isLoading && "Loading..." || `₹${dePrice}`}</p>
            <input type="range" className="range" min={minPrice} max={maxPrice} value={dePrice} onChange={(e) => chDePrice(e.target.value)} />
        </>
    )
}
const Filters = () => {
    console.log("App > Products > Filters");
    const [state,updtState] = useState({isLoading:false,data:[]});
    const [resetInp,updtResetInp] = useState(false);
    const [sidebar,updtSidebar] = useState(false);
    const {category,company,color,dispatch} = useContext(ProductContext);
    const getArr = (attr) => ([...new Set(state.data.map(val => val[attr]))]);
    const categories = ["All",...getArr('category')];
    const companies = ["All",...getArr('company')];
    const colors = [...new Set(state.data.map(val => val.colors.map(clr => clr.toLowerCase())).flat())];
    const priceArr = getArr('price').sort((a,b) => a - b);
    useEffect(() => {
        updtState(old => ({...old,isLoading:true}));
        setTimeout(() => {
            updtState(old => ({...old,isLoading:false,data:products}));
        },2000);
    },[]);
    const clearFilters = () => {
        dispatch({type:"CLEAR_FILTERS"});
        updtResetInp(old => !old);
    }
    return(
        <StyledFilters>
            <ToggleButton onClick={() => updtSidebar(old => !old)} type="button">{sidebar ? <FaArrowDown /> : <FaArrowLeft />}</ToggleButton>
            <div className={`toggle-me ${sidebar ? 'active':''}`}>
                <SearchInput dispatch={dispatch} resetInp={resetInp} />
                <h2>Category</h2>
                <ul>
                    {state.isLoading && <li>Loading...</li> || (categories && categories.map((val,i) => <li onClick={() => dispatch({type:"SET_CAT_VAL",payload:val})} className={val == category ? 'active':''} key={i}>{val}</li>))}
                </ul>
                <h2>Company</h2>
                <SelectBox value={company} onChange={(e) => dispatch({type:"SET_COMPANY_VAL",payload:e.target.value})}>
                    {state.isLoading && <option>Loading...</option> || (companies && companies.map((val,i) => <option key={i} value={val}>{val}</option>))}
                </SelectBox>
                <h2>Colors</h2>
                <div className="clr-box">
                    {!state.isLoading && <b onClick={() => dispatch({type:"SET_COLOR_VAL",payload:"All"})}>All</b>}
                    {state.isLoading && <h3>Loading...</h3> || (colors && colors.map((val,i) => <ColorPicker onClick={() => dispatch({type:"SET_COLOR_VAL",payload:val})} className={val == color ? 'active':''} key={i} title={val} $clr={val} />))}
                </div>
                <Pricing isLoading={state.isLoading} minPrice={priceArr[0]} maxPrice={priceArr.pop()} dispatch={dispatch} resetInp={resetInp} />
                <ClearFilter onClick={clearFilters} type="button">CLEAR FILTERS</ClearFilter>
                <ApplyFilters onClick={() => updtSidebar(false)} type="button">APPLY FILTERS</ApplyFilters>
            </div>
        </StyledFilters>
    )
}
export default Filters;