import styled from "styled-components";
import {DropdownMenu} from "./DropdownMenu";
import {DropdownTooltip} from "./DropdownTooltip";
import {ReactComponent as DesktopIcon} from "../svg/DesktopIcon.svg";
import {ReactComponent as MobileIcon} from "../svg/MobileIcon.svg";
import {ReactComponent as MobileIconHorizontal} from "../svg/MobileIconHorizontal.svg";
import {ReactComponent as TabletIcon} from "../svg/TabletIcon.svg";
import {ReactComponent as LaptopIcon} from "../svg/LaptopIcon.svg";
import { useState } from "react";

export const WindowSizeButton = (props: WindowSizeButtonProps) => {
    
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    function showMenu() {
        if(timer) clearTimeout(timer);
        setShowTooltip(false);
        setShowDropdown(val => !val);
    }

    function hover() {
        const timerId = setTimeout(() => {
            if(!showDropdown && !showTooltip)
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
            <ToolbarMenuButton 
                onClick={() => showMenu()}
                onMouseOver={() => hover()}
                onMouseOut={() => leave()}
            >
                <DesktopIcon/>
            </ToolbarMenuButton>
            {
                showTooltip
                    ? <DropdownTooltip>
                        Change Window Size
                      </DropdownTooltip>
                    : null
            }
            {
                showDropdown
                    ? <DropdownMenu setMenu={setShowDropdown}>
                        <DropdownMenuButton onClick={() => props.setCanvasWidth(320)}>
                            <MobileIcon/>
                        </DropdownMenuButton>
                        <DropdownMenuButton onClick={() => props.setCanvasWidth(480)}>
                            <MobileIconHorizontal/>
                        </DropdownMenuButton>
                        <DropdownMenuButton onClick={() => props.setCanvasWidth(769)}>
                            <TabletIcon/>
                        </DropdownMenuButton>
                        <DropdownMenuButton onClick={() => props.setCanvasWidth(1279)}>
                            <LaptopIcon/>
                        </DropdownMenuButton>
                        <DropdownMenuButton onClick={() => props.setCanvasWidth(1440)}>
                            <DesktopIcon/>
                        </DropdownMenuButton>
                      </DropdownMenu>
                    : null
            }
        </Container>
    );
}

const Button = styled.button`
    background-color: transparent;
    box-shadow: 0px 0px 0px transparent;
    border-radius: 3px;
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
`;

const ToolbarMenuButton = styled(Button)`
    &:hover {
        background-color:#e6e6e6;
    }
    & > svg {
        height: 20px;
        width: 20px;
        fill: #282c33;
    }
`;

const DropdownMenuButton = styled(Button)`
    &:hover {
        background-color: #434a56;
    }
    & > svg {
        height: 20px;
        width: 20px;
        fill: white;
    }
`; 

const Container = styled.span`
    position: relative;
`;

interface WindowSizeButtonProps {
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>
}