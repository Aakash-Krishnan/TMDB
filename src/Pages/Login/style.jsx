import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
  height: 100vh;
  background: linear-gradient(
    163deg,
    rgba(13, 37, 63, 1) 30%,
    rgba(1, 180, 228, 1) 100%
  );

  img {
    width: 90%;
  }

  h2 {
    color: white;
    margin: 20px 0px;
  }

  .login-approved-button {
    font-size: 20px;
    border-radius: 8px;
  }
`;
