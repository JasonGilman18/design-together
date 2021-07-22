import { useEffect, useState } from "react";
import styled from "styled-components";
import { DropdownTooltip } from "../dropdowns/DropdownTooltip";
import {ReactComponent as GridIcon} from '../../svg/GridIcon.svg';
import { DropdownGrid } from "../dropdowns/DropdownGrid";
import { DimensionSelect } from "./DimensionSelect";
import ComponentTree from "../../classes/ComponentTree";


//the grid dimensions should only be editable in the dropdown window.
//on the component toolbar if the type if "grid_" then dont allow width/height editing

//after the grid is set, the user should be able to select multiple "grid" type components on the canvas
//would need to figure out create one component or only place children in one of two active
//maybe something onHover over the grid items, it can display which it is or something 

//display the grid items with a dashed line, and make the grid button active.
//above should happen automatically after creating


export const GridContainerButton = (props: GridContainerButtonProps) => {
    
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [gridViewWidth, setGridViewWidth] = useState<number>(0);
    const [gridViewHeight, setGridViewHeight] = useState<number>(0);
    const [scale, setScale] = useState<number>(0);
    const [rowsInput, setRowsInput] = useState<number>(0);
    const [colsInput, setColsInput] = useState<number>(0);
    const [numRows, setNumRows] = useState<number>(0);
    const [numCols, setNumCols] = useState<number>(0);
    const [gridViewItems, setGridViewItems] = useState<{height: number, width: number}[]>([]);
    const [selectedItem, setSelectedItem] = useState<number>(-1);
    const [gridViewMeasures, setGridViewMeasures] = useState<{measure: string, dimension: number}[]>([]);
    const [selectedMeasure, setSelectedMeasure] = useState<string>("");

    useEffect(() => {
        const selectedComponent = props.componentTree.find(props.selectedComponentId);
        if(selectedComponent) {
            var scaledHeight = selectedComponent.style.height;
            var scaledWidth = selectedComponent.style.width;
            var scaleCount = 0;
            while(scaledHeight > 104 || scaledWidth > 102.5) {
                scaledHeight -= scaledHeight * .01;
                scaledWidth -= scaledWidth * .01;
                scaleCount++;
            }
            setGridViewWidth(scaledWidth);
            setGridViewHeight(scaledHeight);
            setScale(scaleCount);
            var rowsInput = 0;
            var colsInput = 0;
            var numRows = 0;
            var numCols = 0;
            var selectedItem = -1;
            var items: {width: number, height: number}[] = [];
            var measures: {dimension: number, measure: string}[] = [];
            if(selectedComponent.node.children.length > 0) {
                var startPos = 0;
                var endPos = selectedComponent.node.children[0].type.indexOf("_");
                if(selectedComponent.node.children[0].type.substring(startPos, endPos) === "grid") {
                    startPos = endPos + 1;
                    endPos = selectedComponent.node.children[0].type.indexOf("_", startPos);
                    var rows = parseInt(selectedComponent.node.children[0].type.substring(startPos, endPos));
                    startPos = endPos + 1;
                    endPos = selectedComponent.node.children[0].type.indexOf("_", startPos);
                    var cols = parseInt(selectedComponent.node.children[0].type.substring(startPos));
                    rowsInput = rows;
                    numRows = rows;
                    colsInput = cols;
                    numCols = cols;
                    selectedComponent.node.children.forEach((child, i) => {
                        items.push({width: child.style.width, height: child.style.height});
                        if(i === 0) {
                            measures.push({dimension: child.style.height, measure: "0_s"});
                            measures.push({dimension: child.style.width, measure: "0_t"});
                            selectedItem = 0;
                        }
                        else if(i < colsInput)
                            measures.push({dimension: child.style.width, measure: i + "_t"});
                        else if(Number.isInteger(i / colsInput))
                            measures.push({dimension: child.style.height, measure: i + "_s"});
                    });
                }
            }
            setRowsInput(rowsInput);
            setColsInput(colsInput);
            setNumRows(numRows);
            setNumCols(numCols);
            setGridViewItems(items);
            setSelectedItem(selectedItem);
            setGridViewMeasures(measures);
            setSelectedMeasure("");
        }
    }, [props.selectedComponentId]);

    useEffect(() => {
        const selectedComponent = props.componentTree.find(props.selectedComponentId);
        if(selectedComponent && gridViewItems.length !== 0) {
            if(gridViewItems.length === selectedComponent.node.children.length) {
                if(selectedComponent.node.children.length === 0) {
                    gridViewItems.map((item) => {
                        props.newComponent("grid_" + numRows + "_" + numCols + "_" + item.width + "_" + item.height);
                    });
                    selectedComponent.updateAlignHorizontal("grid");
                    selectedComponent.updateAlignVertical("grid");
                }
                else {
                    selectedComponent.node.children.forEach((child, index) => {
                        if(child.style.width !== gridViewItems[index].width)
                            child.updateWidth(gridViewItems[index].width);
                        if(child.style.height !== gridViewItems[index].height)
                            child.updateHeight(gridViewItems[index].height);
                    });
                }
            }
            else {
                gridViewItems.map((item) => {
                    props.newComponent("grid_" + numRows + "_" + numCols + "_" + item.width + "_" + item.height);
                });
                selectedComponent.updateAlignHorizontal("grid");
                selectedComponent.updateAlignVertical("grid");
            }
        }
    }, [gridViewItems]);

    useEffect(() => {
        const selectedComponent = props.componentTree.find(props.selectedComponentId);
        if(selectedComponent) {
            if(selectedComponent.node.children.length > 0) {
                setGridViewItems(prev => {
                    var index = 0;
                    for(var r=0;r<numRows;r++) {
                        for(var c=0;c<numCols;c++) {
                            var colMeasure = "" + c + "_t";
                            var rowMeasure = "" + (r*numCols) + "_s";
                            var colDim = parseFloat(getMeasureDimension(colMeasure));
                            var rowDim = parseFloat(getMeasureDimension(rowMeasure));
                            if(prev[index].width !== colDim)
                                prev[index].width = colDim;
                            if(prev[index].height !== rowDim)
                                prev[index].height = rowDim;
                            index++;
                        }
                    }
                    return [...prev];
                });
            }
        }
    }, [gridViewMeasures]);

    function updateGridViewItems() {
        const selectedComponent = props.componentTree.find(props.selectedComponentId);
        if(selectedComponent) {
            const numItems = rowsInput * colsInput;
            const items: {height: number, width: number}[] = [];
            const measures: {measure: string, dimension: number}[] = [];
            for(var i=0;i<numItems;i++) {
                var height = selectedComponent.style.height/rowsInput;
                var width = selectedComponent.style.width/colsInput;
                var newItem = {height: height, width: width};
                items.push(newItem);
                if(i === 0) {
                    measures.push({dimension: height, measure: "0_s"});
                    measures.push({dimension: width, measure: "0_t"});
                }
                else if(i < colsInput)
                    measures.push({dimension: width, measure: i + "_t"});
                else if(Number.isInteger(i / colsInput))
                    measures.push({dimension: height, measure: i + "_s"});
            }
            setNumRows(rowsInput);
            setNumCols(colsInput);
            setGridViewItems(items);
            setSelectedItem(numItems > 0 ? 0 : -1);
            setSelectedMeasure("");
            setGridViewMeasures(measures);
        }
    }

    function getItemWidth(index: number) {
        var width = gridViewItems[index].width;
        for(var i=0;i<scale;i++) {
            width -= width * .01;
        }
        return width;
    }

    function getItemHeight(index: number) {
        var height = gridViewItems[index].height;
        for(var i=0;i<scale;i++) {
            height -= height * .01;
        }
        return height;
    }

    function updateItemWidth(val: string) {
        if(selectedItem !== -1) {
            setGridViewMeasures(prev => {
                var whichCol = selectedItem;
                while(whichCol > numCols)
                    whichCol -= numCols;
                updateMeasureDimension(""+selectedItem+"_t", val);
                return [...prev];
            });
        }
    }

    function updateItemHeight(val: string) {
        if(selectedItem !== -1) {
            setGridViewMeasures(prev => {
                var whichRow = 1;
                while(selectedItem >= whichRow*numCols)
                    whichRow++;
                updateMeasureDimension(""+((whichRow-1)*numCols)+"_s", val);
                return [...prev];
            });
        }   
    }

    function updateMeasureDimension(measure: string, val: string) {
        setGridViewMeasures(prev => {
            prev.forEach((m) => {
                if(m.measure == measure) {
                    m.dimension = parseFloat(val);
                }    
            });
            return [...prev];
        });
    }

    function getMeasureDimension(measure: string): string {
        var dim = "";
        gridViewMeasures.forEach((m) => {
            if(m.measure === measure)
                dim = "" + m.dimension;
        });
        return dim;
    }

    function topMeasurement(index: number) {
        return index < numCols;
    }

    function sideMeasurement(index: number) {
        if(index === 0)
            return true;
        else if(Number.isInteger(index / numCols)) {
            return true;
        }
        else
            return false;
    }

    function mouseEnterOnItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.borderColor = "white";
    }

    function mouseLeaveOnItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.borderColor = "grey";
    }

    function mouseEnterOnMeasure(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.borderColor = "white";
        if(e.currentTarget.parentElement)
            e.currentTarget.parentElement.style.borderColor = "grey";
        var child = e.currentTarget.children[0] as HTMLDivElement;
        child.style.backgroundColor = "white";
    }

    function mouseLeaveOnMeasure(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.borderColor = "grey";
        if(e.currentTarget.parentElement)
            e.currentTarget.parentElement.style.borderColor = "grey";
        var child = e.currentTarget.children[0] as HTMLDivElement;
        child.style.backgroundColor = "grey";
    }

    function clickMeasure(e: React.MouseEvent<HTMLDivElement, MouseEvent>, measureClicked: string) {
        e.stopPropagation();
        e.preventDefault();
        setSelectedMeasure(measureClicked);
        setSelectedItem(-1);
    }
    
    function showMenu() {
        if(timer) clearTimeout(timer);
        setShowTooltip(false);
        setShowDropdown(val => !val);
    }

    function hover() {
        const timerId = setTimeout(() => {
            if(!showTooltip)
                setShowTooltip(true);
        }, 500);
        setTimer(timerId);
    }

    function leave() {
        setShowTooltip(false);
        if(timer) clearTimeout(timer);
    }

    return (
        <Container>
            <Button
                onMouseOver={() => hover()}
                onMouseOut={() => leave()}
                onClick={() => showMenu()}
            >
                <GridIcon/>
            </Button>
            {
                showTooltip
                ? <DropdownTooltip>
                    Create Grid
                  </DropdownTooltip>
                : null
            }
            {
                showDropdown
                ? <DropdownGrid setMenu={setShowDropdown}>
                    <RowColInputContainer>
                        <RowColInputLabel># Rows:</RowColInputLabel>
                        <RowColInput 
                            type="text"
                            value={rowsInput}
                            onChange={(e) => setRowsInput(parseInt(e.currentTarget.value))}
                            onKeyPress={(e) => {if(e.key==="Enter") updateGridViewItems()}}
                        />
                        <RowColInputLabel># Cols:</RowColInputLabel>
                        <RowColInput 
                            type="text"
                            value={colsInput}
                            onChange={(e) => setColsInput(parseInt(e.currentTarget.value))}
                            onKeyPress={(e) => {if(e.key==="Enter") updateGridViewItems()}}
                        />
                    </RowColInputContainer>
                    <GridViewContainer>
                        <GridViewParent 
                            numRows={numRows} 
                            numCols={numCols}
                            gridViewWidth={gridViewWidth}
                            gridViewHeight={gridViewHeight}
                        >
                            {
                                gridViewItems.map((item, index) => (
                                    <GridViewItem 
                                        key={index} 
                                        height={getItemHeight(index)}
                                        width={getItemWidth(index)}
                                        onClick={() => {setSelectedItem(index);setSelectedMeasure("");}}
                                        selected={selectedItem===index}
                                        onMouseEnter={(e) => mouseEnterOnItem(e)}
                                        onMouseLeave={(e) => mouseLeaveOnItem(e)}
                                    >
                                        {
                                            topMeasurement(index)
                                            ? <TopMeasurement
                                                height={getItemHeight(index)}
                                                width={getItemWidth(index)}
                                                onClick={(e) => clickMeasure(e, index + "_t")}
                                                selected={selectedMeasure===(""+index+"_t") && selectedItem===-1}
                                                onMouseEnter={(e) => mouseEnterOnMeasure(e)}
                                                onMouseLeave={(e) => mouseLeaveOnMeasure(e)}
                                              >
                                                <TopCross/>
                                              </TopMeasurement>
                                            : null
                                        }
                                        {
                                            sideMeasurement(index)
                                            ? <SideMeasurement
                                                height={getItemHeight(index)}
                                                width={getItemWidth(index)}
                                                onClick={(e) => clickMeasure(e, index + "_s")}
                                                selected={selectedMeasure===(index+"_s") && selectedItem===-1}
                                                onMouseEnter={(e) => mouseEnterOnMeasure(e)}
                                                onMouseLeave={(e) => mouseLeaveOnMeasure(e)}
                                              >
                                                <SideCross/>
                                              </SideMeasurement>
                                            : null
                                        }
                                    </GridViewItem>                                    
                                ))
                            }
                        </GridViewParent>
                    </GridViewContainer>
                        {
                            selectedItem !== -1 && selectedMeasure === ""
                            ? (
                                <GridItemInputContainer>
                                    <ItemInputLabel>Item Row Height:</ItemInputLabel>
                                    <ItemInput
                                        value={gridViewItems[selectedItem].height}
                                        onChange={(e) => updateItemHeight(e.currentTarget.value)}
                                    />
                                    <DimensionSelect/>
                                    <ItemInputLabel>Item Col Width:</ItemInputLabel>
                                    <ItemInput
                                        value={gridViewItems[selectedItem].width}
                                        onChange={(e) => updateItemWidth(e.currentTarget.value)}
                                    />
                                    <DimensionSelect/>
                                    <RemoveItemButton>Remove Item</RemoveItemButton>
                                </GridItemInputContainer>
                            )
                            : selectedItem === -1 && selectedMeasure !== ""
                            ? (
                                <GridItemInputContainer>
                                    <ItemInputLabel>{selectedMeasure.slice(-1)==="t"?"Col Width:":"Row Height:"}</ItemInputLabel>
                                    <ItemInput
                                        value={getMeasureDimension(selectedMeasure)}
                                        onChange={(e) => updateMeasureDimension(selectedMeasure, e.currentTarget.value)}
                                    />
                                    <DimensionSelect/>
                                </GridItemInputContainer>
                            )
                            : null
                        }

                  </DropdownGrid>
                : null
            }
        </Container>
    );
};

