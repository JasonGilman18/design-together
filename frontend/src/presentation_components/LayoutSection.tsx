import styled from "styled-components";
import {ReactComponent as AlignCenterIcon} from '../svg/align-center.svg';
import {ReactComponent as AlignStartIcon} from '../svg/align-start.svg';
import {ReactComponent as AlignEndIcon} from '../svg/align-end.svg';

export const LayoutSection = (props: LayoutSectionProps) => (
    <Section>
        <SectionLabel>Layout</SectionLabel>
        <AlignCenterButton>
            <AlignCenterIcon style={{height: "20px", width: "20px;"}}/>
        </AlignCenterButton>
        <AlignStartButton>
            <AlignStartIcon style={{height: "20px", width: "20px;"}}/>
        </AlignStartButton>
        <AlignEndButton>
            <AlignEndIcon style={{height: "20px", width: "20px;"}}/> 
        </AlignEndButton>
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

const SectionLabel = styled.h5`
    grid-column: 1/4;
    grid-row: 1/2;
    margin: auto;
    width: fit-content;
    user-select: "none";
`;

const Section = styled.div`
    grid-column: 2/3;
    grid-row: 2/3;
    border-right: solid 1px #dcdcdc;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: 25px repeat(2, minmax(0, 1fr));
    justify-items: center;
    align-items: center;
`;

const AlignCenterButton = styled(Button)`
    grid-column: 1/2;
    grid-row: 2/3;
`;

const AlignStartButton = styled(Button)`
    grid-column: 2/3;
    grid-row: 2/3;
`;

const AlignEndButton = styled(Button)`
    grid-column: 3/4;
    grid-row: 2/3;
`;

interface LayoutSectionProps {

};