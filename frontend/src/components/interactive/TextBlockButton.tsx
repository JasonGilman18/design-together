import { useState } from "react";
import styled from "styled-components";
import { DropdownTooltip } from "../dropdowns/DropdownTooltip";
import {ReactComponent as TextIcon} from '../../svg/TextIcon.svg';

export const TextBlockButton = (props: TextButtonProps) => {
    
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    function hover() {
        const timerId = setTimeout(() => {
            if(!showTooltip)
                setShowTooltip(true);
        }, 500);
        setTimer(timerId);
    }

    function leave() {
        setShowTooltip(false);
        if(timer) clearTimeout(timer);
    }

    return (
        <Container>
            <Button
                onMouseOver={() => hover()}
                onMouseOut={() => leave()}
                onClick={() => props.newComponent("text_block")}
            >
                <TextIcon/>
            </Button>
            {
                showTooltip
                ? <DropdownTooltip>
                    Text Block Component
                  </DropdownTooltip>
                : null
            }
        </Container>
    );
};

const Button = styled.button`
    background-color: transparent;
    box-shadow: 0px 0px 0px transparent;
    border-radius: 3px;
    &:hover {
        background-color:#e6e6e6;
    }
    &:focus {
        outline: none;
    }
    border: none;
    height: 30px;
    width: 30px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & > svg {
        height: 20px;
        width: 20px;
        fill: #282c33;
    }
`;

const Container = styled.span`
    position: relative;
    margin-right: 10px;
`;

interface TextButtonProps {
    newComponent: (type: string) => void
};