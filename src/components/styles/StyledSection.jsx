import styled from "styled-components";
const StyledSection = styled.section`
    max-width: ${({theme}) => theme.maxWidth};
    margin:20px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    text-transform: capitalize;
`;
export default StyledSection;