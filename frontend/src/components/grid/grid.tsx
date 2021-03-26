import React, { useEffect, useRef, useState } from 'react';

function Grid(props: any)
{
    const [windowHeight, setWindowHeight] = useState<number>();
    const [windowWidth, setWindowWidth] = useState<number>();
    const [grid, setGrid] = useState<Array<JSX.Element>>();
    const designGrid = useRef<HTMLDivElement>(document.createElement("div"));

    useEffect(() => {
        window.addEventListener('resize', handleResize, false);
    }, []);

    useEffect(() => {

        const GRID_SIZE = 10;
        const num_cols = Math.floor(props.designContainer.current.offsetWidth / GRID_SIZE);
        const num_rows = Math.floor(props.designContainer.current.offsetHeight / GRID_SIZE);

        props.designContainer.current.style.width = (num_cols * GRID_SIZE) + "px";
        props.designContainer.current.style.height = (num_rows * GRID_SIZE) + "px";
        designGrid.current.style.gridTemplateColumns = "repeat("+ num_cols +", 10px)";
        designGrid.current.style.gridTemplateRows = "repeat("+ num_rows +", 10px)";

        var tempGrid = [];
        for(let r=0;r<num_rows;r++)
        {
            for(let c=0;c<num_cols;c++)
            {
                var style: React.CSSProperties = {};
                if(c == num_cols-1 && r != num_rows-1)
                    style.borderBottom = "1px solid black";
                else if(r == num_rows-1 && c != num_cols-1)
                    style.borderRight = "1px solid black";
                else if(r != num_rows-1 && c != num_cols-1)
                {
                    style.borderBottom = "1px solid black";
                    style.borderRight = "1px solid black";
                }

                const cell = <div key={r + ":" + c} className="cell" style={style}></div>;
                tempGrid.push(cell);
            }
        }

        setGrid(tempGrid);

    }, []);

    function handleResize()
    {

    }

    return(
        <div ref={designGrid} className="design-grid">
            {props.showGrid ? grid : null}
            {props.children}
        </div>
    )
}

export default Grid;