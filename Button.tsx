import classNames from "classnames";
import { HTMLAttributes } from "react";

interface ButtonProps {
	size: "default";
	variant: "default" | "outlined" | "flat";
}

export default function Button({ children, className, size = "default", variant = "default", ...props }: Partial<ButtonProps & { type: "button" | "submit" | "reset" }> & HTMLAttributes<HTMLButtonElement>) {

	// Styles
	const sizes = {
		default: "px-4 h-9 py-1 text-sm"
	};

	const variants = {
		default: "bg-primary text-white hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 !shadow-primary-800/50 shadow-md hover:shadow-lg",
		flat: "bg-transparent text-primary hover:bg-primary/10 hover:active:bg-primary/20 focus:bg-primary/10",
		outlined: "bg-transparent text-primary ring-1 ring-primary hover:bg-primary/10 hover:active:bg-primary/20 focus:bg-primary/10"
	};
	
	const base = "rounded-md font-medium uppercase font-roboto tracking-[0.75px] duration-150 select-none appearance-none";

	return (
		<button
			className={ classNames(
				base,
				sizes[size],
				variants[variant],
				className
			) }
			{ ...props }>
			{children}
		</button>
	);
}
