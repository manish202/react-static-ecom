import styled from "styled-components";
const SelectBox = styled.select`
    padding: 6px 10px;
    outline: none;
    border: 2px solid ${({theme}) => theme.colors.text2};
    background-color: ${({theme}) => theme.colors.text2};
    color: ${({theme}) => theme.colors.text};
    border-radius: 4px;
    min-width: 130px;
    cursor: pointer;
    font-size:18px;
`;
export default SelectBox;