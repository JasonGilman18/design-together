import { ReactNode, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {ReactComponent as DropdownMenuIcon} from "../../svg/DropdownGridIcon.svg";

export const DropdownGrid = (props: DropdownMenuProps) => {
    
    const menuRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        window.addEventListener("click", (e) => openCloseMenu(e));
    }, []);

    function openCloseMenu(e: MouseEvent) {
        const menuBounds = menuRef.current?.getBoundingClientRect();
        if(menuBounds) {
            const horozontal = e.x >= menuBounds.left && e.x <= menuBounds?.right;
            const vertical = e.y >= menuBounds.top && e.y <= menuBounds.bottom;
            props.setMenu(horozontal && vertical);
        }
    }

    return (
        <Container ref={menuRef}>
            <DropdownMenuIcon style={{height: "300px", width: "300px", position: "absolute"}}/>
            <Content>
                {props.children}
            </Content>
        </Container>
    );
};

const FadeIn = keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
`;

const Container = styled.span`
    position: absolute;
    top: 35px;
    left: 50%;
    margin-left: -150px;
    height: 300px;
    width: 300px;
    z-index: 99;
    animation: ${FadeIn} .5s;
`;

const Content = styled.span`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 40px 30px 20px 25px;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 125px 115px;
    justify-items: start;
    align-items: start;
    overflow: hidden;
`;

interface DropdownMenuProps {
    children: ReactNode,
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}