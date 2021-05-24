import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Component from '../classes/Component';
import {logout} from "../services/http_api_service";

export const MenuToolbar = (props: MenuToolbarProps) => (
    <ToolbarContainer>
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
            props.selectedComponentIndex !== -1
                ? (
                    <>
                        <input type="number" 
                            value={props.components[props.selectedComponentIndex].width}
                            onChange={(e) => props.updateComponentWidth(parseInt(e.target.value))}
                        />
                        <input type="number"
                            value={props.components[props.selectedComponentIndex].height}
                            onChange={(e) => props.updateComponentHeight(parseInt(e.target.value))}
                        />
                    </>
                )
                : null
        }
    </ToolbarContainer>
);

const ToolbarContainer = styled.div`
    grid-column: 1/3;
    grid-row: 1/2;
    background-color: #fbfbfb;
    border: solid 1px #dcdcdc;
`;

interface MenuToolbarProps {
    components: Array<Component>,
    selectedComponentIndex: number,
    componentToolbarWidth: number,
    menuToolbarHeight: number,
    canvasHeight: number,
    canvasWidth: number,
    updateComponentWidth: (width: number) => void,
    updateComponentHeight: (height: number) => void,
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
    setCanvasHeight: React.Dispatch<React.SetStateAction<number>>
}