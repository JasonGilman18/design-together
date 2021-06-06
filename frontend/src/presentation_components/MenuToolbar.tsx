import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ComponentTree from '../classes/ComponentTree';
import {WindowSection} from './WindowSection';
import {LayoutSection} from './LayoutSection';
import {SizeSection} from './SizeSection';

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
        <WindowSection 
            setCanvasWidth={props.setCanvasWidth}
            setCanvasHeight={props.setCanvasHeight}
            setShowGridlines={props.setShowGridlines}
            componentToolbarWidth={props.componentToolbarWidth}
            menuToolbarHeight={props.menuToolbarHeight}
            canvasWidth={props.canvasWidth}
            canvasHeight={props.canvasHeight}
        />
        <LayoutSection/>
        <SizeSection
            updateComponentWidth={props.updateComponentWidth}
            updateComponentHeight={props.updateComponentHeight}
            selectedComponentId={props.selectedComponentId}
            componentTree={props.componentTree}
        />
        <StyleSection>
            <SectionLabel>Style</SectionLabel>
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

const SectionLabel = styled.h5`
    grid-column: 1/4;
    grid-row: 1/2;
    margin: auto;
    width: fit-content;
    user-select: "none";
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