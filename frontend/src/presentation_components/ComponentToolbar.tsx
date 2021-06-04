import styled from 'styled-components';
import {ReactComponent as SquareSVG} from '../svg/square.svg';
import {ReactComponent as SquareFillSVG} from '../svg/square-fill.svg';
import {ReactComponent as SquareRoundedSVG} from '../svg/square-rounded.svg';
import {ReactComponent as SquareFillRoundedSVG} from '../svg/square-fill-rounded.svg';
import {ReactComponent as RectangleSVG} from '../svg/rectangle.svg';
import {ReactComponent as RectangleFillSVG} from '../svg/rectangle-fill.svg';
import {ReactComponent as RectangleRoundedSVG} from '../svg/rectangle-rounded.svg';
import {ReactComponent as RectangleFillRoundedSVG} from '../svg/rectangle-fill-rounded.svg';

export const ComponentToolbar = (props: ComponentToolbarProps) => (

    <ToolbarContainer>
        <ToolbarType>
            <TypeLabel>
                <h5>Containers</h5>
                <h5 onClick={() => props.closeTypeContainer(0)}>X</h5>
            </TypeLabel>
            <TypeButtonContainer 
                style={
                    props.containerOpen[0]
                        ?{height:"100px", border:"solid 1px #dcdcdc", borderTop:"transparent", 
                            borderRight:"transparent", borderLeft:"transparent"
                        }
                        :{height:"0px", border:"none"}
                }
            >
                <TypeButton onClick={(e) => props.newComponent("square")}>
                    <SquareSVG style={{height:"65%", width:"65%"}}/>
                </TypeButton>
                <TypeButton onClick={(e) => props.newComponent("square-filled")}>
                    <SquareFillSVG style={{height:"65%", width:"65%"}}/>
                </TypeButton>
                <TypeButton onClick={(e) => props.newComponent("square-rounded")}>
                    <SquareRoundedSVG style={{height:"65%", width:"65%"}}/>
                </TypeButton>
                <TypeButton onClick={(e) => props.newComponent("square-filled-rounded")}>
                    <SquareFillRoundedSVG style={{height:"65%", width:"65%"}}/>
                </TypeButton>
                <TypeButton onClick={(e) => props.newComponent("rectangle")}>
                    <RectangleSVG style={{height:"75%", width:"75%"}}/>
                </TypeButton>
                <TypeButton onClick={(e) => props.newComponent("rectangle-filled")}>
                    <RectangleFillSVG style={{height:"75%", width:"75%"}}/>
                </TypeButton>
                <TypeButton onClick={(e) => props.newComponent("rectangle-rounded")}>
                    <RectangleRoundedSVG style={{height:"75%", width:"75%"}}/>
                </TypeButton>
                <TypeButton onClick={(e) => props.newComponent("rectangle-filled-rounded")}>
                    <RectangleFillRoundedSVG style={{height:"75%", width:"75%"}}/>
                </TypeButton>
            </TypeButtonContainer>
        </ToolbarType>
    </ToolbarContainer>
);

const ToolbarContainer = styled.div`
    grid-column: 1/2;
    grid-row: 2/3;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fbfbfb;
    border: solid 1px #dcdcdc;
    border-top: none;
    border-left: none;
`;

const ToolbarType = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
`;

const TypeLabel = styled.div`
    height: 35px;
    width: 100%;
    border: solid 1px #dcdcdc;
    border-top: none;
    border-left: none;
    display: flex;
    justify-content: center;
    align-items: center;
    & h5 {
        margin: 0;
    }
`;

const TypeButtonContainer = styled.div`
    transition: height .5s, border .5s;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
`;

const TypeButton = styled.div`
    flex: 25% 0 0;
    height: 49.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    &:hover {
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
`;

interface ComponentToolbarProps {
    containerOpen: Array<boolean>,
    closeTypeContainer: (index: number) => void,
    newComponent: (type: string) => void
}