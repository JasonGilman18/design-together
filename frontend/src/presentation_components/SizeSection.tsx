import styled from "styled-components";
import ComponentTree from "../classes/ComponentTree";

export const SizeSection = (props: SizeSectionProps) => (
    <Section>
        <SectionLabel>Size</SectionLabel>
        <SizeSelect>
            <option>Pixel</option>
            <option>Percentage</option>
            <option>Viewport</option>
        </SizeSelect>
        <SizeInputContainer>
            <SizeInput type="text" value={props.selectedComponentId==-1
                ? ""
                : props.componentTree.find(props.selectedComponentId)?.style.width}
                onChange={(e) => props.updateComponentWidth(parseInt(e.target.value))}
            />
            <h3 style={{margin: "0px 5px 0px 5px", userSelect: "none"}}>x</h3>
            <SizeInput type="text" value={props.selectedComponentId==-1
                ? "" 
                : props.componentTree.find(props.selectedComponentId)?.style.height}
                onChange={(e) => props.updateComponentHeight(parseInt(e.target.value))}
            />
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

const SizeSelect = styled.select`
    grid-column: 1/4;
    grid-row: 2/3;
`;

const SizeInputContainer = styled.span`
    grid-column: 1/4;
    grid-row: 3/4;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SizeInput = styled.input`
    width: 25%;
`;

interface SizeSectionProps {
    selectedComponentId: number | null,
    componentTree: ComponentTree,
    updateComponentWidth: (width: number) => void,
    updateComponentHeight: (height: number) => void
};