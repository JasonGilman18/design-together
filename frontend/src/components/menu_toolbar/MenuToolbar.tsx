import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ComponentTree from '../../classes/ComponentTree';
import {WindowSection} from './WindowSection';
import {NewComponentSection} from './NewComponentSection';

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
        <BottomSection componentToolbarWidth={props.componentToolbarWidth}>
            <SettingsSection>
                <SettingsButton>Settings</SettingsButton>
                <SettingsButton>Share</SettingsButton>
            </SettingsSection>
            <WindowSection 
                setCanvasWidth={props.setCanvasWidth}
                setCanvasHeight={props.setCanvasHeight}
                setShowGridlines={props.setShowGridlines}
                componentToolbarWidth={props.componentToolbarWidth}
                menuToolbarHeight={props.menuToolbarHeight}
                canvasWidth={props.canvasWidth}
                canvasHeight={props.canvasHeight}
                showGridlines={props.showGridlines}
            />
            <NewComponentSection newComponent={props.newComponent}/>
        </BottomSection>
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
    grid-template-rows: 50% 50%;
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

const BottomSection = styled.div<{componentToolbarWidth: number}>`
    grid-column: 1/6;
    grid-row: 2/3;
    display: grid;
    grid-template-columns: ${props => props.componentToolbarWidth-1 + "px"} ${props => props.componentToolbarWidth-1 + "px"} auto;
    grid-template-rows: 100%;
`;

const SettingsSection = styled.div`
    grid-column: 1/2;
    grid-row: 1/2;
    border-right: solid 1px #dcdcdc;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SettingsButton = styled.button`
    background-color: transparent;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    color: #282c33;
    border-radius: 3px;
    &:hover {
        background-color:#e6e6e6;
    }
    &:focus {
        outline: none;
    }
    border: none;
    height: 30px;
    width: 75px;
    padding: 0px;
    cursor: pointer;
    margin-right: 25px;
`;

interface MenuToolbarProps {
    componentTree: ComponentTree,
    selectedComponentId: number | null,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    docName: string,
    canvasHeight: number,
    canvasWidth: number,
    showGridlines: boolean,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
    setShowGridlines: React.Dispatch<React.SetStateAction<boolean>>,
    newComponent: (type: string) => void
}