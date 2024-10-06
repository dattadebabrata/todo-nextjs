import * as React from 'react';

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {MantineProvider} from '@mantine/core';

import theme from './theme.ts';

export default function ThemeRegistry({children}: { children: React.ReactNode }) {
    return (
        <MantineProvider forceColorScheme={'light'} theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            {children}
        </MantineProvider>
    );
}
