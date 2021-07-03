import { useState } from "react";
import styled from "styled-components";
import {DropdownTooltip} from "../dropdowns/DropdownTooltip";
import {ReactComponent as MaximizeIcon} from '../../svg/maximize.svg';

export const MaximizeButton = (props: MaximizeButtonProps) => {

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
                onClick={(e: any) => {
                    props.setCanvasWidth(window.innerWidth-props.componentToolbarWidth);
                    props.setCanvasHeight(window.innerHeight-props.menuToolbarHeight);
                }}
            >
                <MaximizeIcon/>
            </Button>
            {
                showTooltip
                ? <DropdownTooltip>
                    Maximize Window Size
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
`;

interface MaximizeButtonProps {
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    componentToolbarWidth: number,
    menuToolbarHeight: number
};