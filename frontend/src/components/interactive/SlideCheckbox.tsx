import { useEffect, useState } from "react";
import styled from "styled-components";

export const SlideCheckbox = (props: SlideCheckboxProps) => {
    
    const [checked, setChecked] = useState<boolean>(props.checked);

    useEffect(() => {
        if(props.checked !== checked)
            setChecked(props.checked);
    }, [props.checked]);

    return (
        <SliderContainer>
            <SliderInput 
                checked={props.checked}
                onClick={(e) => props.setFunction(prev => !prev)}
                onChange={(e) => setChecked(prev => !prev)}
            />
            <SliderShape>
            </SliderShape>
        </SliderContainer>
    );
};

const SliderContainer = styled.label`
    grid-column: 3/5;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
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
        height: 13px;
        width: 13px;
        left: 3px;
        bottom: 3.25px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 7px;
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
        -webkit-transform: translateX(21px);
        -ms-transform: translateX(21px);
        transform: translateX(21px);
    }
`;

interface SlideCheckboxProps {
    setFunction: React.Dispatch<React.SetStateAction<boolean>>,
    checked: boolean
}