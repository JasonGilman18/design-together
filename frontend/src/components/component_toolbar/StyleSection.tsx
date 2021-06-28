import styled from "styled-components";
import { BackgroundSection } from "./BackgroundSection";

export const StyleSection = (props: StyleSectionProps) => (
    <Section>
        <BackgroundSection/>
    </Section>
);

const Section = styled.div`
    height: 100%;
    width: 100%;
`;

interface StyleSectionProps {

};