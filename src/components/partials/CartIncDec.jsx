import { FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";
const StyledBtnGroup = styled.div`
    display:flex;
    button{
        padding:10px;
        background-color: ${({theme}) => theme.colors.bg};
        background-color: ${({theme}) => theme.colors.text};
        border:none;
        outline:none;
        cursor:pointer;
    }
    margin:10px 0px;
`;
const CartIncDec = ({qty,incDecQty}) => {
    console.log("App > ... > CartIncDec");
    return(
        <StyledBtnGroup>
            <button type="button" onClick={() => incDecQty({type:"DEC"})}><FaMinus /></button>
            <button type="button">{qty ?? 1}</button>
            <button type="button" onClick={() => incDecQty({type:"INC"})}><FaPlus /></button>
        </StyledBtnGroup>
    )
}
export default CartIncDec;