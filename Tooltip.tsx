import classNames from "classnames";
import { HTMLAttributes } from "react";

export interface TooltipProps {
	anchor?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ children, className, anchor = "top", ...props }: TooltipProps & HTMLAttributes<HTMLDivElement>) {

	const anchors = {
		top: "top-full origin-top my-2 mx-auto left-1/2 -translate-x-1/2",
		bottom: "bottom-full origin-bottom my-2 mx-auto left-1/2 -translate-x-1/2",
		left: "left-full origin-left mx-2 my-auto top-1/2 -translate-y-1/2",
		right: "right-full origin-right mx-2 my-auto top-1/2 -translate-y-1/2"
	};

	return (
		<div className={ classNames("absolute text-white bg-neutral-500 dark:bg-neutral-700 text-xs font-medium rounded-md h-6 inline-flex items-center px-2 pointer-events-none opacity-0 scale-0 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all select-none whitespace-nowrap", anchors[anchor], className) }
			{ ...props }>{children}</div>
	);
}
