import { Channel } from 'phoenix';
import styled from 'styled-components';
import { newShapeToChannel } from '../services/ws_api_service';

export const ShapeToolbar = (props: ShapeToolbarProps) => (

    <ToolbarContainer>
        <ToolbarType>
            <TypeLabel><h5>Containers</h5></TypeLabel>
            <TypeButtonContainer>
                <TypeButton/>
                <TypeButton/>
                <TypeButton/>
                <TypeButton/>
                <TypeButton/>
            </TypeButtonContainer>
        </ToolbarType>
        {/*
        <ShapeButton
            onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0)}
        >
            <h3>Rectangle</h3>
        </ShapeButton>
        <ShapeButton
            onClick={(e) => newShapeToChannel(props.channel, props.docId, 100, 100, 0, 0)}
        >
            <h3>Square</h3>
        </ShapeButton>
        */}
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
    height: 100px;
    width: 100%;
    border: solid 1px #dcdcdc;
    border-top: transparent;
    display: flex;
    flex-wrap: wrap;
`;

const TypeButton = styled.div`
    width: 40px;
    height: 40px;
    background-color: green;
    text-align: center;
    &:hover {
        background-color: blue;
    }
`;

interface ShapeToolbarProps {
    channel: Channel | undefined,
    docId: number
}