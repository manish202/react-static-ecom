import styled from "styled-components";
const ToggleBtn = styled.button`
    display:none;
    padding: 8px;
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.bg};
    border: 2px solid ${({theme}) => theme.colors.bg};
    outline: none;
    border-radius: 3px;
    font-size: 20px;
    cursor: pointer;
    line-height: 18px;
    &:hover{
        color: ${({theme}) => theme.colors.bg};
        background-color: ${({theme}) => theme.colors.text};
        border: 2px solid ${({theme}) => theme.colors.bg};
    }
    @media (max-width: ${({theme}) => theme.media.tab}){
        display:block;
    }
`;
export default ToggleBtn;