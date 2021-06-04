import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ComponentTree from '../classes/ComponentTree';
import {ReactComponent as MaximizeIcon} from '../svg/maximize.svg';
import { SlideCheckbox } from './SlideCheckbox';
import { SizeButton } from './interactive/SizeButton';
import {ReactComponent as DesktopIcon} from '../svg/desktop.svg';

export const MenuToolbar = (props: MenuToolbarProps) => (
    <ToolbarContainer componentToolbarWidth={props.componentToolbarWidth}>
        <TopSection>
            <Link
                to={{
                    pathname: "/dashboard"
                }}
            >
                Dashboard
            </Link>
            <DocumentName>{props.docName}</DocumentName>
        </TopSection>
        <WindowSection>
            <SectionLabel>Window</SectionLabel>
            <MaximizeButton onClick={(e: any) => {
                    props.setCanvasWidth(window.innerWidth-props.componentToolbarWidth);
                    props.setCanvasHeight(window.innerHeight-props.menuToolbarHeight);
                }}
            >
                <MaximizeIcon width="20px" height="20px"/>
            </MaximizeButton>
            <SlideCheckbox setShowGridlines={props.setShowGridlines}/>
            <SizeButton setCanvasWidth={props.setCanvasWidth}/>
            <WindowInputContainer>
                <WindowInput type="number" value={props.canvasWidth} 
                    onChange={(e) => props.setCanvasWidth(parseInt(e.target.value))}
                />
                <h3 style={{margin: "0px 5px 0px 5px"}}>x</h3>
                <WindowInput type="number" value={props.canvasHeight} 
                    onChange={(e) => props.setCanvasHeight(parseInt(e.target.value))}
                />
            </WindowInputContainer>
        </WindowSection>
        <LayoutSection>
            <SectionLabel>Layout</SectionLabel>
        </LayoutSection>
        <SizeSection>
            <SectionLabel>Size</SectionLabel>
        </SizeSection>
        <StyleSection>
            <SectionLabel>Section</SectionLabel>
        </StyleSection>
    </ToolbarContainer>
);

const ToolbarContainer = styled.div<{componentToolbarWidth: number}>`
    grid-column: 1/3;
    grid-row: 1/2;
    background-color: #fbfbfb;
    border: solid 1px #dcdcdc;
    display: grid;
    grid-template-columns: ${props => props.componentToolbarWidth-1 + "px"} ${props => props.componentToolbarWidth-1 + "px"}
        ${props => props.componentToolbarWidth-1 + "px"} ${props => props.componentToolbarWidth-1 + "px"} auto;
    grid-template-rows: 30% 70%;
`;

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

const TopSection = styled.div`
    grid-column: 1/6;
    grid-row: 1/2;
    border-bottom: solid 1px #dcdcdc;
`;

const DocumentName = styled.h3`
    margin: 0;
    display: inline-block;
`;

const SectionLabel = styled.h5`
    grid-column: 1/4;
    grid-row: 1/2;
    margin: auto;
    width: fit-content;
`;

const WindowSection = styled.div`
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

const LayoutSection = styled.div`
    grid-column: 2/3;
    grid-row: 2/3;
    border-right: solid 1px #dcdcdc;
`;

const SizeSection = styled.div`
    grid-column: 3/4;
    grid-row: 2/3;
    border-right: solid 1px #dcdcdc;
`;

const StyleSection = styled.div`
    grid-column: 4/5;
    grid-row: 2/3;
    border-right: solid 1px #dcdcdc;
`;

interface MenuToolbarProps {
    componentTree: ComponentTree,
    selectedComponentId: number | null,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    docName: string,
    canvasHeight: number,
    canvasWidth: number,
    updateComponentWidth: (width: number) => void,
    updateComponentHeight: (height: number) => void,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>
}