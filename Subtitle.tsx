import classNames from "classnames";
import { HTMLAttributes } from "react";

export default function Subtitle({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>): JSX.Element {

	// Styles
	const base = "text-gray-600 dark:text-gray-400 mr-auto text-sm font-medium";
	
	return (
		<span
			className={ classNames(base, className) }
			{ ...props }>{children}</span>
	);
}