const Button = styled.button`
    background-color: transparent;
    box-shadow: 0px 0px 0px transparent;
    border-radius: 3px;
    &:hover {
        background-color:#e6e6e6;
    }
    &:focus {
        outline: none;
    }
    border: none;
    height: 30px;
    width: 30px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & > svg {
        height: 20px;
        width: 20px;
        fill: #282c33;
    }
`;

const Container = styled.span`
    position: relative;
    margin-right: 10px;
`;

const RowColInputContainer = styled.span`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 45% 55%;
    grid-template-rows: 50% 50%;
    justify-items: start;
    align-items: start;
    border-bottom: solid 1px white;
`;

const RowColInputLabel = styled.h6`
    color: white;
    align-self: center;
    justify-self: end;
`;

const RowColInput = styled.input`
    padding: 3px;
    border-radius: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px inset;
    background-color: whitesmoke;
    height: 20px;
    width: 70%;
    align-self: center;
    justify-self: center;
    &:focus {
        outline: none;
    }
`;

const GridViewContainer = styled.span`
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    box-sizing: border-box;
    border-bottom: solid 1px white;
    overflow: hidden;
`;

const GridViewParent = styled.div<{numRows: number, numCols: number,
    gridViewWidth: number, gridViewHeight: number
}>`
    height: ${props => props.gridViewHeight + "px"};
    width: ${props => props.gridViewWidth + "px"};
    border: solid 1px grey;
    border-radius: 3px;
    display: grid;
    grid-template-columns: repeat(${props => props.numCols}, max-content);
    grid-template-rows: repeat(${props => props.numRows}, max-content);
    box-sizing: border-box;
`;

