import classNames from "classnames";
import { HTMLAttributes, useRef } from "react";
import useRipple from "./util/useRipple";

export interface ButtonProps {
	variant: "glowing" | "outlined" | "flat" | "raised";
	color: "primary" | "error" | "success" | "warn" | "gray";
	waves: boolean;
	size: "default" | "large";
}

export default function Button({ children, className, size = "default", variant = "glowing", waves = true, color = "primary", ...props }: Partial<ButtonProps & { type: "button" | "submit" | "reset" }> & HTMLAttributes<HTMLButtonElement>) {

	const ref = useRef<HTMLButtonElement>(null);
	useRipple(ref, waves, (variant === "outlined" || variant === "flat") ? (
		color === "success" ? "bg-success" :
			color === "warn" ? "bg-warn" :
				color === "error" ? "bg-error" :
					color === "gray" ? "bg-gray-500" :
						"bg-primary"
	) : "bg-white");

	const bgColor = color === "success" ? "bg-success-600 hover:bg-success-700 focus:bg-success-700 active:bg-success-800 !shadow-success-800/50" :
		color === "warn" ? "bg-warn-600 hover:bg-warn-700 focus:bg-warn-700 active:bg-warn-800 !shadow-warn-800/50" :
			color === "error" ? "bg-error-600 hover:bg-error-700 focus:bg-error-700 active:bg-error-800 !shadow-error-800/50" :
				color === "primary" ? "bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-800 !shadow-primary-800/50" :
					"bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-700";
	
	const flatColor = color === "success" ? "text-success hover:bg-success/10 hover:active:bg-success/20 focus:bg-success/10" :
		color === "warn" ? "text-warn hover:bg-warn/10 hover:active:bg-warn/20 focus:bg-warn/10" :
			color === "error" ? "text-error hover:bg-error/10 hover:active:bg-error/20 focus:bg-error/10" :
				color === "primary" ? "text-primary hover:bg-primary/10 hover:active:bg-primary/20 focus:bg-primary/10" :
					"text-gray-500 hover:bg-gray-500/10 hover:active:bg-gray-500/20 focus:bg-gray-500/10";
	
	// Styles
	const glowing = classNames("text-white shadow-md hover:shadow-lg", bgColor);
	const flat = classNames("bg-transparent", flatColor);
	const variants = {
		glowing,
		flat,
		raised: classNames(glowing.split(" ").filter(a => !a.includes("shadow-primary") && !a.includes("shadow-error") && !a.includes("shadow-warn") && !a.includes("shadow-success")).join(" "), "!shadow-black/10"),
		outlined: classNames(flat, "ring-1", color === "success" ? "ring-success" :
			color === "warn" ? "ring-warn" :
				color === "error" ? "ring-error" :
					color === "primary" ? "ring-primary" :
						"ring-gray-500"),
	};

	const sizes = {
		default: "px-4 h-9 py-1 text-sm",
		large: "px-6 h-11 py-2 text-base",
	};
	
	const base = "rounded-md font-medium uppercase font-roboto tracking-[0.75px] duration-150 select-none appearance-none relative overflow-hidden whitespace-nowrap";

	return (
		<button
			className={ classNames(
				base,
				sizes[size],
				variants[variant],
				className
			) }
			ref={ ref }
			{ ...props }>{children}</button>
	);
}
