import styled from 'styled-components';

export const Flexrow = styled.div`
  display: flex;
  height: ${(props) => props.altura / 12 * 100}vh;
`

export const Flexcolumn = styled.div`
  text-align: center;
  ${(props) => props.flutua === true ? 'top: 50px; position: fixed;' : ''}
  width: ${(props) => props.size / 12 * 100}vw;
`

export const TotalRow = styled.div`
  display: flex;
  margin:5px;
  height: ${(props) => props.altura / 10 * 100}%;
  width: ${(props) => props.largura / 10 * 100}%;
`
export const TotalColumn = styled.div`
text-align: center;
width: ${(props) => props.size / 10 * 100}%;
${(props) => props.absoluto === true ? 'position:absolute;left:30vw' : ''};
  display: grid;
  grid-template-columns:auto auto;
`