import { useState } from 'react';
import styled from 'styled-components';
import ComponentTree from '../../classes/ComponentTree';
import { SizeSection } from './SizeSection';
import { StyleSection } from './StyleSection';
import { PositionSection } from './PositionSection';

export const ComponentToolbar = (props: ComponentToolbarProps) => {

    const [activeTab, setActiveTab] = useState<number>(0);
    
    return (
        <ToolbarContainer menuToolbarHeight={props.menuToolbarHeight}>
            <ComponentLabel>Component</ComponentLabel>
            <SizeSection
                componentTree={props.componentTree}
                selectedComponentId={props.selectedComponentId}
                setComponentTree={props.setComponentTree}   
            />
            <SelectContainer>
                <TabContainer>
                    <Tab
                        onClick={() => setActiveTab(0)}
                        activeTab={activeTab===0}
                    >
                        <TabLabel>Position</TabLabel>
                    </Tab>
                    <Tab
                        onClick={() => setActiveTab(1)}
                        activeTab={activeTab===1}
                    >
                        <TabLabel>Style</TabLabel>
                    </Tab>
                </TabContainer>
                <ContentContainer>
                    {
                        activeTab === 0
                        ? <PositionSection
                            componentTree={props.componentTree}
                            setComponentTree={props.setComponentTree}
                            selectedComponentId={props.selectedComponentId}
                        />
                        : activeTab === 1
                        ? <StyleSection
                            componentTree={props.componentTree}
                            setComponentTree={props.setComponentTree}
                            selectedComponentId={props.selectedComponentId}
                        />
                        : null
                    }
                </ContentContainer>
            </SelectContainer>
        </ToolbarContainer>
    );
};

const ToolbarContainer = styled.div<{menuToolbarHeight: number}>`
    grid-column: 1/2;
    grid-row: 2/3;
    display: grid;
    grid-template-rows: 50px 100px calc(100vh - 75px - 50px - 100px - 15px);
    background-color: #fbfbfb;
    border: solid 1px #dcdcdc;
    border-top: none;
    border-left: none;
    min-height: calc(100vh - 75px);
`;

const ComponentLabel = styled.h3`
    user-select: none;
    justify-self: center;
    align-self: center;
`;

const SelectContainer = styled.div`
    width: 85%;
    justify-self: center;
    justify-self: center;
    display: grid;
    grid-template-rows: 30px auto;
`;

const TabContainer = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 50% 50%;
`;

const TabLabel = styled.h5`
    margin: 0px;
    user-select: none;
    justify-self: center;
    align-self: center;
`;

const Tab = styled.div<{activeTab: boolean}>`
    height: 30px;
    width: 100%;
    border-radius: 5px 5px 0px 0px;
    border: solid 1px #dcdcdc;
    border-bottom: ${props => props.activeTab ? "transparent" : ""};
    background-color: ${props => props.activeTab ? "whitesmoke" : "#fbfbfb"};
    box-sizing: border-box;
    display: grid;
    & > ${TabLabel} {
        color: ${props => props.activeTab ? "#282c33" : "#a6a6a6"}
    }
`;

const ContentContainer = styled.div`
    background-color: whitesmoke;
    border: solid 1px #dcdcdc;
    border-top: transparent;
    max-width: 100%;
    overflow-y: auto;
`;

interface ComponentToolbarProps {
    componentTree: ComponentTree,
    selectedComponentId: number,
    menuToolbarHeight: number,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
}