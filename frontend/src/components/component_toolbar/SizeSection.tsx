import { useEffect, useState } from "react";
import styled from "styled-components";
import ComponentTree from "../../classes/ComponentTree";
import { DimensionSelect } from "../interactive/DimensionSelect";

export const SizeSection = (props: SizeSectionProps) => {

    const [width, setWidth] = useState<string>("");
    const [height, setHeight] = useState<string>("");

    useEffect(() => {
        if(props.selectedComponentId !== -1) {
            const selectedComponent = props.componentTree.find(props.selectedComponentId);
            if(selectedComponent) {
                setWidth("" + selectedComponent.style.width);
                setHeight("" + selectedComponent.style.height);
            }
        }
    }, []);

    useEffect(() => {
        if(props.selectedComponentId !== -1) {
            const selectedComponent = props.componentTree.find(props.selectedComponentId);
            if(selectedComponent) {
                if(parseInt(width!) !== selectedComponent.style.width)
                    setWidth("" + selectedComponent.style.width);
                if(parseInt(height!) !== selectedComponent.style.height)
                    setHeight("" + selectedComponent.style.height);
            }
        }
    }, [props.componentTree.find(props.selectedComponentId)?.style.width,
        props.componentTree.find(props.selectedComponentId)?.style.height]);
    
    function updateComponentWidth(val: string) {
        if(val !== "") {
            var number = parseInt(val);
            if(number !== NaN && number >= 0) {
                setWidth("" + number);
                props.componentTree.find(props.selectedComponentId)?.updateWidth(number);
                props.setComponentTree(prev => {
                    return prev.copy();
                });
            }
        }
        else
            setWidth("");
    }

    function updateComponentHeight(val: string) {
        if(val !== "") {
            var number = parseInt(val);
            if(number !== NaN && number >= 0) {
                setHeight("" + number);
                props.componentTree.find(props.selectedComponentId)?.updateHeight(number);
                props.setComponentTree(prev => {
                    return prev.copy();
                });
            }
        }
        else
            setHeight("");
    }

    function checkReadonly() {
        const selectedComponent = props.componentTree.find(props.selectedComponentId);
        var readonly = true;
        if(selectedComponent)
            readonly = selectedComponent.type.substring(0, selectedComponent.type.indexOf("_")) === "grid";
        return readonly
    }
    
    return (
        <Section>
            <InputContainer>
                <SizeInputLabel>Width:</SizeInputLabel>
                <SizeInput type="text" value={props.selectedComponentId==-1
                    ? ""
                    : width}
                    maxLength={4} size={4}
                    onChange={(e) => updateComponentWidth(e.target.value)}
                    readOnly={checkReadonly()}
                    style={{color: checkReadonly()?"grey":"#282c33"}}
                />
                <DimensionInput>
                    {
                        checkReadonly()
                        ? null
                        : <DimensionSelect/>
                    }
                </DimensionInput>
            </InputContainer>
            <InputContainer>
                <SizeInputLabel>Height:</SizeInputLabel>
                <SizeInput type="text" value={props.selectedComponentId==-1
                    ? "" 
                    : height}
                    maxLength={4} size={4}
                    onChange={(e) => updateComponentHeight(e.target.value)}
                    readOnly={checkReadonly()}
                    style={{color: checkReadonly()?"grey":"#282c33"}}
                />
                <DimensionInput>
                    {
                        checkReadonly()
                        ? null
                        : <DimensionSelect/>
                    }
                </DimensionInput>
            </InputContainer>
        </Section>
    );
};

const Section = styled.div`
   
`;

const InputContainer = styled.span`
    display: grid;
    grid-template-columns: 33% 33% 33%;
`;

const SizeInputLabel = styled.h3`
    grid-column: 1/2;
    align-self: center;
    justify-self: end;
    user-select: none;
    font-size: small;
    margin-right: 10px;
`;

const SizeInput = styled.input`
    grid-column: 2/3;
    align-self: center;
    padding: 3px;
    border-radius: 5px;
    margin-right: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px inset;
    background-color: whitesmoke;
    &:focus {
        outline: none;
    }
`;

const DimensionInput = styled.span`
    grid-column: 3/4;
    align-self: center;
`;

interface SizeSectionProps {
    selectedComponentId: number | null,
    componentTree: ComponentTree,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
};