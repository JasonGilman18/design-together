import { useEffect, useState } from "react";
import styled from "styled-components";
import ComponentTree from "../../classes/ComponentTree";
import {ReactComponent as GridShowIcon} from '../../svg/GridShowIcon.svg';
import { DropdownMenu } from "../dropdowns/DropdownMenu";
import {DropdownTooltip} from "../dropdowns/DropdownTooltip";
import { SlideCheckbox } from "./SlideCheckbox";

export const ShowGridButton = (props: ShowGridButtonProps) => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [highlight, setHighlight] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if(props.showGridlines)
            setHighlight(props.showGridlines);
        else {
            const selectedComponent = props.componentTree.find(props.selectedComponentId);
            if(selectedComponent)
                setHighlight(props.showGridlines || selectedComponent.style.show_grid);
        }
    }, [props.selectedComponentId, props.showGridlines]);

    function showMenu() {
        if(timer) clearTimeout(timer);
        setShowTooltip(false);
        setShowDropdown(val => !val);
    }
    
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

    function showGridItems() {
        props.setComponentTree(prevTree => {
            const selectedComponent = prevTree.find(props.selectedComponentId);
            if(selectedComponent) {
                selectedComponent.updateShowGrid(!selectedComponent.style.show_grid);
                return prevTree.copy();
            }
            else
                return prevTree;
        });
    }

    function getGridItems() {
        const selectedComponent = props.componentTree.find(props.selectedComponentId);
        if(selectedComponent)
            return selectedComponent.style.show_grid;
        else
            return false;
    }

    return (
        <Container>
            <Button 
                onMouseOver={() => hover()}
                onMouseOut={() => leave()}
                onClick={(e) => showMenu()}
                highlight={highlight}
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
            {
                showDropdown
                ? <DropdownMenu setMenu={setShowDropdown}>
                    <SlideLabel style={{gridColumn: "1/3", gridRow: "1/2"}}>Show Document Gridlines</SlideLabel>
                    <SlideCheckbox checked={props.showGridlines} setFunction={props.setShowGridlines}/>
                    <SlideLabel style={{gridColumn: "1/3", gridRow: "2/3"}}>Show Grid Item Containers</SlideLabel>
                    <SlideCheckbox checked={getGridItems()} setFunction={showGridItems}/>
                  </DropdownMenu>
                : null
            }
        </Container>
    );
};

const Button = styled.button<{highlight: boolean}>`
    background-color: ${props => props.highlight?"#e6e6e6":"transparent"};
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

const SlideLabel = styled.h6`
    color: white;
    align-self: center;
    justify-self: end;
    margin: 5px 0px 5px 0px;
`;

const Container = styled.span`
    position: relative;
`;

interface ShowGridButtonProps {
    showGridlines: boolean,
    selectedComponentId: number | null,
    componentTree: ComponentTree,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
};