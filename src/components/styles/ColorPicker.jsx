import styled from "styled-components";
const ColorPicker = styled.b`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({$clr}) => $clr};
    margin: -2px 3px;
    display: inline-block;
    padding: 0;
    cursor: pointer;
    border: 1px solid black;
    &.active{
        outline: 2px solid black;
    }
`;
export default ColorPicker;