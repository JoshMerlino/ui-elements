import classNames from "classnames";
import { HTMLAttributes } from "react";

interface CardProps {
	variant: "default" | "outlined";
}

export default function Card({ children, className, variant = "default", ...props }: Partial<CardProps> & HTMLAttributes<HTMLDivElement>): JSX.Element {
	
	// Styles
	const base = "text-sm rounded-lg text-gray-600 bg-white dark:bg-gray-800 dark:text-gray-400 overflow-hidden flex flex-col p-4 gap-2 w-full";

	const variants = {
		default: "shadow dark:shadow-black/20",
		outlined: "border border-gray-500/25"
	};

	return (
		<div
			className={ classNames(base, className, variants[variant]) }
			{ ...props }>{children}</div>
	);
}