const TopMeasurement = styled.div<{height: number, width: number, selected: boolean}>`
    position: absolute;
    top: -20px;
    border-left: solid 1px ${props => props.selected?"white":"grey"} !important;
    border-right: solid 1px ${props => props.selected?"white":"grey"} !important;
    height: 15px;
    box-sizing: border-box;
    width: ${props => (props.width - 2) + "px"};
    display: grid;
    align-items: center;
    justify-items: center;
    border-radius: 3px;
    margin-bottom: 1px;
    & > * {
        background-color: ${props => props.selected?"white" : "grey"} !important;
    }
    &:hover {
        border-color: white !important;
        & > * {
            background-color: white !important;
        }
    }
`;

const SideMeasurement = styled.div<{height: number, width: number, selected: boolean}>`
    position: absolute;
    left: -20px;
    border-top: solid 1px ${props => props.selected?"white":"grey"} !important;
    border-bottom: solid 1px ${props => props.selected?"white":"grey"} !important;
    width: 15px;
    box-sizing: border-box;
    height: ${props => (props.height - 2) + "px"};
    display: grid;
    align-items: center;
    justify-items: center;
    border-radius: 3px;
    & > * {
        background-color: ${props => props.selected?"white" : "grey"} !important;
    }
    &:hover {
        border-color: white !important;
        & > * {
            background-color: white !important;
        }
    }
`;

