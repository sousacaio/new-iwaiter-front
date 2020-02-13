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
export const Button = styled.button`
  background: ${props => props.primary ? "white" : props.primary};
  color: ${props => props.primary ? props.primary : "black"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid  ${props => props.primary ? props.primary : "black"};
  border-radius: 3px;
  transition: 1s;
  &:hover{
    color:${props => props.primary ? "white" : props.primary} ;
    background: ${props => props.primary ? props.primary : 'white'};
    transition:0.5s;   
  }`;


export const Input = styled.input`
padding-right: 15px !important;
border-radius: 3px;
background   : none repeat scroll 0 0 white;
border       : 2px solid  ${props => props.borda ? props.borda : "#d0cccc"};
color        : black;
margin       : 5px 0 10px;
padding      : 9px 15px 10px;
padding-right: 15px;
`;

export const Select = styled.select`
width: 100%;
height: 35px;
background: white;
color:  ${props => props.cor ? props.cor : "black"} ;
padding-left: 5px;
font-size: 14px;
border: none;
margin-left: 10px;
-webkit-animation-duration: 0.55s;
  animation-duration: 0.55s;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
border       : 2px solid  ${props => props.cor ? props.cor : "black"};
option {
  -webkit-animation-duration: 0.55s;
  animation-duration: 0.55s;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
  color:  ${props => props.cor ? "white" : "white"};
  background:  ${props => props.cor ? props.cor : "black"};
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 0px 2px 1px;
}
`;
