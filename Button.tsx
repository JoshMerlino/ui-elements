import classNames from "classnames";
import { HTMLAttributes, useRef } from "react";
import useRipple from "./util/useRipple";

export interface ButtonProps {
	variant: "glowing" | "outlined" | "flat" | "raised";
	color: "primary" | "error" | "success" | "warn"
	waves: boolean;
}

export default function Button({ children, className, variant = "glowing", waves = true, color = "primary", ...props }: Partial<ButtonProps & { type: "button" | "submit" | "reset" }> & HTMLAttributes<HTMLButtonElement>) {

	const ref = useRef<HTMLButtonElement>(null);
	useRipple(ref, waves, (variant === "outlined" || variant === "flat") ? (
		color === "success" ? "bg-success" :
			color === "warn" ? "bg-warn" :
				color === "error" ? "bg-error" :
					"bg-primary"
	) : "bg-white");

	const bgColor = color === "success" ? "bg-success hover:bg-success-600 focus:bg-success-600 active:bg-success-700 !shadow-success-800/50" :
		color === "warn" ? "bg-warn hover:bg-warn-600 focus:bg-warn-600 active:bg-warn-700 !shadow-warn-800/50" :
			color === "error" ? "bg-error hover:bg-error-600 focus:bg-error-600 active:bg-error-700 !shadow-error-800/50" :
				"bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 !shadow-primary-800/50";
	
	const flatColor = color === "success" ? "text-success hover:bg-success/10 hover:active:bg-success/20 focus:bg-success/10" :
		color === "warn" ? "text-warn hover:bg-warn/10 hover:active:bg-warn/20 focus:bg-warn/10" :
			color === "error" ? "text-error hover:bg-error/10 hover:active:bg-error/20 focus:bg-error/10" :
				"text-primary hover:bg-primary/10 hover:active:bg-primary/20 focus:bg-primary/10";
	
	// Styles
	const glowing = classNames("text-white shadow-md hover:shadow-lg", bgColor);
	const flat = classNames("bg-transparent", flatColor);
	const variants = {
		glowing,
		flat,
		raised: classNames(glowing.split(" ").filter(a => !a.includes("shadow-primary") && !a.includes("shadow-error") && !a.includes("shadow-warn") && !a.includes("shadow-success")).join(" "), "!shadow-black/20"),
		outlined: classNames(flat, "ring-1", color === "success" ? "ring-success" :
			color === "warn" ? "ring-warn" :
				color === "error" ? "ring-error" :
					"ring-primary"),
	};
	
	const base = "rounded-md font-medium uppercase font-roboto tracking-[0.75px] duration-150 select-none appearance-none relative overflow-hidden whitespace-nowrap";

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
