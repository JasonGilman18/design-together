import { useState } from "react";
import styled from "styled-components";
import { DropdownTooltip } from "../dropdowns/DropdownTooltip";
import {ReactComponent as GridIcon} from '../../svg/GridIcon.svg';
import { DropdownGrid } from "../dropdowns/DropdownGrid";
import { DimensionSelect } from "./DimensionSelect";

export const GridContainerButton = (props: GridContainerButtonProps) => {
    
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [rowsInput, setRowsInput] = useState<number>(0);
    const [colsInput, setColsInput] = useState<number>(0);
    const [numRows, setNumRows] = useState<number>(0);
    const [numCols, setNumCols] = useState<number>(0);
    const [gridViewItems, setGridViewItems] = useState<{height: number, width: number}[]>([]);
    const [selectedItem, setSelectedItem] = useState<number>(-1);

    function updateGridViewItems() {
        const numItems = rowsInput * colsInput;
        const items: {height: number, width: number}[] = [];
        for(var i=0;i<numItems;i++) {
           var newItem = {height: 5, width: 5};
           items.push(newItem);
        }
        setNumRows(rowsInput);
        setNumCols(colsInput);
        setGridViewItems(items);
        setSelectedItem(numItems > 0 ? 0 : -1);
    }

    function updateItemWidth(val: string) {
        if(selectedItem > -1) {
            setGridViewItems(prev => {
                prev[selectedItem].width = parseInt(val);
                return [...prev];
            });
        }
    }

    function updateItemHeight(val: string) {
        if(selectedItem > -1) {
            setGridViewItems(prev => {
                prev[selectedItem].height = parseInt(val);
                return [...prev];
            });
        }
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
                    <GridViewContainer numRows={numRows} numCols={numCols}>
                        {
                            gridViewItems.map((item, index) => (
                                <GridViewItem 
                                    key={index} 
                                    height={item.height} 
                                    width={item.width}
                                    onClick={() => setSelectedItem(index)}
                                    selected={selectedItem===index}
                                />
                            ))
                        }
                    </GridViewContainer>
                    <GridItemInputContainer>
                        <ItemInputLabel>Width:</ItemInputLabel>
                        <ItemInput
                            value={selectedItem===-1?"":gridViewItems[selectedItem].width}
                            onChange={(e) => updateItemWidth(e.currentTarget.value)}
                        />
                        <DimensionSelect/>
                        <ItemInputLabel>Height:</ItemInputLabel>
                        <ItemInput
                            value={selectedItem===-1?"":gridViewItems[selectedItem].height}
                            onChange={(e) => updateItemHeight(e.currentTarget.value)}
                        />
                        <DimensionSelect/>
                    </GridItemInputContainer>
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
    display: grid;
    grid-template-columns: 35% 65%;
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

const GridViewContainer = styled.span<{numRows: number, numCols: number}>`
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(${props => props.numCols}, auto);
    grid-template-rows: repeat(${props => props.numRows}, auto);
    border-bottom: solid 1px white;
`;

const GridViewItem = styled.div<{height: number, width: number, selected: boolean}>`
    width: ${props => props.width + "%"};
    height: ${props => props.height + "%"};
    background-color: ${props => props.selected?"white":"transparent"};
    border: solid 1px white;
    border-radius: 3px;
`;

const GridItemInputContainer = styled.span`
    grid-column: 1/3;
    height: 115px;
    width: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 33% 33% 33%;
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

interface GridContainerButtonProps {
    newComponent: (type: string) => void
};