import {Position, ResizableDelta, Rnd} from 'react-rnd';
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
                <button onClick={(e) => props.addRectangle()}>Add Rectangle</button>
    
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
    loading: boolean,
    shapes: Array<Shape>,
    logout: (ok_fn: React.Dispatch<React.SetStateAction<boolean>>) => void,
    addRectangle: () => void,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    authToken: string
}