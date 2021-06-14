import { useState } from "react";
import styled from "styled-components";
import { DropdownMenuSelect } from "./DropdownMenuSelect";
import {ReactComponent as ChevronIcon} from "../svg/chevron.svg";

export const DimensionSelect = (props: DimensionSelectProps) => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [dimension, setDimension] = useState<string>("px");

    function dimensionSelected(dimension: string) {
        setDimension(dimension);
        setShowDropdown(false);
    }

    return (
        <Container>
            <DimensionBox onClick={() => setShowDropdown(!showDropdown)}>
                <DimensionLabel style={{position:"absolute", left: "5px", width: "auto", height: "auto"}}>{dimension}</DimensionLabel>
                <ChevronIcon style={{width: "10px", height: "10px", position:"absolute", right: "5px", top: "7px"}}/>
            </DimensionBox>
            {
                showDropdown
                    ? <DropdownMenuSelect showDropdown={showDropdown} setMenu={setShowDropdown} setDimension={setDimension}>
                        <DimensionLabel onClick={() => dimensionSelected("px")}>px</DimensionLabel>
                        <DimensionLabel onClick={() => dimensionSelected("%")}>%</DimensionLabel>
                        <DimensionLabel onClick={() => dimensionSelected("vw")}>vw</DimensionLabel>
                        <DimensionLabel onClick={() => dimensionSelected("vh")}>vh</DimensionLabel>
                    </DropdownMenuSelect>
                    : null
            }
        </Container>
    );
};

const Container = styled.span`
    position: relative;
`;

const DimensionBox = styled.div`
    height: 100%;
    width: 39px;
    position: relative;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px inset;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const DimensionLabel = styled.h3`
    margin: 0px;
    font-size: small;
    font-weight: 400;
    user-select: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

interface DimensionSelectProps {

};