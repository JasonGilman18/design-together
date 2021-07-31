import ComponentTree from "./ComponentTree";

export default class Component {
    id: number;
    document_id: number;
    updateRequired: boolean;
    type: string;
    style: ComponentStyle;
    node: {
        parent: Component | null,
        children: Component[]
    };

    public constructor(componentId: number, documentId: number, parent: Component | null, type: string, componentData?: ComponentData) {
        var height = 0;
        var width = 0;
        var rounded = 0;
        var text_size = 0;
        var text_bold = false;
        var newType = type;
        if(type === "container_rectangle") {
            height = 50;
            width = 100;
        }
        else if(type === "container_rectangle_rounded") {
            height = 50;
            width = 100;
            rounded = 15;
        }
        else if(type === "text_header_one") {
            height = 100;
            width = 100;
            text_size = 75;
            text_bold = true;
        }
        else if(type === "text_header_two") {
            height = 75;
            width = 100;
            text_size = 50;
            text_bold = true;
        }
        else if(type === "text_header_three") {
            height = 50;
            width = 100;
            text_size = 30;
            text_bold = false;
        }
        else if(type === "text_block") {
            height = 50;
            width = 50;
            text_size = 20;
            text_bold = false;
        }
        else if(type.substring(0, type.indexOf("_")) === "grid") {
            var pos = type.indexOf("_");
            var rows = parseFloat(type.substring(pos+1, type.indexOf("_", pos+1))); 
            pos  = type.indexOf("_", pos+1);
            var cols = parseFloat(type.substring(pos+1, type.indexOf("_", pos+1)));
            pos  = type.indexOf("_", pos+1);
            width = parseFloat(type.substring(pos+1, type.indexOf("_", pos+1)));
            pos  = type.indexOf("_", pos+1);
            height = parseFloat(type.substring(pos+1));
            newType = "grid_" + rows + "_" + cols;
        }
        this.id = componentId;
        this.document_id = documentId;
        this.updateRequired = true;
        this.type = newType;
        this.node = {
            parent: parent,
            children: []
        };
        this.style = {
            position_x: componentData ? componentData.position_x : 0,
            position_y: componentData ? componentData.position_y : 0,
            height: componentData ? componentData.height : height,
            width: componentData ? componentData.width : width,
            rounded: componentData ? componentData.rounded : rounded,
            selected: type === "document",
            align_horizontal: componentData ? componentData.align_horizontal : "start",
            align_vertical: componentData ? componentData.align_vertical : "start",
            margin_top: componentData ? componentData.margin_top : 0,
            margin_right: componentData ? componentData.margin_right : 0,
            margin_bottom: componentData ? componentData.margin_bottom : 0,
            margin_left: componentData ? componentData.margin_left : 0,
            padding_top: componentData ? componentData.padding_top : 0,
            padding_right: componentData ? componentData.padding_right : 0,
            padding_bottom: componentData ? componentData.padding_bottom : 0,
            padding_left: componentData ? componentData.padding_left : 0,
            background: componentData ? componentData.background : "transparent",
            border: componentData ? componentData.border : true,
            text: componentData ? componentData.text : "",
            text_size: componentData ? componentData.text_size : text_size,
            text_bold: componentData ? componentData.text_bold : text_bold,
            show_grid: componentData ? componentData.show_grid : true
        };
    }

    public getTotalWidth() {
        return this.style.width + this.style.margin_left + this.style.margin_right;
    }

    public getTotalHeight() {
        return this.style.height + this.style.margin_top + this.style.margin_bottom;
    }

    public updatePositionX(position_x: number) {
        //border width instead of 1
        if(this.style.position_x !== position_x) {
            this.style.position_x = position_x;
            this.updateRequired = true;
        }
    }

    public updatePositionY(position_y: number) {
        if(this.style.position_y !== position_y) {
            this.style.position_y = position_y;
            this.updateRequired = true;
        }
    }

    public updateHeight(height: number) {
        if(this.style.height !== height) {
            this.style.height = height;
            this.updateRequired = true;
        }
    }

    public updateWidth(width: number) {
        if(this.style.width !== width) {
            this.style.width = width;
            this.updateRequired = true;
        }
    }

