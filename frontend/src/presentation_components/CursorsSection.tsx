import styled from "styled-components";
import {ReactComponent as SelectCursorIcon} from '../svg/SelectCursorIcon.svg';

export const CursorsSection = (props: CursorsSectionProps) => (
    <Section>
        <Button>
            <SelectCursorIcon/>
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
    & > svg {
        height: 20px;
        width: 20px;
    }
`;

const Section = styled.div`
    grid-column: 3/4;
    grid-row: 1/2;
    border-right: solid 1px #dcdcdc;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

interface CursorsSectionProps {

};