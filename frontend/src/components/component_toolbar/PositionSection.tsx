import styled from "styled-components";
import {ReactComponent as AlignHorizontalCenterIcon} from '../../svg/AlignHorizontalCenterIcon.svg';
import {ReactComponent as AlignHorizontalStartIcon} from '../../svg/AlignHorizontalStartIcon.svg';
import {ReactComponent as AlignHorizontalEndIcon} from '../../svg/AlignHorizontalEndIcon.svg';
import {ReactComponent as AlignVerticalCenterIcon} from '../../svg/AlignVerticalCenterIcon.svg';
import {ReactComponent as AlignVerticalStartIcon} from '../../svg/AlignVerticalStartIcon.svg';
import {ReactComponent as AlignVerticalEndIcon} from '../../svg/AlignVerticalEndIcon.svg';
import ComponentTree from "../../classes/ComponentTree";

export const PositionSection = (props: PositionSectionProps) => {

    function updateAlignHorizontal(align: string) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.updateAlignHorizontal(align);
                return prevTree.copy();
            }
            return prevTree;
        });
    }

    function updateAlignVertical(align: string) {
        props.setComponentTree(prevTree => {
            const component = prevTree.find(props.selectedComponentId);
            if(component) {
                component.updateAlignVertical(align);
                return prevTree.copy();
            }
            return prevTree;
        });
    }

    return (
        <Section>
            <AlignContainer>
                <AlignLabel>Align Horizontal:</AlignLabel>
                <AlignButtonContainer>
                    <Button 
                        selected={props.componentTree.find(props.selectedComponentId)?.style.align_horizontal === "start"}
                        onClick={() => updateAlignHorizontal("start")}
                    >
                        <AlignHorizontalStartIcon/>
                    </Button>
                    <Button 
                        selected={props.componentTree.find(props.selectedComponentId)?.style.align_horizontal === "center"}
                        onClick={() => updateAlignHorizontal("center")}
                    >
                        <AlignHorizontalCenterIcon/>
                    </Button>
                    <Button 
                        selected={props.componentTree.find(props.selectedComponentId)?.style.align_horizontal === "end"}
                        onClick={() => updateAlignHorizontal("end")}
                    >
                        <AlignHorizontalEndIcon/>
                    </Button>
                </AlignButtonContainer>
                <AlignLabel>Align Vertical:</AlignLabel>
                <AlignButtonContainer>
                    <Button 
                        selected={props.componentTree.find(props.selectedComponentId)?.style.align_vertical === "start"}
                        onClick={() => updateAlignVertical("start")}
                    >
                        <AlignVerticalStartIcon/>
                    </Button>
                    <Button 
                        selected={props.componentTree.find(props.selectedComponentId)?.style.align_vertical === "center"}
                        onClick={() => updateAlignVertical("center")}
                    >
                        <AlignVerticalCenterIcon/>
                    </Button>
                    <Button
                        selected={props.componentTree.find(props.selectedComponentId)?.style.align_vertical === "end"} 
                        onClick={() => updateAlignVertical("end")}
                    >
                        <AlignVerticalEndIcon/>
                    </Button>
                </AlignButtonContainer>
            </AlignContainer>
        </Section>
    );
};

const Button = styled.button<{selected: boolean}>`
    background-color: ${props => props.selected ? "#e6e6e6" : "transparent"};
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
    height: 100%;
    width: 100%;
`;

const AlignContainer = styled.span`
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: 15px;
`;

const AlignLabel = styled.h6`
    user-select: none;
    align-self: center;
    justify-self: end;
    margin: 15px 0px 15px 0px;
`;

const AlignButtonContainer = styled.span`
    display: grid;
    grid-template-columns: 33% 33% 33%;
    justify-items: center;
    align-items: center;
`;

interface PositionSectionProps {
    componentTree: ComponentTree,
    selectedComponentId: number | null,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
};