import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Component from "../../classes/Component";
import ComponentTree from "../../classes/ComponentTree";
import {DimensionSelect} from './../interactive/DimensionSelect';

export const MarginSection = (props: MarginSectionProps) => {
    
    const [selectedSide, setSelectedSide] = useState<string>("Top");
    const [margin, setMargin] = useState<string>();

    useEffect(() => {
        if(props.selectedComponentId !== -1) {
            const selectedComponent = props.componentTree.find(props.selectedComponentId);
            if(selectedComponent) {
                var selectedMargin = getSelectedMargin(selectedComponent);
                setMargin("" + selectedMargin);
            }
        }
    }, []);

    useEffect(() => {
        if(props.selectedComponentId !== -1) {
            const selectedComponent = props.componentTree.find(props.selectedComponentId);
            if(selectedComponent) {
                if(parseInt(margin!) !== getSelectedMargin(selectedComponent))
                    setMargin("" + getSelectedMargin(selectedComponent));
            }
        }
    }, [getSelectedMargin(props.componentTree.find(props.selectedComponentId)), props.selectedComponentId]);

    function updateMargin(val: string) {
        if(val !== "") {
            var number = parseInt(val);
            if(number !== NaN && number >= 0) {
                setMargin("" + number);
                if(selectedSide==="Top")
                    props.componentTree.find(props.selectedComponentId)?.updateMarginTop(number);
                else if(selectedSide==="Right") 
                    props.componentTree.find(props.selectedComponentId)?.updateMarginRight(number);
                else if(selectedSide==="Bottom")
                    props.componentTree.find(props.selectedComponentId)?.updateMarginBottom(number);
                else if(selectedSide==="Left")
                    props.componentTree.find(props.selectedComponentId)?.updateMarginLeft(number);
                props.setComponentTree(prev => {
                    return prev.copy();
                });
            }
        }
        else
            setMargin("");
    }

    function getSelectedMargin(selectedComponent: Component | null) {
        if(selectedComponent) {
            return selectedSide==="Top"
            ? selectedComponent.style.margin_top
            : selectedSide==="Right"
            ? selectedComponent.style.margin_right
            : selectedSide==="Bottom"
            ? selectedComponent.style.margin_bottom
            : selectedSide==="Left"
            ? selectedComponent.style.margin_left
            : "";
        }
        else
            return "";
    }

    return (
        <Section>
            <MarginWidgetContainer>
                <MarginWidgetTop 
                    onClick={() => setSelectedSide("Top")}
                    selected={selectedSide==="Top"}
                />
                <MarginWidgetRight 
                    onClick={() => setSelectedSide("Right")}
                    selected={selectedSide==="Right"}
                />
                <MarginWidgetCenter>
                    <CenterLabel>Component</CenterLabel>
                </MarginWidgetCenter>
                <MarginWidgetBottom 
                    onClick={() => setSelectedSide("Bottom")}
                    selected={selectedSide==="Bottom"}
                />
                <MarginWidgetLeft 
                    onClick={() => setSelectedSide("Left")}
                    selected={selectedSide==="Left"}
                />
                <MarginWidgetTL/>
                <MarginWidgetTR/>
                <MarginWidgetBR/>
                <MarginWidgetBL/>
            </MarginWidgetContainer>
            <MarginInputLabel>{"Margin " + selectedSide + ":"}</MarginInputLabel>
            <Input
                maxLength={4} 
                size={4}
                value={
                    selectedSide==="Top"
                    ? props.componentTree.find(props.selectedComponentId)?.style.margin_top
                    : selectedSide==="Right"
                    ? props.componentTree.find(props.selectedComponentId)?.style.margin_right
                    : selectedSide==="Bottom"
                    ? props.componentTree.find(props.selectedComponentId)?.style.margin_bottom
                    : selectedSide==="Left"
                    ? props.componentTree.find(props.selectedComponentId)?.style.margin_left
                    : ""
                }
                onChange={(e) => updateMargin(e.currentTarget.value)}
            />
            <DimensionSelect/>
        </Section>
    );
};

const Section = styled.div`
    display: grid;
    grid-template-columns: 50% 25% 25%;
    grid-template-rows: auto auto;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: solid 1px #dcdcdc;
`;

