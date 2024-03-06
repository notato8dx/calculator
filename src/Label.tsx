export default function Label({ htmlFor, text }: { htmlFor: string, text: string }) {
	return <label htmlFor={htmlFor}>
		{text}
	</label>
}