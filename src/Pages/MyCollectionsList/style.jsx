import styled from "styled-components";

export const WholeDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 0px 0px 10px 64px;
  flex-direction: column;

  .error-tag {
    margin-top: 50px;
    display: flex;
    place-items: center;
    justify-content: center;
  }
`;

export const DisplayCardContainer = styled.div`
  overflow: hidden;
`;

export const GenreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
