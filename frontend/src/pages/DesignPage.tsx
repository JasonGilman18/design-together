import { Channel } from 'phoenix';
import React from 'react';
import {Position, ResizableDelta, Rnd} from 'react-rnd';
import { Link } from 'react-router-dom';
import Shape from '../classes/shape';

export const DesignPage = (props: DesignPageProps) => (

    props.loading
        ?
            <>
                <h1>Design Page Loading</h1>
            </>
        :
            <>
                <h1>Design Page</h1>
                <button onClick={(e) => props.logout(props.setAuthenticated)}>logout</button>
                <button onClick={(e) => props.sendRectangle(props.channel)}>Add Rectangle</button>
                <Link 
                    to={{
                        pathname: "/dashboard"
                    }} 
                    //onClick={(e) => props.resetDesign}
                >
                    Dashboard
                </Link>

                <div style={{height: "500px", width: "500px"}}>
                    {
                        props.shapes.map((shape) => (
                            <Rnd
                                dragGrid={[10,10]}
                                resizeGrid={[10,10]}
                                bounds="parent"
                                size={{height: shape.height, width: shape.width}}
                                //position={{x: shape.positionX, y: shape.positionY}}
                            >
                                <div style={{height: "100%", width: "100%", backgroundColor: "black"}}/>
                            </Rnd>
                        ))
                    }
                </div>
            </>
);

interface DesignPageProps {
    channel: Channel | undefined,
    loading: boolean,
    shapes: Array<Shape>,
    logout: (ok_fn: React.Dispatch<React.SetStateAction<boolean>>) => void,
    sendRectangle: (channel: Channel | undefined) => void,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}