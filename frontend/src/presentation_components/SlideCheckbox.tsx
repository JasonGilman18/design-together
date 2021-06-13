import styled from "styled-components";

export const SlideCheckbox = (props: SlideCheckboxProps) => (
    <SliderContainer>
        <SliderInput onClick={(e) => props.setShowGridlines(prev => !prev)}/>
        <SliderShape>
            <LeftLabel>Grid</LeftLabel>
            <RightLabel>Grid</RightLabel>
        </SliderShape>
    </SliderContainer>
);

const SliderContainer = styled.label`
    grid-column: 3/4;
    grid-row: 2/3;
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
`;

const SliderShape = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 10px;
    &:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 5px;
        bottom: 3.25px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 7px;
    }
`;

const LeftLabel = styled.h6`
    position: absolute;
    margin: 0px;
    left: 4px;
    bottom: 5px;
    font-size: 10px;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: display .3s;
    transition: .3s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const RightLabel = styled.h6`
    position: absolute;
    margin: 0px;
    right: 4px;
    bottom: 5px;
    font-size: 10px;
    -webkit-transition: .3s;
    transition: .3s;
    visibility: visible;
    opacity: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const SliderInput = styled.input.attrs(props => ({
    type: "checkbox"
}))`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + ${SliderShape} {
        background-color: #2196F3;
    }
    &:focus + ${SliderShape} {
        box-shadow: 0 0 1px #2196F3;
    }
    &:checked + ${SliderShape}:before {
        -webkit-transform: translateX(21px);
        -ms-transform: translateX(21px);
        transform: translateX(21px);
    }
    &:checked + ${SliderShape} ${LeftLabel} {
        visibility: visible;
        opacity: 1;
    }
    &:checked + ${SliderShape} ${RightLabel} {
        visibility: hidden;
        opacity: 0;
    }
`;

interface SlideCheckboxProps {
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>
}