import styled from 'styled-components';

export const Flexrow = styled.div`
  display: flex;
  height: ${(props) => props.altura / 12 * 100}vh;
`

export const Flexcolumn = styled.div`
  text-align: center;
  width: ${(props) => props.size / 12 * 100}vw;
`

export const TotalRow = styled.div`
  display: flex;
  margin:5px;
  height: ${(props) => props.altura / 10 * 100}%;
`
export const TotalColumn = styled.div`
text-align: center;
width: ${(props) => props.size / 10 * 100}%;
`