import { type } from 'os';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ComponentTree from '../classes/ComponentTree';
import {ReactComponent as MaximizeIcon} from '../icons/maximize.svg';
import {logout} from "../services/http_api_service";
import { SlideCheckbox } from './SlideCheckbox';

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
            <WindowTop>
                <MaximizeButton onClick={(e) => {
                        props.setCanvasWidth(window.innerWidth-props.componentToolbarWidth);
                        props.setCanvasHeight(window.innerHeight-props.menuToolbarHeight);
                    }}
                >
                    <MaximizeIcon width="15px" height="15px"/>
                </MaximizeButton>
                <SlideCheckbox/>
            </WindowTop>
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
        {/*
            <Link
                to={{
                    pathname: "/dashboard"
                }}
            >
                Dashboard
            </Link>
            <button onClick={(e) => logout(props.setAuthenticated)}>Logout</button>
            <button onClick={(e) => {
                props.setCanvasWidth(window.innerWidth-props.componentToolbarWidth);
                props.setCanvasHeight(window.innerHeight-props.menuToolbarHeight);
            }}>
                Resize to Window
            </button>
            <input type="number" value={props.canvasWidth} 
                onChange={(e) => props.setCanvasWidth(parseInt(e.target.value))}
            />
            <input type="number" value={props.canvasHeight} 
                onChange={(e) => props.setCanvasHeight(parseInt(e.target.value))}
            />
            {
                props.selectedComponentId !== -1
                    ? (
                        <>
                            <input type="number" 
                                value={props.componentTree.find(props.selectedComponentId)?.style.width}
                                onChange={(e) => props.updateComponentWidth(parseInt(e.target.value))}
                            />
                            <input type="number"
                                value={props.componentTree.find(props.selectedComponentId)?.style.height}
                                onChange={(e) => props.updateComponentHeight(parseInt(e.target.value))}
                            />
                        </>
                    )
                    : null
            }
        */}
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
    margin: 5px auto 5px auto;
    width: fit-content;
`;

const WindowSection = styled.div`
    grid-column: 1/2;
    grid-row: 2/3;
    border-right: solid 1px #dcdcdc;
`;

const WindowTop = styled.span`
    display: flex;
    width: 100%;
    height: max-content;
`;

const MaximizeButton = styled.button`
    background-color: azure;
    background-image: none;
    background-color: "blue";
    box-shadow: 0px 0px 0px transparent;
    border: solid 1px #dfdfdf;
    height: 30px;
    width: 30px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>
}