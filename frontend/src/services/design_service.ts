import Shape from "../classes/shape";

export function drawRectangle(canvas: React.MutableRefObject<HTMLCanvasElement>, shape: Shape) {
    const context = canvas.current.getContext("2d");
    if(context !== null) {
        context.beginPath();
        context.fillStyle = "black";
        context.rect(0, 0, shape.width, shape.height);
        context.stroke();
    }
}

export function selectShape(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, shapes: Shape[]) {
    const canvasPos = e.currentTarget.getBoundingClientRect();
    const mouseXRelativeToCanvas = e.clientX - canvasPos.left;
    const mouseYRelativeToCanvas = e.clientY - canvasPos.top;
    shapes.forEach((shape) => {
        if(shape.withinBounds(mouseXRelativeToCanvas, mouseYRelativeToCanvas)) {
            console.log(shape.id, "selected")
        }
    });
}