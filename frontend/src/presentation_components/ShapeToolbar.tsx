import { Channel } from 'phoenix';
import styled from 'styled-components';
import { newShapeToChannel } from '../services/ws_api_service';

export const ShapeToolbar = (props: ShapeToolbarProps) => (

    <ToolbarContainer>
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
    </ToolbarContainer>
);

const ToolbarContainer = styled.div`
    grid-column: 1/2;
    grid-row: 2/3;
    display: flex;
    flex-direction: column;
    background-color: black;
`;

const ShapeButton = styled.div`
    flex: 50px 0 0;
    width: 100%;
    background-color: grey;
    text-align: center;
    &:hover {
        background-color: blue;
    }
`;

interface ShapeToolbarProps {
    channel: Channel | undefined,
    docId: number
}