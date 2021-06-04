import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import {ReactComponent as DropdownMenuIcon} from "../svg/DropdownMenu.svg";

export const DropdownMenu = (props: DropdownMenuProps) => {
    
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
            <DropdownMenuIcon style={{height: "150px", width: "200px", position: "absolute"}}/>
            <Content>
                {props.children}
            </Content>
        </Container>
    );
};

const Container = styled.span`
    position: absolute;
    left: 50%;
    margin-left: -100px;
    height: 150px;
    width: 200px;
    z-index: 99;
`;

const Content = styled.span`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 40px 20px 10px 20px;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto auto auto;
    justify-items: center;
    align-items: center;
`;

interface DropdownMenuProps {
    children: ReactNode;
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}