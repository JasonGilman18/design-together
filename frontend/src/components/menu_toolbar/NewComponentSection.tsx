import styled from "styled-components";
import {ContainerButton} from '../interactive/ContainerButton';
import {RoundedContainerButton} from '../interactive/RoundedContainerButton';
import {CircleContainerButton} from '../interactive/CircleContainerButton';
import {HeaderOneButton} from '../interactive/HeaderOneButton';
import {HeaderTwoButton} from '../interactive/HeaderTwoButton';
import {HeaderThreeButton} from '../interactive/HeaderThreeButton';
import { TextBlockButton } from "../interactive/TextBlockButton";
import { GridContainerButton } from "../interactive/GridContainerButton";
import ComponentTree from "../../classes/ComponentTree";

export const NewComponentSection = (props: NewComponentSectionProps) => (
    <Section>
        <ContainerButton newComponent={props.newComponent}/>
        <RoundedContainerButton newComponent={props.newComponent}/>
        <CircleContainerButton newComponent={props.newComponent}/>
        <HeaderOneButton newComponent={props.newComponent}/>
        <HeaderTwoButton newComponent={props.newComponent}/>
        <HeaderThreeButton newComponent={props.newComponent}/>
        <TextBlockButton newComponent={props.newComponent}/>
        <GridContainerButton 
            newComponent={props.newComponent}
            componentTree={props.componentTree}
            selectedComponentId={props.selectedComponentId}
        />
    </Section>
);

const Section = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
`;

interface NewComponentSectionProps {
    newComponent: (type: string) => void,
    componentTree: ComponentTree,
    selectedComponentId: number | null
};