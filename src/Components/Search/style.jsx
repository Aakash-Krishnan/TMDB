import styled from "styled-components";

export const BackgroundImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  place-items: center;

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
  margin-top: 50px;
  position: relative;
  z-index: 3;
  color: #fff;
  padding: 20px;
  height: 100%;

  width: 90%;

  display: flex;
  gap: 40px;
  /* border: 1px solid red; */
  padding: 0px;
`;
