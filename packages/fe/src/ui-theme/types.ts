import {
	Palette,
	PaletteColor,
	PaletteOptions,
	SxProps,
	Theme,
	ThemeOptions,
	TypeBackground,
	TypeText,
} from '@mui/material/styles'

export type MuiTheme = Theme
export type MuiSxProps = SxProps<Theme>

const bgkeys = [
	'appbar',
	'hover',
	'selected',
	'selectedAlt',
	'marked',
	'blue',
	'orange',
	'green',
	'red',
] as const

export type TypeBackgroundPlus = Record<(typeof bgkeys)[number], string>

export interface TypeColorMore {
	placeholder: string
	link: string
	tooltip: string
	dimmed: string
	intent: string
	cellSelected: string
	cellSelectedBg: string
}

export type ThemeColors = {
	primary: PaletteColor
	secondary: PaletteColor
	error: PaletteColor
	warning: PaletteColor
	info: PaletteColor
	success: PaletteColor
	text: TypeText
	divider: Palette['divider']
	background: TypeBackground
}

export type DefaultPaletteOptions = PaletteOptions & ThemeColors

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`

type DotNestedKeys<T> = (
	T extends object
		? {
				[K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`
			}[Exclude<keyof T, symbol>]
		: ''
) extends infer D
	? Extract<D, string>
	: never

export type ThemeColor = keyof ThemeColors
export type ThemeColorPath = DotNestedKeys<ThemeColors>
export type PaletteColorKeys = (keyof DefaultPaletteOptions)[]

type ThemeAvailableColor = ThemeColor | ThemeColorPath
export type ThemeAvailableColorPlus = ThemeAvailableColor | 'transparent' | 'revert' | 'inherit'

export type TypographyOptions = ThemeOptions['typography']
export type ThemeComponents = ThemeOptions['components']

export const defaultPaletteColors: PaletteColorKeys = [
	'primary',
	'secondary',
	'error',
	'warning',
	'success',
	'info',
	'text',
	'divider',
	'background',
]
