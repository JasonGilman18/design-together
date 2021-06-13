import styled from "styled-components";
import {ReactComponent as AlignHorozontalCenterIcon} from '../svg/AlignHorizontalCenterIcon.svg';
import {ReactComponent as AlignHorozontalStartIcon} from '../svg/AlignHorizontalStartIcon.svg';
import {ReactComponent as AlignHorozontalEndIcon} from '../svg/AlignHorizontalEndIcon.svg';
import {ReactComponent as AlignVerticalCenterIcon} from '../svg/AlignVerticalCenterIcon.svg';
import {ReactComponent as AlignVerticalStartIcon} from '../svg/AlignVerticalStartIcon.svg';
import {ReactComponent as AlignVerticalEndIcon} from '../svg/AlignVerticalEndIcon.svg';
import {ReactComponent as GridIcon} from '../svg/GridIcon.svg';
import ComponentTree from "../classes/ComponentTree";

export const LayoutSection = (props: LayoutSectionProps) => (
    <Section>
        <SectionLabel>Layout</SectionLabel>
        <AlignHorozontalStartButton
            selectedComponentId={props.selectedComponentId}
            componentTree={props.componentTree}
            onClick={() => props.updateComponentAlignHorizontal("start")}
        >
            <AlignHorozontalStartIcon style={{height: "20px", width: "20px"}}/>
        </AlignHorozontalStartButton>
        <AlignHorozontalCenterButton
            selectedComponentId={props.selectedComponentId}
            componentTree={props.componentTree}
            onClick={() => props.updateComponentAlignHorizontal("center")}
        >
            <AlignHorozontalCenterIcon style={{height: "20px", width: "20px"}}/>
        </AlignHorozontalCenterButton>
        <AlignHorozontalEndButton
            selectedComponentId={props.selectedComponentId}
            componentTree={props.componentTree}
            onClick={() => props.updateComponentAlignHorizontal("end")}
        >
            <AlignHorozontalEndIcon style={{height: "20px", width: "20px"}}/> 
        </AlignHorozontalEndButton>
        <AlignVerticalStartButton
            selectedComponentId={props.selectedComponentId}
            componentTree={props.componentTree}
            onClick={() => props.updateComponentAlignVertical("start")}
        >
            <AlignVerticalStartIcon style={{height: "20px", width: "20px"}}/>
        </AlignVerticalStartButton>
        <AlignVerticalCenterButton
            selectedComponentId={props.selectedComponentId}
            componentTree={props.componentTree}
            onClick={() => props.updateComponentAlignVertical("center")}
        >
            <AlignVerticalCenterIcon style={{height: "20px", width: "20px"}}/>
        </AlignVerticalCenterButton>
        <AlignVerticalEndButton
            selectedComponentId={props.selectedComponentId}
            componentTree={props.componentTree}
            onClick={() => props.updateComponentAlignVertical("end")}
        >
            <AlignVerticalEndIcon style={{height: "20px", width: "20px"}}/> 
        </AlignVerticalEndButton>
        <GridButton>
            <GridIcon style={{height: "18px", width: "18px"}}/>
        </GridButton>
    </Section>
);

const Button = styled.button`
    background-color: transparent;
    box-shadow: 0px 0px 0px transparent;
    border-radius: 3px;
    &:hover {
        background-color:#e6e6e6;
    }
    border: none;
    height: 30px;
    width: 30px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Section = styled.div`
    grid-column: 2/3;
    grid-row: 2/3;
    border-right: solid 1px #dcdcdc;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: 25px repeat(2, minmax(0, 1fr));
    justify-items: center;
    align-items: center;
`;

const SectionLabel = styled.h5`
    grid-column: 1/7;
    grid-row: 1/2;
    margin: auto;
    width: fit-content;
    user-select: "none";
`;

const AlignHorozontalStartButton = styled(Button)<{selectedComponentId: number | null, componentTree: ComponentTree}>`
    grid-column: 1/2;
    grid-row: 2/3;
    background-color: ${props => 
        props.componentTree.find(props.selectedComponentId)?.style.align_horizontal === "start"
        ? "#e6e6e6"
        : "inherit"
    };
`;

const AlignHorozontalCenterButton = styled(Button)<{selectedComponentId: number | null, componentTree: ComponentTree}>`
    grid-column: 2/3;
    grid-row: 2/3;
    background-color: ${props => 
        props.componentTree.find(props.selectedComponentId)?.style.align_horizontal === "center"
        ? "#e6e6e6"
        : "inherit"
    };
`;

const AlignHorozontalEndButton = styled(Button)<{selectedComponentId: number | null, componentTree: ComponentTree}>`
    grid-column: 3/4;
    grid-row: 2/3;
    background-color: ${props => 
        props.componentTree.find(props.selectedComponentId)?.style.align_horizontal === "end"
        ? "#e6e6e6"
        : "inherit"
    };
`;

const AlignVerticalStartButton = styled(Button)<{selectedComponentId: number | null, componentTree: ComponentTree}>`
    grid-column: 1/2;
    grid-row: 3/4;
    background-color: ${props => 
        props.componentTree.find(props.selectedComponentId)?.style.align_vertical === "start"
        ? "#e6e6e6"
        : "inherit"
    };
`;

const AlignVerticalCenterButton = styled(Button)<{selectedComponentId: number | null, componentTree: ComponentTree}>`
    grid-column: 2/3;
    grid-row: 3/4;
    background-color: ${props => 
        props.componentTree.find(props.selectedComponentId)?.style.align_vertical === "center"
        ? "#e6e6e6"
        : "inherit"
    };
`;

const AlignVerticalEndButton = styled(Button)<{selectedComponentId: number | null, componentTree: ComponentTree}>`
    grid-column: 3/4;
    grid-row: 3/4;
    background-color: ${props => 
        props.componentTree.find(props.selectedComponentId)?.style.align_vertical === "end"
        ? "#e6e6e6"
        : "inherit"
    };
`;

const GridButton = styled(Button)`
    grid-column: 4/5;
    grid-row: 2/3;
`;

interface LayoutSectionProps {
    updateComponentAlignHorizontal: (align: string) => void,
    updateComponentAlignVertical: (align: string) => void,
    selectedComponentId: number | null,
    componentTree: ComponentTree
};