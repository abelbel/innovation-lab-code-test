import Card from "../UI/Card";
import DogSchema from "../../schema/dog";
import styled from "styled-components";
import { deviceMediaQuery, getUrlFileType } from "../../helpers";

const StyledMediaDiv = styled.div`
  img,
  video {
    width: 100%;
  }

  @media ${deviceMediaQuery.desktop} {
    img,
    video {
      height: 350px;
    }
  }

  @media ${deviceMediaQuery.laptopL} {
    img,
    video {
      height: 250px;
    }
  }

  @media ${deviceMediaQuery.laptop} {
    img,
    video {
      height: 200px;
    }
  }

  @media ${deviceMediaQuery.tablet} {
    img,
    video {
      height: 100%;
    }
  }
`;

const DogCard: React.FC<{ dog: DogSchema }> = (props) => {
  const media =
    getUrlFileType(props.dog.url) === "mp4" ? (
      <video src={props.dog.url} controls />
    ) : (
      <img src={props.dog.url} />
    );
  return (
    <Card>
      <StyledMediaDiv>{media}</StyledMediaDiv>
      <div>
        <h3>{props.dog.caption}</h3>
      </div>
    </Card>
  );
};

export default DogCard;
