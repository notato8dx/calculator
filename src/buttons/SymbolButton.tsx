export default function SymbolButton({ symbol, ...props }: { symbol: string, onClick: () => void, className?: string }) {
	return <button {...props}>
		{symbol}
	</button>
}