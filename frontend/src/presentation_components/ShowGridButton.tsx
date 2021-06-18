import { useState } from "react";
import styled from "styled-components";
import {ReactComponent as GridShowIcon} from '../svg/GridShowIcon.svg';
import {DropdownTooltip} from "./DropdownTooltip";

export const ShowGridButton = (props: ShowGridButtonProps) => {

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
                onClick={(e: any) => props.setShowGridlines(val => !val)}
                showGridlines={props.showGridlines}
            >
                <GridShowIcon/>
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

const Button = styled.button<{showGridlines: boolean}>`
    background-color: ${props => props.showGridlines?"#e6e6e6":"transparent"};
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

interface ShowGridButtonProps {
    showGridlines: boolean,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>
};