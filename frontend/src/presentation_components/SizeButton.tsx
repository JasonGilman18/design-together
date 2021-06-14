import { useState } from "react";
import styled from "styled-components";
import {DropdownMenu} from "./DropdownMenu";
import {ReactComponent as DesktopIcon} from "../svg/DesktopIcon.svg";
import {ReactComponent as MobileIcon} from "../svg/mobile.svg";
import {ReactComponent as TabletIcon} from "../svg/tablet.svg";
import {ReactComponent as LaptopIcon} from "../svg/laptop.svg";

export const SizeButton = (props: SizeButtonProps) => {
    
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    
    return (
        <Container>
            <SizeBtn onClick={(e) => setShowDropdown(val => !val)}>
                <DesktopIcon style={{height: "20px", width: "20px"}}/>
            </SizeBtn>
            {
                showDropdown
                    ? <DropdownMenu setMenu={setShowDropdown}>
                        <Button onClick={() => props.setCanvasWidth(320)}>
                            <MobileIcon style={{height: "18px", width: "18px", color: "white"}}/>
                        </Button>
                        <Button onClick={() => props.setCanvasWidth(480)}>
                            <MobileIcon style={{height: "18px", width: "18px", transform: "rotate(90deg)", color: "white"}}/>
                        </Button>
                        <Button onClick={() => props.setCanvasWidth(769)}>
                            <TabletIcon style={{height: "18px", width: "18px", color: "white"}}/>
                        </Button>
                        <Button onClick={() => props.setCanvasWidth(1279)}>
                            <LaptopIcon style={{height: "18px", width: "18px", color: "white"}}/>
                        </Button>
                        <Button onClick={() => props.setCanvasWidth(1440)}>
                            <DesktopIcon style={{height: "18px", width: "18px", color: "white"}}/>
                        </Button>
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
    &:hover {
        background-color:#e6e6e6;
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

const Container = styled.span`
    position: relative;
`;

const SizeBtn = styled(Button)`
    
`;

interface SizeButtonProps {
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>
}