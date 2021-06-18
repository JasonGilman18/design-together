import { useState } from "react";
import styled from "styled-components";
import { DropdownTooltip } from "./DropdownTooltip";
import {ReactComponent as RoundedContainerIcon} from '../svg/RoundedContainerIcon.svg';

export const RoundedContainerButton = (props: RoundedContainerButtonProps) => {
    
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
                onClick={() => props.newComponent("rectangle-filled-rounded")}
            >
                <RoundedContainerIcon/>
            </Button>
            {
                showTooltip
                ? <DropdownTooltip>
                    Container Component
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

interface RoundedContainerButtonProps {
    newComponent: (type: string) => void
};