import styled from "styled-components";

export const InputBoxTwo = styled.input`
  height: 2.5vh;
  border-radius: 4px;
  border-style: solid;
  outline: none;
  width: 30vw;

  &::placeholder {
    color: black;
    font-size: 0.7rem;
  }
`;

export const InputBox = styled.input`
  height: 4vh;
  border-radius: 4px;
  border-style: solid;
  outline: none;

  &::placeholder {
    color: black;
    font-size: 0.7rem;
  }
`;

export const ButtonD = styled.button`
  height: 4vh;
  color: white;
  background: black;
  font-size: 2vh;
  border-radius: 6px;
  outline: none;

  &:hover {
    cursor: pointer;
  }
`;
