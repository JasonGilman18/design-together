import { Channel } from 'phoenix';
import { useState } from 'react';
import styled from 'styled-components';
import { newShapeToChannel } from '../services/ws_api_service';
import {ReactComponent as SquareSVG} from '../icons/square.svg';
import {ReactComponent as SquareFillSVG} from '../icons/square-fill.svg';
import {ReactComponent as SquareRoundedSVG} from '../icons/square-rounded.svg';
import {ReactComponent as SquareFillRoundedSVG} from '../icons/square-fill-rounded.svg';
import {ReactComponent as RectangleSVG} from '../icons/rectangle.svg';
import {ReactComponent as RectangleFillSVG} from '../icons/rectangle-fill.svg';
import {ReactComponent as RectangleRoundedSVG} from '../icons/rectangle-rounded.svg';
import {ReactComponent as RectangleFillRoundedSVG} from '../icons/rectangle-fill-rounded.svg';

export const ShapeToolbar = (props: ShapeToolbarProps) => {

    const [containerOpen, setContainerOpen] = useState<Array<boolean>>([true])

    return (
    <ToolbarContainer>
        <ToolbarType>
            <TypeLabel>
                <h5>Containers</h5>
                <h5 onClick={() => setContainerOpen(arr => {
                        const copyArr = [...arr];
                        copyArr[0] = !copyArr[0];
                        return copyArr;
                    })}
                >X</h5>
            </TypeLabel>
            <TypeButtonContainer 
                style={
                    containerOpen[0]
                        ?{height:"100px", border:"solid 1px #dcdcdc", borderTop:"transparent", borderRight:"transparent", borderLeft:"transparent"}
                        :{height:"0px", border:"none"}
                }
            >
                <TypeButton
                    onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 50, 0, 0, false, 0)}
                >
                    <SquareSVG style={{height:"65%", width:"65%"}}/>
                </TypeButton>
                <TypeButton
                    onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 50, 0, 0, true, 0)}
                >
                    <SquareFillSVG style={{height:"65%", width:"65%"}}/>
                </TypeButton>
                <TypeButton
                    onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 50, 0, 0, false, 15)}
                >
                    <SquareRoundedSVG style={{height:"65%", width:"65%"}}/>
                </TypeButton>
                <TypeButton
                    onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 50, 0, 0, true, 15)}
                >
                    <SquareFillRoundedSVG style={{height:"65%", width:"65%"}}/>
                </TypeButton>
                <TypeButton
                    onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0, false, 0)}
                >
                    <RectangleSVG style={{height:"75%", width:"75%"}}/>
                </TypeButton>
                <TypeButton
                    onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0, true, 0)}
                >
                    <RectangleFillSVG style={{height:"75%", width:"75%"}}/>
                </TypeButton>
                <TypeButton
                    onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0, false, 15)}
                >
                    <RectangleRoundedSVG style={{height:"75%", width:"75%"}}/>
                </TypeButton>
                <TypeButton
                    onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0, true, 15)}
                >
                    <RectangleFillRoundedSVG style={{height:"75%", width:"75%"}}/>
                </TypeButton>
            </TypeButtonContainer>
        </ToolbarType>
    </ToolbarContainer>)
};

const ToolbarContainer = styled.div`
    grid-column: 1/2;
    grid-row: 2/3;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fbfbfb;
    border: solid 1px #dcdcdc;
    border-top: transparent;
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
    border-top: transparent;
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

interface ShapeToolbarProps {
    channel: Channel | undefined,
    docId: number
}