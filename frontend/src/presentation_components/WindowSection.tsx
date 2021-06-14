import styled from "styled-components";
import {SlideCheckbox} from './SlideCheckbox';
import {SizeButton} from './SizeButton';
import {ReactComponent as MaximizeIcon} from '../svg/maximize.svg';
import {ReactComponent as GridShowIcon} from '../svg/GridShowIcon.svg';

export const WindowSection = (props: WindowSectionProps) => (
    
    <Section>
        <WindowInputContainer>
            <WindowInput type="text" value={props.canvasWidth}
                maxLength={4} size={6}
                onChange={(e) => props.setCanvasWidth(parseInt(e.target.value))}
            />
            <WindowInputLabel style={{right: "66px"}}>px</WindowInputLabel>
            <WindowInputLabel>x</WindowInputLabel>
            <WindowInput type="text" value={props.canvasHeight}
                maxLength={4} size={6}
                onChange={(e) => props.setCanvasHeight(parseInt(e.target.value))}
            />
            <WindowInputLabel style={{right: "1px"}}>px</WindowInputLabel>
        </WindowInputContainer>
        <SizeButton setCanvasWidth={props.setCanvasWidth}/>
        <MaximizeButton onClick={(e: any) => {
                props.setCanvasWidth(window.innerWidth-props.componentToolbarWidth);
                props.setCanvasHeight(window.innerHeight-props.menuToolbarHeight);
            }}
        >
            <MaximizeIcon width="18px" height="18px"/>
        </MaximizeButton>
        <GridButton>
            <GridShowIcon style={{width: "20px", height: "20px"}}/>
        </GridButton>
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
    grid-column: 1/2;
    grid-row: 1/2;
    border-right: solid 1px #dcdcdc;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const MaximizeButton = styled(Button)``;

const GridButton = styled(Button)``;

const WindowInputContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const WindowInputLabel = styled.h3`
    user-select: none;
    font-size: small;
    margin: 0px 2px 0px 2px;
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
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>
};