import styled from "styled-components";
import ComponentTree from "../../classes/ComponentTree";
import { DimensionSelect } from "../interactive/DimensionSelect";

export const SizeSection = (props: SizeSectionProps) => (
    <Section>
        <SectionLabel>Size</SectionLabel>
        <SizeInputContainer>
            <span style={{display: "flex", marginBottom: "5px"}}>
                <SizeInputLabel>W:</SizeInputLabel>
                <SizeInput type="text" value={props.selectedComponentId==-1
                    ? ""
                    : props.componentTree.find(props.selectedComponentId)?.style.width}
                    maxLength={4} size={4}
                    onChange={(e) => props.updateComponentWidth(parseInt(e.target.value))}
                />
                <DimensionSelect/>
            </span>
            <span style={{display:"flex"}}>
                <SizeInputLabel>H:</SizeInputLabel>
                <SizeInput type="text" value={props.selectedComponentId==-1
                    ? "" 
                    : props.componentTree.find(props.selectedComponentId)?.style.height}
                    maxLength={4} size={4}
                    onChange={(e) => props.updateComponentHeight(parseInt(e.target.value))}
                />
                <DimensionSelect/>
            </span>
        </SizeInputContainer>
    </Section>
);

const Section = styled.div`
    grid-column: 3/4;
    grid-row: 2/3;
    border-right: solid 1px #dcdcdc;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: 25px repeat(2, minmax(0, 1fr));
    justify-items: center;
    align-items: center;
`;

const SectionLabel = styled.h5`
    grid-column: 1/4;
    grid-row: 1/2;
    margin: auto;
    width: fit-content;
    user-select: "none";
`;

const SizeInputContainer = styled.span`
    grid-column: 1/4;
    grid-row: 2/4;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const SizeInputLabel = styled.h3`
    user-select: none;
    font-size: small;
    margin: 0px 5px 0px 0px;
    display: flex;
    align-items: center;
    min-width: 20px;
`;

const SizeInput = styled.input`
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

interface SizeSectionProps {
    selectedComponentId: number | null,
    componentTree: ComponentTree,
    updateComponentWidth: (width: number) => void,
    updateComponentHeight: (height: number) => void
};