const GridViewItem = styled.div<{height: number, width: number, selected: boolean}>`
    width: ${props => props.width + "px"};
    height: ${props => props.height + "px"};
    background-color: ${props => props.selected?"white":"transparent"};
    border: solid 1px grey;
    border-radius: 3px;
    box-sizing: border-box;
    position: relative;
    &:hover {
        border-color: white;
    }
`;

const GridItemInputContainer = styled.span`
    grid-column: 1/3;
    height: 115px;
    width: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 40% 30% 30%;
    justify-items: start;
    align-items: center;
`;

const ItemInputLabel = styled.h6`
    color: white;
    align-self: center;
    justify-self: end;
    margin: 10px 0px 10px 0px;
`;

const ItemInput = styled.input`
    padding: 3px;
    border-radius: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px inset;
    background-color: whitesmoke;
    height: 15px;
    width: 70%;
    align-self: center;
    justify-self: center;
    &:focus {
        outline: none;
    }
`;

const RemoveItemButton = styled(Button)`
    grid-column: 1/4;
    justify-self: center;
    align-self: center;
    background-color: white;
    width: 100px;
    height: 80%;
`;

const TopCross = styled.div`
    height: 1px;
    width: 100%;
`;

const SideCross = styled.div`
    width: 1px;
    height: 100%;
`;

interface GridContainerButtonProps {
    newComponent: (type: string) => void,
    componentTree: ComponentTree,
    selectedComponentId: number | null
};