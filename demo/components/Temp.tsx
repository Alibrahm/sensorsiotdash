import * as React from 'react';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';;
import Box from '@mui/material/Box';
const Separator = styled('div')(
    ({ theme }) => `
  height: ${theme.spacing(3)};
`,
);
const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 12,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

const marks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 40,
        label: '40°C',
    },
    {
        value: 60,
        label: '60°C',
    },
    {
        value: 87,
        label: '80°C',
    },
    {
        value: 100,
        label: '100°C',
    },
];

function valuetext(value: number) {
    return `${value}°C`;
}

export default function Temp({ value }:any) {
    function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }
    return (
        <Box sx={{ height: 200 }}>
            {/* <Typography id="track-false-slider" gutterBottom>
                Temperature
            </Typography> */}
            {/* <Slider
                
                sx={{
                    '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                    },
                }}
                orientation="vertical"
                track={false}
                aria-labelledby="track-false-slider"
                getAriaValueText={valuetext}
                value={value}
                onKeyDown={preventHorizontalKeyboardNavigation}
                marks={marks}
            /> */}
            <PrettoSlider
                valueLabelDisplay="on"
                aria-label="pretto slider"
                value={20}
                
            />
            {/* <Separator /> */}
        </Box>
    );
}