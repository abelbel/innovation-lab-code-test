import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { deviceMediaQuery } from "../../helpers";

const StyledMain = styled.main`
  margin: 3rem auto;
  @media ${deviceMediaQuery.desktop} {
    width: 1440px;
  }

  @media ${deviceMediaQuery.laptopL} {
    width: 1024px;
  }

  @media ${deviceMediaQuery.laptop} {
    width: 768px;
  }

  @media ${deviceMediaQuery.tablet} {
    width: 425px;
  }

  @media ${deviceMediaQuery.mobileL} {
    width: 375px;
  }

  @media ${deviceMediaQuery.mobileM} {
    width: 320px;
  }

  @media ${deviceMediaQuery.mobileS} {
    width: 80%;
  }
`;

const Layout: React.FC = (props) => {
  return (
    <div>
      <Header />
      <StyledMain>{props.children}</StyledMain>
    </div>
  );
};

export default Layout;
