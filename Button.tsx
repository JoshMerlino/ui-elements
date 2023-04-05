import classNames from "classnames";
import { HTMLAttributes } from "react";

interface ButtonProps {
	size: "md";
	color: "primary"
	raised: boolean;
}

export default function Button({ children, className, size = "md", color = "primary", raised = true, ...props }: Partial<ButtonProps> & HTMLAttributes<HTMLButtonElement> & { type?: "button" | "submit" | "reset" }) {

	const base = "rounded-md font-medium uppercase text-white font-roboto tracking-[0.75px] duration-150 select-none  appearance-none";
	const sizes = {
		md: "px-4 h-9 py-1 text-md"
	};

	const colors = {
		primary: "bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 !shadow-primary-800/50",
	};

	return (
		<button
			className={ classNames(
				base,
				sizes[size],
				colors[color],
				className,
				raised && "shadow-md hover:shadow-lg"
			) }
			{ ...props }>
			{children}
		</button>
	);
}
