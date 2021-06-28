import { useEffect, useState } from "react";
import styled from "styled-components";

export const BackgroundSection = (props: BackgroundSectionProps) => {

    const [color, setColor] = useState<string>("");

    useEffect(() => {
        
    }, []);

    return (
        <BackgroundContainer>
            <SelectedColorDisplay/>
            <ChooseColorContainer/>
            <InputContainer>
                <BackgroundInputLabel>Color: </BackgroundInputLabel>
                <Input/>
            </InputContainer>
        </BackgroundContainer>
    );
}

const BackgroundContainer = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: solid 1px #dcdcdc;
`;

const SelectedColorDisplay = styled.div`
    height: 75px;
    width: 75px;
    justify-self: end;
    align-self: center;
    border: solid 1px #dcdcdc;
    box-sizing: border-box;
    border-radius: 5px 0px 0px 5px;
`;

const ChooseColorContainer = styled.div`
    height: 75px;
    width: 115px;
    justify-self: start;
    align-self: center;
    box-sizing: border-box;
    border: solid 1px #dcdcdc;
    border-left: transparent;
    border-radius: 0px 5px 5px 0px;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 25% 25% 25% 25%;
`;

const InputContainer = styled.div`
    margin-top: 15px;
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 30% auto auto;
`;

const BackgroundInputLabel = styled.h6`
    user-select: none;
    height: max-content;
    width: max-content;
    align-self: center;
    justify-self: end;
    margin: 0px 10px 0px 0px;
`;

const Input = styled.input`
    justify-self: center;
    align-self: center;
    height: 15px;
    width: 80%;
    padding: 3px;
    border-radius: 5px;
    margin-top: 0px;
    margin-right: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px inset;
    background-color: whitesmoke;
    &:focus {
        outline: none;
    }
`;

interface BackgroundSectionProps {

};