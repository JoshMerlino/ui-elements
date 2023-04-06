import classNames from "classnames";
import { HTMLAttributes, ReactNode, useRef } from "react";
import useAnimation from "./util/useAnimation";

export interface ToolbarProps {
	children: ReactNode;
	className: string;
	htmlFor: string;
}

export default function Toolbar({ children, className, htmlFor, ...props }: Partial<ToolbarProps> & HTMLAttributes<HTMLDivElement>) {

	const ref = useRef<HTMLDivElement>(null);
	useAnimation(function() {
		if (!ref.current || !htmlFor) return;
		const entrypoint = document.getElementById(htmlFor) as HTMLElement;
		const state = !entrypoint || entrypoint.scrollTop === 0;
		ref.current?.classList.toggle("border-b", state);
		ref.current?.classList.toggle("shadow-none", state);
		ref.current?.classList.toggle("shadow-lg", !state);
		ref.current?.classList.toggle("border-transparent", !state);
	});
	
	return (
		<header className={ classNames("min-h-[64px] !overflow-visible z-40 sticky top-0 backdrop-blur-3xl transition-shadow bg-white dark:bg-gray-800 px-4 border-gray-200 dark:border-gray-700", className) }
			ref={ ref }>
			<div className="flex items-center gap-4 justify-between h-full !overflow-visible flex-wrap !flex-row"
				{ ...props }>
				{children}
			</div>
		</header>
	);

}