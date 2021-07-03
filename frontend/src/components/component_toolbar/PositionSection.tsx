import styled from "styled-components";
import ComponentTree from "../../classes/ComponentTree";
import {AlignSection} from "./AlignSection";
import {MarginSection} from './MarginSection';
import {PaddingSection} from './PaddingSection';

export const PositionSection = (props: PositionSectionProps) => {

    return (
        <Section>
            <AlignSection
                componentTree={props.componentTree}
                selectedComponentId={props.selectedComponentId}
                setComponentTree={props.setComponentTree}
            />
            <MarginSection
                componentTree={props.componentTree}
                selectedComponentId={props.selectedComponentId}
                setComponentTree={props.setComponentTree}
            />
            <PaddingSection
                componentTree={props.componentTree}
                selectedComponentId={props.selectedComponentId}
                setComponentTree={props.setComponentTree}
            />
        </Section>
    );
};

const Section = styled.div`
    height: auto;
    width: 100%;
`;

interface PositionSectionProps {
    componentTree: ComponentTree,
    selectedComponentId: number | null,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
};