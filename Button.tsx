import classNames from "classnames";
import { HTMLAttributes, useRef } from "react";
import useRipple from "./util/useRipple";

interface ButtonProps {
	variant: "glowing" | "outlined" | "flat" | "raised";
	ripple: boolean;
}

export default function Button({ children, className, variant = "glowing", ripple = true, ...props }: Partial<ButtonProps & { type: "button" | "submit" | "reset" }> & HTMLAttributes<HTMLButtonElement>) {

	const ref = useRef<HTMLButtonElement>(null);
	useRipple(ref, ripple, (variant === "outlined" || variant === "flat") ? "bg-primary" : "bg-white");

	// Styles
	const variants = {
		glowing: "bg-primary text-white hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 !shadow-primary-800/50 shadow-md hover:shadow-lg",
		raised: "bg-primary text-white hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 !shadow-black/20 shadow-md hover:shadow-lg",
		flat: "bg-transparent text-primary hover:bg-primary/10 hover:active:bg-primary/20 focus:bg-primary/10",
		outlined: "bg-transparent text-primary ring-1 ring-primary hover:bg-primary/10 hover:active:bg-primary/20 focus:bg-primary/10"
	};
	
	const base = "rounded-md font-medium uppercase font-roboto tracking-[0.75px] duration-150 select-none appearance-none";

	return (
		<button
			className={ classNames(
				base,
				"px-4 h-9 py-1 text-sm",
				variants[variant],
				className
			) }
			ref={ ref }
			{ ...props }>{children}</button>
	);
}
