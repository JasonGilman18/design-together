import { useState } from "react";
import styled, { css } from "styled-components";
import ComponentTree from "../../classes/ComponentTree";
import {DimensionSelect} from './../interactive/DimensionSelect';

export const PaddingSection = (props: PaddingSectionProps) => {

    const [selectedSide, setSelectedSide] = useState<string>("Top");

    return (
        <Section>
            <PaddingWidgetContainer>
                <PaddingWidgetTop
                    onClick={() => setSelectedSide("Top")}
                    selected={selectedSide === "Top"}
                />
                <PaddingWidgetRight
                    onClick={() => setSelectedSide("Right")}
                    selected={selectedSide === "Right"}
                />
                <PaddingWidgetCenter>
                    <PaddingWidgetLabel>Component</PaddingWidgetLabel>
                </PaddingWidgetCenter>
                <PaddingWidgetBottom
                    onClick={() => setSelectedSide("Bottom")}
                    selected={selectedSide === "Bottom"}
                />
                <PaddingWidgetLeft
                    onClick={() => setSelectedSide("Left")}
                    selected={selectedSide === "Left"}
                />
                <PaddingWidgetTL/>
                <PaddingWidgetTR/>
                <PaddingWidgetBR/>
                <PaddingWidgetBL/>
            </PaddingWidgetContainer>
            <PaddingInputLabel>{"Padding " + selectedSide + ":"}</PaddingInputLabel>
            <Input/>
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
`;

const PaddingWidgetContainer = styled.div`
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
    border: solid 1px #282c33;
`;

const PaddingWidgetPiece = styled.div`
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const PaddingWidgetTL = styled.div`
    grid-column: 1/2;
    grid-row: 1/2;
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const PaddingWidgetTR = styled.div`
    grid-column: 3/4;
    grid-row: 1/2;
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const PaddingWidgetBR = styled.div`
    grid-column: 3/4;
    grid-row: 3/4;
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const PaddingWidgetBL = styled.div`
    grid-column: 1/2;
    grid-row: 3/4;
    height: 100%;
    width: 100%;
    background-color: #fbfbfb;
`;

const PaddingWidgetTop = styled(PaddingWidgetPiece)<{selected: boolean}>`
    grid-column: 2/3;
    grid-row: 1/2;
    ${
        props => props.selected
        ? css`
            background-color: #e6e6e6;
            & ~ ${PaddingWidgetTL} {
                background-color: #e6e6e6;
            }
            & ~ ${PaddingWidgetTR} {
                background-color: #e6e6e6;
            }
        `
        : null
    }
    &:hover {
        background-color: #e6e6e6;
        & ~ ${PaddingWidgetTL} {
            background-color: #e6e6e6;
        }
        & ~ ${PaddingWidgetTR} {
            background-color: #e6e6e6;
        }
    }
`;

const PaddingWidgetRight = styled(PaddingWidgetPiece)<{selected: boolean}>`
    grid-column: 3/4;
    grid-row: 2/3;
    ${
        props => props.selected
        ? css`
            background-color: #e6e6e6;
            & ~ ${PaddingWidgetTR} {
                background-color: #e6e6e6;
            }
            & ~ ${PaddingWidgetBR} {
                background-color: #e6e6e6;
            }
        `
        : null
    }
    &:hover {
        background-color: #e6e6e6;
        & ~ ${PaddingWidgetTR} {
            background-color: #e6e6e6;
        }
        & ~ ${PaddingWidgetBR} {
            background-color: #e6e6e6;
        }
    }
`;

const PaddingWidgetCenter = styled.div`
    height: 100%;
    width: 100%;
    background-color: whitesmoke;
    border: dashed 1px #282c33;
    box-sizing: border-box;
    grid-column: 2/3;
    grid-row: 2/3;
    display: grid;
`;

const PaddingWidgetBottom = styled(PaddingWidgetPiece)<{selected: boolean}>`
    grid-column: 2/3;
    grid-row: 3/4;
    ${
        props => props.selected
        ? css`
            background-color: #e6e6e6;
            & ~ ${PaddingWidgetBR} {
                background-color: #e6e6e6;
            }
            & ~ ${PaddingWidgetBL} {
                background-color: #e6e6e6;
            }
        `
        : null
    }
    &:hover {
        background-color: #e6e6e6;
        & ~ ${PaddingWidgetBR} {
            background-color: #e6e6e6;
        }
        & ~ ${PaddingWidgetBL} {
            background-color: #e6e6e6;
        }
    }
`;

const PaddingWidgetLeft = styled(PaddingWidgetPiece)<{selected: boolean}>`
    grid-column: 1/2;
    grid-row: 2/3;
    ${
        props => props.selected
        ? css`
            background-color: #e6e6e6;
            & ~ ${PaddingWidgetTL} {
                background-color: #e6e6e6;
            }
            & ~ ${PaddingWidgetBL} {
                background-color: #e6e6e6;
            }
        `
        : null
    }
    &:hover {
        background-color: #e6e6e6;
        & ~ ${PaddingWidgetTL} {
            background-color: #e6e6e6;
        }
        & ~ ${PaddingWidgetBL} {
            background-color: #e6e6e6;
        }
    }
`;

const PaddingWidgetLabel = styled.h6`
    user-select: none;
    margin: 0px;
    display: grid;
    justify-items: center;
    align-items: center;
`;

const PaddingInputLabel = styled.h6`
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

interface PaddingSectionProps {
    componentTree: ComponentTree,
    selectedComponentId: number | null,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
};