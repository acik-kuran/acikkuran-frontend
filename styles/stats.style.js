import styled, { css } from "styled-components";

const StatsContainer = styled.div`
  ${({ theme }) => css`
    min-height: 285px;
    display: flex;
    flex-direction: column;
    width: 100%;

    blockquote {
      width: 100%;
    }

    @media only screen and (max-width: ${theme.sizes.sm}) {
      width: 100%;
      max-width: unset;
    }
  `}
`;

export { StatsContainer };
