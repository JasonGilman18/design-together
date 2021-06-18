import styled from "styled-components";
import {ReactComponent as RoundedContainerIcon} from '../svg/RoundedContainerIcon.svg';
import {ReactComponent as ContainerIcon} from '../svg/ContainerIcon.svg';
import {ReactComponent as CircleContainerIcon} from '../svg/CircleContainerIcon.svg';

export const ComponentSection = (props: ComponentSectionProps) => (
    <Section>
        <Button>
            <ContainerIcon/>
        </Button>
        <Button>
            <RoundedContainerIcon/>
        </Button>
        <Button>
            <CircleContainerIcon/>
        </Button>
        <Button>
            <ContainerIcon/>
        </Button>
        <Button>
            <RoundedContainerIcon/>
        </Button>
        <Button>
            <CircleContainerIcon/>
        </Button>
        <Button>
            <RoundedContainerIcon/>
        </Button>
        <Button>
            <CircleContainerIcon/>
        </Button>
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
    & > * {
        height: 20px;
        width: 20px;
    }
`;

const Section = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    justify-items: center;
    align-items: center;
    box-sizing: border-box;
    grid-template-columns: auto auto auto auto auto auto auto;
    padding: 5px;
`;

interface ComponentSectionProps {
    newComponent: (type: string) => void
};