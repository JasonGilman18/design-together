import { useEffect, useState } from "react";
import styled from "styled-components";
import Color from 'color';
import ComponentTree from "../../classes/ComponentTree";

export const BackgroundSection = (props: BackgroundSectionProps) => {

    const [selectedBackground, setSelectedBackground] = useState<string>("");
    const [background, setBackground] = useState<string>("");
    const [hue, setHue] = useState<number>(0);
    const [saturation, setSaturation] = useState<number>(0);
    const [lightness, setLightness] = useState<number>(0);
    const [backgroundOptions, setBackgroundOptions] = useState<string[]>([]);

    useEffect(() => {
        if(props.selectedComponentId !== -1) {
            const selectedComponent = props.componentTree.find(props.selectedComponentId);
            if(selectedComponent) {
                setSelectedBackground(selectedComponent.style.background);
                setBackground(selectedComponent.style.background);
            }
        }
    }, []);

    useEffect(() => {
        if(props.selectedComponentId !== -1) {
            const selectedComponent = props.componentTree.find(props.selectedComponentId);
            if(selectedComponent) {
                setSelectedBackground(selectedComponent.style.background);
                setBackground(selectedComponent.style.background);
                if(selectedComponent.style.background === "")
                    setBackgroundOptions([]);
                else {
                    if(selectedComponent.style.background === "transparent")
                        setBackgroundOptions([]);
                    else
                        generateBackgroundOptions(selectedComponent.style.background);
                }
            }
        }
    }, [props.selectedComponentId]);

    function updateBackground(newBackground: string) {
        const selectedComponent = props.componentTree.find(props.selectedComponentId);
        if(selectedComponent) {
            if(newBackground === "") {
                selectedComponent.updateBackground("transparent");
                setBackgroundOptions([]);
            }
            else {
                var color = Color(newBackground, "hex");
                if(color.hue() !== hue)
                    setHue(color.hue());
                if(color.saturationl() !== saturation)
                    setSaturation(color.saturationl());
                if(color.lightness() !== lightness)
                    setLightness(color.lightness());
                setBackground(newBackground);
                setSelectedBackground(newBackground);
                selectedComponent.updateBackground(newBackground);
                generateBackgroundOptions(newBackground);
            }
            props.setComponentTree(prev => {
                return prev.copy();
            });
        }
    }

    function updateHue(newHue: number) {
        var color;
        if(background !== "transparent" && background !== "") {
            color = Color(background, "hex");
            color = color.hue(newHue);
            color = color.saturationl(saturation);
            color = color.lightness(lightness);    
        }
        else
            color = Color("#000000", "hex");
        setHue(newHue);
        setBackground(color.hex());
        generateBackgroundOptions(color.hex());
    }

    function updateSaturation(newSaturation: number) {
        var color;
        if(background !== "transparent" && background !== "") {
            color = Color(background, "hex");
            color = color.saturationl(newSaturation);
            color = color.hue(hue);
            color = color.lightness(lightness);
        }
        else
            color = Color("#000000", "hex");
        setSaturation(newSaturation);
        setBackground(color.hex());
        generateBackgroundOptions(color.hex());
    }

    function updateLightness(newLightness: number) {
        var color;
        if(background !== "transparent" && background !== "") {
            color = Color(background, "hex");
            color = color.lightness(newLightness);
            color = color.hue(hue);
            color = color.saturationl(saturation);
        }
        else
            color = Color("#000000", "hex");
        setLightness(newLightness);
        setBackground(color.hex());
        generateBackgroundOptions(color.hex());
    }

    function generateBackgroundOptions(newBackground: string) {
        var color = Color(newBackground, "hex");
        var options: string[] = [];
        var shadePercentage: number;
        var huePercentage: number; 
        for(var r=0;r<5;r++) {
            huePercentage = (r % 2) === 0 ? .25 : .5; 
            for(var c=0;c<5;c++) {
                var tempColor: Color = color;
                shadePercentage = (c % 2) === 0 ? .5 : .25;
                if(c < 2) {
                    tempColor = tempColor.darken(shadePercentage);
                }
                if(c > 2) {
                    tempColor = tempColor.lighten(shadePercentage);
                }
                if(r < 2) {
                    tempColor = tempColor.hue(tempColor.hue()*huePercentage);
                    if(tempColor.hue() <= 5)
                        tempColor = tempColor.hue(180 * (1+huePercentage));
                }
                if(r > 2) {
                    tempColor = tempColor.hue(tempColor.hue()*(1+huePercentage));
                    if(tempColor.hue() >= 355)
                        tempColor = tempColor.hue(180 * (1+huePercentage));
                }
                options.push(tempColor.hex());
            }
        }
        setBackgroundOptions([...options]);
    }
    
    return (
        <BackgroundContainer>
            <SelectedColorDisplay style={{backgroundColor: selectedBackground}}/>
            <ChooseColorContainer>
                {
                    backgroundOptions.map((background: string, index: number) => (
                        <ChooseColorDisplay 
                            style={{backgroundColor: background}}
                            onClick={() => updateBackground(background)}
                            key={index}
                        />
                    ))
                }
            </ChooseColorContainer>
            <InputContainer>
                <BackgroundInputLabel>Selected Color: </BackgroundInputLabel>
                <TextInput
                    value={selectedBackground}
                    onKeyPress={(e) => {if(e.key==="Enter") updateBackground(selectedBackground)}}
                    onChange={(e) => setSelectedBackground(e.currentTarget.value)}
                />
                <BackgroundInputLabel>Hue: </BackgroundInputLabel>
                <SliderInput
                    type="range"
                    min={0}
                    max={360}
                    value={hue}
                    onChange={(e) => updateHue(parseInt(e.currentTarget.value))}
                />
                <BackgroundInputLabel>Saturation: </BackgroundInputLabel>
                <SliderInput
                    type="range"
                    min={0}
                    max={100}
                    value={saturation}
                    onChange={(e) => updateSaturation(parseInt(e.currentTarget.value))}
                />
                <BackgroundInputLabel>Lightness: </BackgroundInputLabel>
                <SliderInput
                    type="range"
                    min={0}
                    max={100}
                    value={lightness}
                    onChange={(e) => updateLightness(parseInt(e.currentTarget.value))}
                />
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
    height: 100px;
    width: 75px;
    justify-self: end;
    align-self: center;
    border: solid 1px #dcdcdc;
    border-right: none;
    box-sizing: border-box;
    border-radius: 5px 0px 0px 5px;
`;

const ChooseColorContainer = styled.div`
    height: 100px;
    width: 115px;
    justify-self: start;
    align-self: center;
    box-sizing: border-box;
    border: solid 1px #dcdcdc;
    border-left: none;
    border-radius: 0px 5px 5px 0px;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 20% 20% 20% 20% 20%;
`;

const ChooseColorDisplay = styled.div`
    height: 100%;
    width: 100%;
    justify-self: center;
    align-self: center;
    position: relative;
    &:hover {
        height: 125%;
        width: 125%;
        z-index: 3;
        position: relative;
    }
    &:nth-of-type(5) {
        border-radius: 0px 5px 0px 0px;
    }
    &:nth-of-type(25) {
        border-radius: 0px 0px 5px 0px;
    }
`;

const InputContainer = styled.div`
    margin-top: 15px;
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 30% auto;
`;

const BackgroundInputLabel = styled.h6`
    user-select: none;
    height: max-content;
    width: max-content;
    align-self: center;
    justify-self: end;
    margin: 0px 10px 0px 0px;
`;

const TextInput = styled.input`
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

const SliderInput = styled.input`

`;

interface BackgroundSectionProps {
    componentTree: ComponentTree,
    selectedComponentId: number,
    setComponentTree: React.Dispatch<React.SetStateAction<ComponentTree>>
};