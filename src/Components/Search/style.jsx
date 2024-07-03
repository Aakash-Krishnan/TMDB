import styled from "styled-components";

export const BackgroundImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  place-items: center;

  min-height: 400px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin: auto;

  margin: 0 auto;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    background: ${(props) => `url(${props.imgurl})`};
    background-size: cover;
    opacity: 0.5;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 3;
  color: #fff;
  height: 100%;

  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  gap: 40px;
  padding: 0px;

  .search-title {
    line-height: 2.5rem;
  }

  .search-select-wrapper {
    display: flex;
    gap: 10px;
  }

  .search-select {
    width: 124px;
    color: white;
    border: 1px solid white;
  }

  .search-form {
    width: 100%;
    border-radius: 20px;
    color: red;
  }

  .search-input {
    color: white;
    border-radius: 48px !important;
  }

  .search-label {
    border: 2px solid white;
    color: white;
    font-weight: 800;
    letter-spacing: 1px;
    font-size: 20px;
    border-radius: 80xp;
    outline: none;
  }

  .search-icon {
    color: white;
    cursor: pointer;
  }
`;
