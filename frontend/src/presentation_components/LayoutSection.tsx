import styled from "styled-components";
import {ReactComponent as AlignHorozontalCenterIcon} from '../svg/align-horozontal-center.svg';
import {ReactComponent as AlignHorozontalStartIcon} from '../svg/align-horozontal-start.svg';
import {ReactComponent as AlignHorozontalEndIcon} from '../svg/align-horozontal-end.svg';
import {ReactComponent as AlignVerticalCenterIcon} from '../svg/align-vertical-center.svg';
import {ReactComponent as AlignVerticalStartIcon} from '../svg/align-vertical-start.svg';
import {ReactComponent as AlignVerticalEndIcon} from '../svg/align-vertical-end.svg';
import {ReactComponent as TableIcon} from '../svg/table.svg';

export const LayoutSection = (props: LayoutSectionProps) => (
    <Section>
        <SectionLabel>Layout</SectionLabel>
        <AlignHorozontalStartButton 
            onClick={() => props.updateComponentAlignHorizontal("start")}
        >
            <AlignHorozontalStartIcon style={{height: "25px", width: "25px"}}/>
        </AlignHorozontalStartButton>
        <AlignHorozontalCenterButton
            onClick={() => props.updateComponentAlignHorizontal("center")}
        >
            <AlignHorozontalCenterIcon style={{height: "25px", width: "25px"}}/>
        </AlignHorozontalCenterButton>
        <AlignHorozontalEndButton
            onClick={() => props.updateComponentAlignHorizontal("end")}
        >
            <AlignHorozontalEndIcon style={{height: "25px", width: "25px"}}/> 
        </AlignHorozontalEndButton>
        <AlignVerticalStartButton
            onClick={() => props.updateComponentAlignVertical("start")}
        >
            <AlignVerticalStartIcon style={{height: "25px", width: "25px"}}/>
        </AlignVerticalStartButton>
        <AlignVerticalCenterButton
            onClick={() => props.updateComponentAlignVertical("center")}
        >
            <AlignVerticalCenterIcon style={{height: "25px", width: "25px"}}/>
        </AlignVerticalCenterButton>
        <AlignVerticalEndButton
            onClick={() => props.updateComponentAlignVertical("end")}
        >
            <AlignVerticalEndIcon style={{height: "25px", width: "25px"}}/> 
        </AlignVerticalEndButton>
        <TableButton>
            <TableIcon style={{height: "18px", width: "18px"}}/>
        </TableButton>
    </Section>
);

const Button = styled.button`
    background-color: transparent;
    box-shadow: 0px 0px 0px transparent;
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

const AlignHorozontalStartButton = styled(Button)`
    grid-column: 1/2;
    grid-row: 2/3;
`;

const AlignHorozontalCenterButton = styled(Button)`
    grid-column: 2/3;
    grid-row: 2/3;
`;

const AlignHorozontalEndButton = styled(Button)`
    grid-column: 3/4;
    grid-row: 2/3;
`;

const AlignVerticalStartButton = styled(Button)`
    grid-column: 1/2;
    grid-row: 3/4;
`;

const AlignVerticalCenterButton = styled(Button)`
    grid-column: 2/3;
    grid-row: 3/4;
`;

const AlignVerticalEndButton = styled(Button)`
    grid-column: 3/4;
    grid-row: 3/4;
`;

const TableButton = styled(Button)`
    grid-column: 4/5;
    grid-row: 2/3;
`;

interface LayoutSectionProps {
    updateComponentAlignHorizontal: (align: string) => void,
    updateComponentAlignVertical: (align: string) => void
};