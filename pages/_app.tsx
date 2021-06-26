import type { AppProps } from 'next/app'
import { GeistProvider, CssBaseline, Themes, GeistUIThemesBreakpoints
} from '@geist-ui/react'

export default function App({ Component, pageProps }: AppProps) {
	const breakpoints: GeistUIThemesBreakpoints = {
		xs: { min: '0', max: '600px' },
		sm: { min: '600px', max: '900px' },
		md: { min: '900px', max: '1280px' },
		lg: { min: '1280px', max: '1920px' },
		xl: { min: '1920px', max: '10000px' },
	}

	const myTheme = Themes.createFromLight({
		type: 'myTheme',
		breakpoints,
	})

	return (
		<GeistProvider themes={[myTheme]} themeType="myTheme">
			<CssBaseline />
			<Component {...pageProps} />
		</GeistProvider>
	)
}
