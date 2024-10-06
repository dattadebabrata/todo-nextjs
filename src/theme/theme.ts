import {createTheme} from '@mantine/core';
import {ColorConfig} from "../constants";

const theme = createTheme({
    fontFamily: 'Rubik',
    primaryColor: 'primary',
    colors: {
        'primary': Array.from({length: 10}, () => ColorConfig.primary),
        'secondary': Array.from({length: 10}, () => ColorConfig.secondary),
    },
    focusRing: 'always',
    white: ColorConfig.white,
    black: ColorConfig.black,
    other: {
        customFocusStyle: {
            '.mantine-focus-always:focus': {
                outline: 'none !important',
            },
        },
    },
})
export default theme;
