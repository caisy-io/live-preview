import styled, { css } from "styled-components";
import {
  MIN_SILVER,
  MIN_GOLD,
  MIN_PLATINUM,
  MIN_DIAMOND,
} from "./mediaqueries";

const Bronze = css`
  width: 100px;
  height: 48px;
  border-radius: 8px;
  background-color: rgba(0, 140, 255, 0.8);

  &:hover {
    background-color: rgba(0, 140, 255, 1);
  }
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SPreviewElement = styled.div`
  ${Bronze}
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
