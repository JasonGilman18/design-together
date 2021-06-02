import styled from "styled-components";

export const SlideCheckbox = () => (
    <SliderContainer>
        <SliderInput/>
        <SliderShape/>
    </SliderContainer>
);

const SliderContainer = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 30px;
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
    border-radius: 34px;
    &:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 5px;
        bottom: 5px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }
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
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }
`;