import styled from "styled-components";
import ComponentTree from "../../classes/ComponentTree";
import { BackgroundSection } from "./BackgroundSection";

export const StyleSection = (props: StyleSectionProps) => (
    <Section>
        <BackgroundSection
            componentTree={props.componentTree}
            selectedComponentId={props.selectedComponentId}
            setComponentTree={props.setComponentTree}
        />
    </Section>
);

const Section = styled.div`
    height: auto;
    width: 100%;
`;

interface StyleSectionProps {
    componentTree: ComponentTree,
    selectedComponentId: number,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
};