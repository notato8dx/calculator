export default function GridButton({ style, onClick, symbol }) {
	return <button style={style} onClick={onClick}>
		{symbol}
	</button>
}