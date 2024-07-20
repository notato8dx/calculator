import { JSX, useEffect, useRef } from 'react'
import styles from './styles.module.css'

export default ({
	className,
	...props
}: JSX.IntrinsicElements['div']) => {
	const root = useRef<HTMLDivElement>(null!)

	useEffect(() => {
		root.current.scrollTop = root.current.scrollHeight
	}, [props.children])

	return <div
		ref={root}
		className={`${styles.root} ${className}`}
		{...props}
	/>
}