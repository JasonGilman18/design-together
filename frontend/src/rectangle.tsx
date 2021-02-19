import React, { useEffect, useState } from 'react';

function Rectangle(props: any)
{
    return(

        <div onDrag={(e) => props.func_sendMovementToServer(e, props.shapeKey)} style={{backgroundColor: "black", height: "50px", width: "100px"}}></div>

    )
}

export default Rectangle;