export enum Style {
	Operation,
	Value,
	Number
}

export let canOverwrite = true

export function setCanOverwrite(value: boolean) {
	canOverwrite = value
}