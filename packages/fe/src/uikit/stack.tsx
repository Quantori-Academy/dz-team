import { castArray, includes, isString } from 'lodash'
import React, { memo, RefAttributes } from 'react'
import MuiStack, { StackProps as MuiStackProps } from '@mui/material/Stack'

import { getThemeColor, mergeClasses, ThemeAvailableColorPlus } from '../ui-theme'

export type StackProps = MuiStackProps<
	React.ElementType,
	{
		bgColor?: ThemeAvailableColorPlus
		automationId?: string
		automationDisabled?: boolean
	}
>

const alignStackItems = (direction: MuiStackProps['direction']) => {
	return isString(direction)
		? includes(['row', 'row-reverse'], direction)
			? 'center'
			: 'flex-start'
		: undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UIStack = React.forwardRef<any, StackProps>(
	(
		{
			className,
			direction = 'row',
			alignItems,
			bgColor,
			automationId,
			automationDisabled,
			sx,
			...props
		},
		ref,
	) => {
		return (
			<MuiStack
				ref={ref}
				className={mergeClasses('UIStack-root', className)}
				direction={direction}
				alignItems={alignItems ?? alignStackItems(direction)}
				data-automation-id={automationId}
				data-automation-disabled={automationDisabled}
				sx={[
					{
						bgcolor: getThemeColor(bgColor),
						color: getThemeColor(bgColor, { contrast: true }),
					},
					...castArray(sx),
				]}
				{...props}
			/>
		)
	},
)

UIStack.displayName = 'UI.Stack'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Stack = memo<StackProps & RefAttributes<any>>(UIStack)
