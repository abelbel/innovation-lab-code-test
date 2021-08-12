import styled from "styled-components";

const StyledDiv = styled.div`
    padding: 1rem;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const Card: React.FC = (props) => {
    return (
        <StyledDiv>
            { props.children }
        </StyledDiv>
    )
}

export default Card