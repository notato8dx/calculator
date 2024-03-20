import { JSX, useEffect, useRef } from 'react'
import styles from './styles.module.css'

export default ({
	children,
	className,
	...props
}: JSX.IntrinsicElements['div']) => {
	const root = useRef<Element>(null!)

	useEffect(() => {
		root.current.scrollTop = root.current.scrollHeight
	}, [children])

	return <div ref={root as React.RefObject<HTMLDivElement>} className={`${styles.root} ${className}`} {...props}>
		{children}
	</div>
}