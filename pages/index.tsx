import React, { useState } from "react";
import styled from "styled-components";
import { GetStaticProps } from "next";
import DogCard from "../components/Dog/DogCard";
import DogSchema from "../schema/dog";
import { deviceMediaQuery, getUrlFileType } from "../helpers";
import { resolutions } from "../settings";

const FlexFilterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 200px;
  margin: 1rem;
  border-radius: 4px;
  padding: 0.25rem;
  border: 1px solid #ccc;
`;

const StyledSelect = styled.select`
  width: 100px;
  margin: 1rem;
  border-radius: 4px;
  padding: 0.25rem;
  border: 1px solid #ccc;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GalleryItem = styled.div`
  width: 80%;
  margin: 0.5rem;

  @media ${`(min-width: ${resolutions.tablet})`} {
    flex: 0 0 21%;
  }
`;

const StyledHeader = styled.h3`
  text-align: center;
`;

type StaticProps = {
  dogs: DogSchema[];
};

export default ({ dogs: initialDogs }: StaticProps) => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [dogs, setDogs] = useState<DogSchema[]>(initialDogs);

  const filterInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const sortSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  let filteredDogs = filter
    ? dogs.filter((dog) =>
        dog.caption.toLowerCase().includes(filter.toLowerCase())
      )
    : dogs;

  filteredDogs = sort
    ? filteredDogs.filter((dog) => {
        const normalizedUrl = getUrlFileType(dog.url).toLowerCase();
        if (sort === "jpg") {
          return normalizedUrl === "jpg" || normalizedUrl === "jpeg";
        }
        return normalizedUrl === sort;
      })
    : filteredDogs;

  const gallery = filteredDogs.length ? (
    <Gallery>
      {filteredDogs.map((dog) => (
        <GalleryItem key={dog.id} data-test-id="gallery-item">
          <DogCard dog={dog} />
        </GalleryItem>
      ))}
    </Gallery>
  ) : (
    <StyledHeader>No dogs available.</StyledHeader>
  );

  return (
    <>
      <FlexFilterDiv>
        <StyledInput
          data-test-id="filter-input"
          type="text"
          id="url"
          onChange={filterInputHandler}
          value={filter}
        />
        <StyledSelect
          id="url"
          data-test-id="sort-select"
          onChange={sortSelectHandler}
          value={sort}
        >
          <option value="">ALL</option>
          <option value="jpg">JPEG</option>
          <option value="gif">GIF</option>
          <option value="png">PNG</option>
          <option value="mp4">MP4</option>
        </StyledSelect>
      </FlexFilterDiv>
      {gallery}
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const response = await fetch("http://localhost:3000/api/dogs");
  const data = await response.json();
  return {
    props: {
      dogs: data.result,
    },
  };
};
