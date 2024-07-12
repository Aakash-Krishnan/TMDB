import styled from "styled-components";

export const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0d253f;

  .nav-left {
    cursor: pointer;
  }

  .logo {
    width: 180px;
    height: 50px;
    padding-left: 20px;
  }

  .nav-link-container {
    color: white;
    display: flex;
    align-items: center;
    list-style-type: none;
    gap: 20px;
    padding-right: 20px;
  }

  .nav-items a {
    text-decoration: none;
    color: white;
  }

  .nav-items {
    transform: 3s ease-in-out;
  }

  .nav-items a:hover {
    color: rgb(177, 222, 231);
  }

  .nav-items:last-child {
    padding: 5px;
    border-radius: 8px;
    background-color: #01b4e4;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .nav-items:last-child:hover {
    background-color: #0599c2;
  }

  .nav-items a.nav-link-active {
    color: rgb(20, 164, 193);
  }

  .userName-btn {
    background: inherit;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
  }

  .sign-out-button {
    border: none;
    outline: none;
    background: inherit;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;
