import classNames from "classnames";
import { HTMLAttributes, ReactNode, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export interface AccordianItemProps {
	header: ReactNode;
	defaultChecked: boolean;
}

export default function AccordionItem({ children, className, header, defaultChecked, ...props }: Partial<AccordianItemProps> & HTMLAttributes<HTMLLIElement>): JSX.Element {
	
	const [ isActive, setActive ] = useState(defaultChecked);

	return (
		<li className={ classNames("flex flex-col bg-white dark:bg-gray-800 transition-[margin,shadow,border-radius] shadow rounded-lg my-4", isActive && "shadow-md", className) }
			{ ...props }>
			<div className={ classNames("flex gap-4 justify-between transition-[padding] items-center cursor-pointer py-3 px-6 border-gray-300/50 dark:border-gray-700/50", isActive && "py-4 border-b") }
				onClick={ () => setActive(a => !a) }>
				<div className="grow">{header}</div>
				<IoChevronDown className={ classNames("text-xl shrink-0 transition-transform", isActive && "rotate-180") } />
			</div>
			<div className={ classNames("px-6 transition-[max-height,padding,opacity] overflow-hidden h-full text-sm text-gray-700 dark:text-gray-300", isActive ? "py-4 max-h-full opacity-1" : "max-h-0 opacity-0 h-0") }>
				{children}
			</div>
		</li>
	);

}
