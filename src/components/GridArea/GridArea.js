import styled from 'styled-components';

export const Container = styled.div`
margin:0;
width:100vw;
height:100vh;
`;
export const Coluna = styled.div`
${(props) => props.width ? `width:${props.width}%` : ''}
${(props) => props.height ? `height:${props.height}%` : ''}
${(props) => props.flex ? `display:flex;
 justify-content: ${props.flex};
 flex-direction:column` : ''}
`;
export const Linha = styled.div`
${(props) => props.width ? `width:${props.width}%` : ''}
${(props) => props.height ? `height:${props.height}%` : ''}
${(props) => props.flex ? `display:flex;
 justify-content: ${props.flex};
 flex-direction:row` : ''}
`;

export const Li = styled.li`
${(props) => props.width ? `width:${props.width}%` : ''}
${(props) => props.height ? `height:${props.height}%` : ''}
`;

export const Cont = styled.div`
height:100vh;
width:100vw;
margin:0px;
`;
export const Flexrow = styled.div`
  display: flex;
  height: ${(props) => props.size / 10 * 100}%;
  width:100%;
`

export const Flexcolumn = styled.div`
  width: ${(props) => props.size / 10 * 100}%;
  height:100%;
`
