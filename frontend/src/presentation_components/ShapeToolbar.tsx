import { Channel } from 'phoenix';
import styled from 'styled-components';
import { newShapeToChannel } from '../services/ws_api_service';

export const ShapeToolbar = (props: ShapeToolbarProps) => {

    const ToolbarContainer = styled.div`
        position: absolute;
        left: 10px;
        top: 25px;
        bottom: 25px;
        width: 200px;
        z-index: 2;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
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

    return ( 
        <ToolbarContainer>
            <ShapeButton
                onClick={(e) => newShapeToChannel(props.channel, props.docId, 50, 100, 0, 0)}
            >
                <h3>Rectangle</h3>
            </ShapeButton>
            <ShapeButton><h3>Square</h3></ShapeButton>
        </ToolbarContainer>
    );
};

interface ShapeToolbarProps {
    channel: Channel | undefined,
    docId: number
}