    public updateRounded(rounded: number) {
        if(this.style.rounded !== rounded) {
            this.style.rounded = rounded;
            this.updateRequired = true;
        }
    }

    public updateAlignHorizontal(align_horizontal: string) {
        if(this.style.align_horizontal !== align_horizontal) {
            this.style.align_horizontal = align_horizontal;
            this.updateRequired = true;
        }
    }

    public updateAlignVertical(align_vertical: string) {
        if(this.style.align_vertical !== align_vertical) {
            this.style.align_vertical = align_vertical;
            this.updateRequired = true;
        }
    }

    public updateMarginTop(margin_top: number) {
        if(this.style.margin_top !== margin_top) {
            this.style.margin_top = margin_top;
            this.updateRequired = true;
        }
    }

    public updateMarginRight(margin_right: number) {
        if(this.style.margin_right !== margin_right) {
            this.style.margin_right = margin_right;
            this.updateRequired = true;
        }
    }

    public updateMarginBottom(margin_bottom: number) {
        if(this.style.margin_bottom !== margin_bottom) {
            this.style.margin_bottom = margin_bottom;
            this.updateRequired = true;
        }
    }

    public updateMarginLeft(margin_left: number) {
        if(this.style.margin_left !== margin_left) {
            this.style.margin_left = margin_left;
            this.updateRequired = true;
        }
    }

    public updatePaddingTop(padding_top: number) {
        if(this.style.padding_top !== padding_top) {
            this.style.padding_top = padding_top;
            this.updateRequired = true;
        }
    }

    public updatePaddingRight(padding_right: number) {
        if(this.style.padding_right !== padding_right) {
            this.style.padding_right = padding_right;
            this.updateRequired = true;
        }
    }

    public updatePaddingBottom(padding_bottom: number) {
        if(this.style.padding_bottom !== padding_bottom) {
            this.style.padding_bottom = padding_bottom;
            this.updateRequired = true;
        }
    }

    public updatePaddingLeft(padding_left: number) {
        if(this.style.padding_left !== padding_left) {
            this.style.padding_left = padding_left;
            this.updateRequired = true;
        }
    }

    public updateBackground(background: string) {
        if(this.style.background !== background) {
            this.style.background = background;
            this.updateRequired = true;
        }
    }

    public updateText(text: string) {
        if(this.style.text !== text) {
            this.style.text = text;
            this.updateRequired = true;
        }
    }

    public updateTextSize(text_size: number) {
        if(this.style.text_size !== text_size) {
            this.style.text_size = text_size;
            this.updateRequired = true;
        }
    }

    public updateTextBold(text_bold: boolean) {
        if(this.style.text_bold !== text_bold) {
            this.style.text_bold = text_bold;
            this.updateRequired = true;
        }
    }

    public updateShowGrid(show_grid: boolean) {
        if(this.style.show_grid !== show_grid) {
            this.style.show_grid = show_grid;
            this.updateRequired = true;
        }
    }

    public addChild(component: Component) {
        component.node.parent = this;
        this.node.children.push(component);
    }

    public removeChild(component: Component) {
        this.node.children.forEach((c, index) => {
            if(component.id === c.id) {
                this.node.children.splice(index);
            }
        });
    }

    public getComponentBounds(): Bounds {
        return {
            topLeft: {x: this.style.position_x, y: this.style.position_y},
            topRight: {x: this.style.position_x + this.style.width, y: this.style.position_y},
            bottomLeft: {x: this.style.position_x, y: this.style.position_y + this.style.height},
            bottomRight: {x: this.style.position_x + this.style.width, y: this.style.position_y + this.style.height}
        }
    }

