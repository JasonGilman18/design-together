import styled from "styled-components";
import {WindowSizeButton} from '../interactive/WindowSizeButton';
import {MaximizeButton} from '../interactive/MaximizeButton';
import {ShowGridButton} from '../interactive/ShowGridButton';

export const WindowSection = (props: WindowSectionProps) => (
    
    <Section>
        <WindowInputContainer>
            <WindowInput type="text" value={props.canvasWidth}
                maxLength={4} size={6}
                onChange={(e) => props.setCanvasWidth(parseInt(e.target.value))}
            />
            <WindowInputLabel style={{right: "70px"}}>px</WindowInputLabel>
            <WindowInputLabel>x</WindowInputLabel>
            <WindowInput type="text" value={props.canvasHeight}
                maxLength={4} size={6}
                onChange={(e) => props.setCanvasHeight(parseInt(e.target.value))}
            />
            <WindowInputLabel style={{right: "-1px"}}>px</WindowInputLabel>
        </WindowInputContainer>
        <WindowSizeButton setCanvasWidth={props.setCanvasWidth}/>
        <MaximizeButton setCanvasWidth={props.setCanvasWidth}
            setCanvasHeight={props.setCanvasHeight}
            componentToolbarWidth={props.componentToolbarWidth}
            menuToolbarHeight={props.menuToolbarHeight}
        />
        <ShowGridButton setShowGridlines={props.setShowGridlines} showGridlines={props.showGridlines}/>
    </Section>
);

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

const Section = styled.div`
    grid-column: 2/3;
    grid-row: 1/2;
    border-right: solid 1px #dcdcdc;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const WindowInputContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const WindowInputLabel = styled.h3`
    user-select: none;
    font-size: small;
    margin: 0px 5px 0px 5px;
    display: flex;
    align-items: center;
    &:nth-of-type(1), &:nth-of-type(3) {
        font-weight: 400;
        position: absolute;
    }  
`;

const WindowInput = styled.input`
    padding: 3px;
    border-radius: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px inset;
    background-color: whitesmoke;
    &:focus {
        outline: none;
    }
`;

interface WindowSectionProps {
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    canvasWidth: number,
    canvasHeight: number,
    showGridlines: boolean,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>
};