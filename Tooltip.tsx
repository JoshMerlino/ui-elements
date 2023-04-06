import classNames from "classnames";
import { HTMLAttributes } from "react";

export interface TooltipProps {
	anchor?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ children, className, anchor = "top", ...props }: TooltipProps & HTMLAttributes<HTMLDivElement>) {

	const anchors = {
		top: "top-full origin-top",
		bottom: "bottom-full origin-bottom",
		left: "left-full origin-left",
		right: "right-full origin-right"
	};

	return (
		<div className={ classNames("absolute text-white bg-neutral-500 dark:bg-neutral-700 text-xs font-medium rounded-md h-6 flex items-center px-2 pointer-events-none opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all m-2 select-none", anchors[anchor], className) }
			{ ...props }>{children}</div>
	);
}
