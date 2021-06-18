import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import {ReactComponent as DropdownTooltipIcon} from "../../svg/DropdownTooltipIcon.svg";

export const DropdownTooltip = (props: DropdownTooltipProps) => (
    <Container>
        <DropdownTooltipIcon style={{width: "200px", height: "50px"}}/>
        <Content>
            {props.children}
        </Content>
    </Container>
);

const FadeIn = keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
`;

const Container = styled.span`
    position: absolute;
    left: 50%;
    margin-left: -100px;
    height: 50px;
    width: 200px;
    z-index: 999;
    animation: ${FadeIn} .5s;
`;

const Content = styled.span`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 27px 32px 4px 32px;
    text-align: center;
    color: white;
    font-size: x-small;
    font-weight: 400;
`;

interface DropdownTooltipProps {
    children: ReactNode
}