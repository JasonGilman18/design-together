import styled from "styled-components";
import {SlideCheckbox} from './SlideCheckbox';
import {SizeButton} from './SizeButton';
import {ReactComponent as MaximizeIcon} from '../svg/maximize.svg';

export const WindowSection = (props: WindowSectionProps) => (
    <Section>
        <SectionLabel>Window</SectionLabel>
        <MaximizeButton onClick={(e: any) => {
                props.setCanvasWidth(window.innerWidth-props.componentToolbarWidth);
                props.setCanvasHeight(window.innerHeight-props.menuToolbarHeight);
            }}
        >
            <MaximizeIcon width="18px" height="18px"/>
        </MaximizeButton>
        <SlideCheckbox setShowGridlines={props.setShowGridlines}/>
        <SizeButton setCanvasWidth={props.setCanvasWidth}/>
        <WindowInputContainer>
            <WindowInput type="number" value={props.canvasWidth} 
                onChange={(e) => props.setCanvasWidth(parseInt(e.target.value))}
            />
            <h3 style={{margin: "0px 5px 0px 5px", userSelect: "none"}}>x</h3>
            <WindowInput type="number" value={props.canvasHeight} 
                onChange={(e) => props.setCanvasHeight(parseInt(e.target.value))}
            />
        </WindowInputContainer>
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

const SectionLabel = styled.h5`
    grid-column: 1/4;
    grid-row: 1/2;
    margin: auto;
    width: fit-content;
    user-select: "none";
`;

const Section = styled.div`
    grid-column: 1/2;
    grid-row: 2/3;
    border-right: solid 1px #dcdcdc;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: 25px repeat(2, minmax(0, 1fr));
    justify-items: center;
    align-items: center;
`;

const MaximizeButton = styled(Button)`
    grid-column: 1/2;
    grid-row: 2/3;
`;

const WindowInputContainer = styled.span`
    grid-column: 1/4;
    grid-row: 3/4;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WindowInput = styled.input`
    width: 25%;
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