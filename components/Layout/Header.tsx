import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1a8ed1;
  padding: 0 10%;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: baseline;
  }

  li {
    margin-left: 3rem;
  }

  a {
    text-decoration: none;
    font-size: 1.5rem;
    color: white;
  }

  a:hover,
  a:active,
  a.active {
    color: white;
  }
`;

const StyledLogo = styled.div`
  font-size: 2rem;
  color: white;
  font-weight: bold;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogo>DOGS IN YOUR AREA</StyledLogo>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
