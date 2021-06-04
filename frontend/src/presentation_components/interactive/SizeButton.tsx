import { useState } from "react";
import styled from "styled-components";
import {DropdownMenu} from "../DropdownMenu";
import {ReactComponent as DesktopIcon} from "../../svg/desktop.svg";
import {ReactComponent as MobileIcon} from "../../svg/mobile.svg";
import {ReactComponent as TabletIcon} from "../../svg/tablet.svg";
import {ReactComponent as LaptopIcon} from "../../svg/laptop.svg";

export const SizeButton = (props: SizeButtonProps) => {
    
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    
    return (
        <Container>
            <SizeBtn onClick={(e) => setShowDropdown(val => !val)}>
                <DesktopIcon style={{height: "20px", width: "20px"}}/>
            </SizeBtn>
            {
                showDropdown
                    ? <DropdownMenu>
                        <Button onClick={() => props.setCanvasWidth(320)}>
                            <MobileIcon style={{height: "20px", width: "20px", color: "white"}}/>
                        </Button>
                        <Button onClick={() => props.setCanvasWidth(480)}>
                            <MobileIcon style={{height: "20px", width: "20px", transform: "rotate(90deg)", color: "white"}}/>
                        </Button>
                        <Button onClick={() => props.setCanvasWidth(769)}>
                            <TabletIcon style={{height: "20px", width: "20px", color: "white"}}/>
                        </Button>
                        <Button onClick={() => props.setCanvasWidth(1279)}>
                            <LaptopIcon style={{height: "20px", width: "20px", color: "white"}}/>
                        </Button>
                        <Button onClick={() => props.setCanvasWidth(1440)}>
                            <DesktopIcon style={{height: "20px", width: "20px", color: "white"}}/>
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
    grid-column: 2/3;
    grid-row: 2/3;
`;

interface SizeButtonProps {
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>
}