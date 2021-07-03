import React, { ReactNode, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import {ReactComponent as DropdownMenuSelectIcon} from "../../svg/DropdownMenuSelectIcon.svg";

export const DropdownMenuSelect = (props: DropdownMenuSelectProps) => {

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
            <DropdownMenuSelectIcon style={{height: "150px", width: "100px", position: "absolute"}}/>
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
    height: 150px;
    width: 100px;
    z-index: 99;
    margin-left: -25px;
    animation: ${FadeIn} .5s;
`;

const Content = styled.span`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 32px 34px 20px 22px;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto auto;
    justify-items: center;
    align-items: center;
    color: white;
    & > *:hover {
        background-color: #434a56;
    }
`;

interface DropdownMenuSelectProps {
    children: ReactNode,
    showDropdown: boolean,
    setMenu: React.Dispatch<React.SetStateAction<boolean>>,
    setDimension: React.Dispatch<React.SetStateAction<string>>
}