    public getResizeBounds(): ResizeBounds {
        const shapeBounds = this.getComponentBounds();
        const radius = 5;
        return {
            topLeftResize: {
                topLeft: {x: shapeBounds.topLeft.x-radius, y: shapeBounds.topLeft.y-radius},
                topRight: {x: shapeBounds.topLeft.x+radius, y: shapeBounds.topLeft.y-radius},
                bottomLeft: {x: shapeBounds.topLeft.x-radius, y: shapeBounds.topLeft.y+radius},
                bottomRight: {x: shapeBounds.topLeft.x+radius, y: shapeBounds.topLeft.y+radius}
            },
            topRightResize: {
                topLeft: {x: shapeBounds.topRight.x-radius, y: shapeBounds.topRight.y-radius},
                topRight: {x: shapeBounds.topRight.x+radius, y: shapeBounds.topRight.y-radius},
                bottomLeft: {x: shapeBounds.topRight.x-radius, y: shapeBounds.topRight.y+radius},
                bottomRight: {x: shapeBounds.topRight.x+radius, y: shapeBounds.topRight.y+radius}
            },
            bottomLeftResize: {
                topLeft: {x: shapeBounds.bottomLeft.x-radius, y: shapeBounds.bottomLeft.y-radius},
                topRight: {x: shapeBounds.bottomLeft.x+radius, y: shapeBounds.bottomLeft.y-radius},
                bottomLeft: {x: shapeBounds.bottomLeft.x-radius, y: shapeBounds.bottomLeft.y+radius},
                bottomRight: {x: shapeBounds.bottomLeft.x+radius, y: shapeBounds.bottomLeft.y+radius}
            },
            bottomRightResize: {
                topLeft: {x: shapeBounds.bottomRight.x-radius, y: shapeBounds.bottomRight.y-radius},
                topRight: {x: shapeBounds.bottomRight.x+radius, y: shapeBounds.bottomRight.y-radius},
                bottomLeft: {x: shapeBounds.bottomRight.x-radius, y: shapeBounds.bottomRight.y+radius},
                bottomRight: {x: shapeBounds.bottomRight.x+radius, y: shapeBounds.bottomRight.y+radius}
            }
        };
    }

    public withinComponentBounds(mouseX: number, mouseY: number): boolean {
        const bounds = this.getComponentBounds();
        return this.withinBounds(bounds, mouseX, mouseY);
    }

    public withinResizeBounds(mouseX: number, mouseY: number): string {
        const resizeBounds = this.getResizeBounds();
        return this.withinBounds(resizeBounds.topLeftResize, mouseX, mouseY)
            ? "topLeft"
            : this.withinBounds(resizeBounds.topRightResize, mouseX, mouseY)
            ? "topRight"
            : this.withinBounds(resizeBounds.bottomLeftResize, mouseX, mouseY)
            ? "bottomLeft"
            : this.withinBounds(resizeBounds.bottomRightResize, mouseX, mouseY)
            ? "bottomRight"
            : "";
    }

    public overlapping(component: Component): boolean {
        const thisBounds = this.getComponentBounds();
        const bounds = component.getComponentBounds();
        const colOverlap = !(thisBounds.topLeft.x > bounds.bottomRight.x || thisBounds.bottomRight.x < bounds.topLeft.x);
        const rowOverlap = !(thisBounds.topLeft.y > bounds.bottomRight.y || thisBounds.bottomRight.y < bounds.topLeft.y);
        return colOverlap || rowOverlap;
    }

    private withinBounds(bounds: Bounds, mouseX: number, mouseY: number): boolean {
        return (bounds.topLeft.x <= mouseX && bounds.topLeft.y <= mouseY)
            ? (bounds.bottomRight.x >= mouseX && bounds.bottomRight.y >= mouseY)
            : false;
    }
}

type Bounds = {
    topLeft: {x: number, y: number}, 
    topRight: {x: number, y: number}, 
    bottomLeft: {x: number, y: number}, 
    bottomRight: {x: number, y: number}
};
type ResizeBounds = {
    topLeftResize: Bounds, 
    topRightResize: Bounds, 
    bottomLeftResize: Bounds, 
    bottomRightResize: Bounds
};
type ComponentStyle = {
    position_x: number,
    position_y: number,
    height: number,
    width: number,
    rounded: number,
    selected: boolean,
    align_horizontal: string,
    align_vertical: string,
    margin_top: number,
    margin_right: number,
    margin_bottom: number,
    margin_left: number,
    padding_top: number,
    padding_right: number,
    padding_bottom: number,
    padding_left: number,
    background: string,
    border: boolean,
    text: string,
    text_size: number,
    text_bold: boolean,
    show_grid: boolean
}

export type ComponentData  = ComponentStyle & {
    id: number,
    parent_id: number,
    document_id: number,
    type: string
}