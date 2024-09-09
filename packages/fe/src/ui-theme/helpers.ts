import { get, has, includes, isPlainObject } from 'lodash'
import { alpha, getContrastRatio, Theme, TransitionsOptions } from '@mui/material/styles'
import clsx from 'clsx'

import { ThemeColor, ThemeColorPath } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type AnyObject = Record<string, any>

// Just a more familiar name
export const mergeClasses = clsx

const contrastThreshold = 3
const lightTextPrimary = 'rgba(0, 0, 0, 0.87)'
const darkTextPrimary = '#fff'

export function getContrastColor(color: string) {
	return getContrastRatio(color, darkTextPrimary) >= contrastThreshold
		? darkTextPrimary
		: lightTextPrimary
}

// Color modifiers for 'getThemeColor' function
type ColorOptions = {
	important?: boolean
	contrast?: boolean
	if?: boolean
	opacity?: number
	root?: string
	key?: string
	path?: string
}

const basicColors = ['transparent', 'inherit', 'revert'] as const
type SpecialColors = 'disabled' | 'action' | 'default' | 'placeholder'
export type ColorPath = SpecialColors | ThemeColor | ThemeColorPath | (typeof basicColors)[number]

// creates function to be used in 'sx' prop, which returns theme color if correct path is provided
// tries to fix path by adding '.main' if path was not found in the theme
export function getThemeColor(colorPath?: ColorPath | null, ops?: number | ColorOptions) {
	const options = isPlainObject(ops) ? (ops as AnyObject) : { opacity: ops }
	const path = colorPath ?? options.path ?? ''
	if ((has(options, 'if') && !options.if) || !path) return undefined
	if (includes(basicColors, path)) return path
	return ({ palette }: Theme) => {
		const color = get(palette, options.root ? [options.root, path] : path)
		let value = isPlainObject(color) ? get(palette, [path, options.key ?? 'main']) : color
		if (options.contrast) {
			const oppositeColor = value
			value = get(palette, (path ?? '').split('.')[0])
			value = isPlainObject(value) ? get(value, 'contrastText') : undefined
			if (!value && oppositeColor) value = getContrastColor(oppositeColor)
		}
		value = value && options.opacity ? alpha(value, options.opacity) : value
		if (value && options.important) value = `${value} !important`
		return value
	}
}

type TransitionParams = Parameters<NonNullable<TransitionsOptions['create']>>

// creates function to be used in 'sx' prop, which returns theme transition
export function getThemeTransition(props: TransitionParams[0], options?: TransitionParams[1]) {
	return ({ transitions }: Theme) => {
		return transitions.create(props, options)
	}
}
