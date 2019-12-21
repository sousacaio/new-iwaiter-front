import styled from 'styled-components';

export const Container = styled.div`
 max-width:${props => props.tamanho ? props.tamanho : '1360px'};
 padding-right:15px;
 padding-left:15px;
 margin-right:auto;
 margin-left:auto;
 box-sizing:border-box;
 &:before,
 &after{
     content:"";
     display:table;
 }
 &after{
     clear:both;
 }
`;

export const Row = styled.div`
 width:100%;
 height:auto;
 float:left;
 box-sizing:border-box;
 &:before,
 &after{
     content:"";
     display:table;
 }
 &after{
     clear:both;
 }
`;

export const Column = styled.div`
float:left;
padding:.25rem;
min-height:1px;
box-sizing:border-box;
width:100%;

@media only screen and (min-width:768px){
    width:${props => props.grid ? props.grid / 12 * 100 : '8:33'}%}
`;