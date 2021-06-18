import { useState } from 'react';
import styled from 'styled-components';
import { SizeSection } from './SizeSection';

export const ComponentToolbar = (props: ComponentToolbarProps) => {

    const [activeTab, setActiveTab] = useState<number>(0);
    
    return (
        <ToolbarContainer>
            <ComponentLabel>Component</ComponentLabel>
            <SelectContainer>
                <TabContainer>
                    <Tab
                        onClick={() => setActiveTab(0)}
                        activeTab={activeTab==0}
                    >
                        Size
                    </Tab>
                    <Tab
                        onClick={() => setActiveTab(1)}
                        activeTab={activeTab==1}
                    >
                        Style
                    </Tab>
                </TabContainer>
                <ContentContainer>
                    {
                        activeTab==0
                        ? <SizeSection/>
                        : <StyleSection/>
                    }
                </ContentContainer>
            </SelectContainer>
        </ToolbarContainer>
    );
};

const ToolbarContainer = styled.div`
    grid-column: 1/2;
    grid-row: 2/3;
    display: grid;
    grid-template-rows: 75px auto;
    background-color: #fbfbfb;
    border: solid 1px #dcdcdc;
    border-top: none;
    border-left: none;
    max-height: 100%;
    padding-bottom: 25px;
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

const Tab = styled.div<{activeTab: boolean}>`
    height: 30px;
    width: 100%;
    border-radius: 5px 5px 0px 0px;
    border: solid 1px #dcdcdc;
    border-bottom: ${props => props.activeTab ? "transparent" : ""};
    background-color: ${props => props.activeTab ? "whitesmoke" : "#fbfbfb"};
    box-sizing: border-box;
`;

const ContentContainer = styled.div`
    background-color: whitesmoke;
    border: solid 1px #dcdcdc;
    border-top: transparent;
`;

interface ComponentToolbarProps {
    
}