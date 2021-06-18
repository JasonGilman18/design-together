import styled from "styled-components";
import {ContainerButton} from './ContainerButton';
import {RoundedContainerButton} from './RoundedContainerButton';
import {CircleContainerButton} from './CircleContainerButton';

export const NewComponentSection = (props: NewComponentSectionProps) => (
    <Section>
        <ContainerButton newComponent={props.newComponent}/>
        <RoundedContainerButton newComponent={props.newComponent}/>
        <CircleContainerButton newComponent={props.newComponent}/>
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
    newComponent: (type: string) => void
};