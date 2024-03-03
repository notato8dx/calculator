import { Button, GridItem, Tooltip } from '@chakra-ui/react'

export default function GridButton({ children, colSpan, tooltip, onClick, symbol }) {
	return <GridItem colSpan={colSpan}>
		<Tooltip label={tooltip} openDelay={1000}>
			<Button style={{ width: '100%' }} onClick={onClick}>
				{symbol}
			</Button>
		</Tooltip> 
	</GridItem>
}