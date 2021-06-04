import styled from "styled-components";
import {ReactComponent as DropdownMenuIcon} from "../svg/DropdownMenu.svg";

export const DropdownMenu = (props: any) => (
    <Container>
        <DropdownMenuIcon style={{height: "150px", width: "200px", position: "absolute"}}/>
        <Content>
            {props.children}
        </Content>
    </Container>
);

const Container = styled.span`
    position: absolute;
    left: 50%;
    margin-left: -100px;
    height: 150px;
    width: 200px;
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