const MarginWidgetContainer = styled.div`
    grid-column: 1/4;
    grid-row: 1/2;
    align-self: center;
    justify-self: center;
    width: 100px;
    height: 60px;
    display: grid;
    grid-template-columns: 15px 70px 15px;
    grid-template-rows: 15px 30px 15px;
    margin-bottom: 15px;
    border: dashed 1px #282c33;
`;

const MarginWidgetPiece = styled.div`
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const MarginWidgetTL = styled.div`
    grid-column: 1/2;
    grid-row: 1/2;
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const MarginWidgetTR = styled.div`
    grid-column: 3/4;
    grid-row: 1/2;
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const MarginWidgetBR = styled.div`
    grid-column: 3/4;
    grid-row: 3/4;
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const MarginWidgetBL = styled.div`
    grid-column: 1/2;
    grid-row: 3/4;
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const MarginWidgetTop = styled(MarginWidgetPiece)<{selected: boolean}>`
    grid-column: 2/3;
    grid-row: 1/2;
    ${
        props => props.selected
        ? css`
            background-color: #e6e6e6;
            & ~ ${MarginWidgetTL} {
                background-color: #e6e6e6; 
            }
            & ~ ${MarginWidgetTR} {
                background-color: #e6e6e6;
            }
        `
        : null
    }
    &:hover {
        background-color: #e6e6e6;
        & ~ ${MarginWidgetTL} {
            background-color: #e6e6e6; 
        }
        & ~ ${MarginWidgetTR} {
            background-color: #e6e6e6;
        }
    }
`;

const MarginWidgetRight = styled(MarginWidgetPiece)<{selected: boolean}>`
    grid-column: 3/4;
    grid-row: 2/3;
    ${
        props => props.selected
        ? css`
            background-color: #e6e6e6;
            & ~ ${MarginWidgetTR} {
                background-color: #e6e6e6; 
            }
            & ~ ${MarginWidgetBR} {
                background-color: #e6e6e6;
            }
        `
        : null
    }
    &:hover {
        background-color: #e6e6e6;
        & ~ ${MarginWidgetTR} {
            background-color: #e6e6e6; 
        }
        & ~ ${MarginWidgetBR} {
            background-color: #e6e6e6;
        }
    }
`;

const MarginWidgetCenter = styled.div`
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
    border: solid 1px #282c33;
    box-sizing: border-box;
    grid-column: 2/3;
    grid-row: 2/3;
    display: grid;
`;

const CenterLabel = styled.h6`
    user-select: none;
    align-self: center;
    justify-self: center;
    margin: 0px;
`;

const MarginWidgetBottom = styled(MarginWidgetPiece)<{selected: boolean}>`
    grid-column: 2/3;
    grid-row: 3/4;
    ${
        props => props.selected
        ? css`
            background-color: #e6e6e6;
            & ~ ${MarginWidgetBL} {
                background-color: #e6e6e6; 
            }
            & ~ ${MarginWidgetBR} {
                background-color: #e6e6e6;
            }
        `
        : null
    }
    &:hover {
        background-color: #e6e6e6;
        & ~ ${MarginWidgetBL} {
            background-color: #e6e6e6; 
        }
        & ~ ${MarginWidgetBR} {
            background-color: #e6e6e6;
        }
    }
`;

const MarginWidgetLeft = styled(MarginWidgetPiece)<{selected: boolean}>`
    grid-column: 1/2;
    grid-row: 2/3;
    ${
        props => props.selected
        ? css`
            background-color: #e6e6e6;
            & ~ ${MarginWidgetTL} {
                background-color: #e6e6e6; 
            }
            & ~ ${MarginWidgetBL} {
                background-color: #e6e6e6;
            }
        `
        : null
    }
    &:hover {
        background-color: #e6e6e6;
        & ~ ${MarginWidgetTL} {
            background-color: #e6e6e6; 
        }
        & ~ ${MarginWidgetBL} {
            background-color: #e6e6e6;
        }
    }
`;

const MarginInputLabel = styled.h6`
    user-select: none;
    height: max-content;
    width: max-content;
    align-self: center;
    justify-self: end;
    margin: 0px 10px 0px 0px;
`;

const Input = styled.input`
    justify-self: center;
    align-self: center;
    height: 15px;
    width: 80%;
    padding: 3px;
    border-radius: 5px;
    margin-top: 0px;
    margin-right: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px inset;
    background-color: whitesmoke;
    &:focus {
        outline: none;
    }
`;

interface MarginSectionProps {
    componentTree: ComponentTree,
    selectedComponentId: number | null,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
};