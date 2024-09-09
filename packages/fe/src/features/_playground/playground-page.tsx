import { FC } from 'react'

import { Stack } from 'uikit'

// import { AlertDemo } from 'alerts/demo-alerts'
// import { ModalDemo } from 'modals/demo-modals'

export const Playground: FC = () => {
	return (
		<Stack
			justifyContent="center"
			bgColor="warning.dark"
			sx={{ minHeight: 600, borderRadius: 3 }}
		>
			you can have fun here
		</Stack>
	)
}
