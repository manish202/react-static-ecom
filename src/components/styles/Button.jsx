import styled from "styled-components";
const Button = styled.button`
    display:inline-block;
    padding: 10px;
    margin: 10px 0;
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.text2};
    border: 2px solid ${({theme}) => theme.colors.text2};
    outline: none;
    border-radius: 3px;
    font-size: 20px;
    cursor: pointer;
    &:hover{
        color: ${({theme}) => theme.colors.text2};
        background-color: ${({theme}) => theme.colors.text};
        border: 2px solid ${({theme}) => theme.colors.text2};
    }
`;
export default Button;