import styled, { css } from "styled-components";
import {
  MIN_SILVER,
  MIN_GOLD,
  MIN_PLATINUM,
  MIN_DIAMOND,
} from "../../../constants/styles/mediaquerys";

const Bronze = css`
  font-family: Roboto;
  font-weight: bold;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--colorSecondary100);
  margin-bottom: 8px;
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SCompImageWithTextTitle = styled.h5`
  ${Bronze}
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
