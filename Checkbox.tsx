import classNames from "classnames";
import { useRef } from "react";
import { MdCheck } from "react-icons/md";

export interface CheckboxProps {
	color: "primary" | "error" | "success" | "warn";
}

export default function Checkbox({ children, className, color = "primary", ...props }: Partial<CheckboxProps> & React.InputHTMLAttributes<HTMLInputElement> & { children?: React.ReactNode; }) {

	// Initialize ref
	const ref = useRef<HTMLDivElement>(null);
	
	// Initialize unique ID
	props.id = props.id || Math.floor(Math.random() * 1e10).toString(36);

	// Styles
	const container = "group flex items-center font-roboto gap-4";
	const checkbox = classNames("peer appearance-none border-2 rounded-sm w-5 h-5 border-gray-500 dark:border-gray-600 checked:border-[10px] transition-all after:content[''] after:bg-gray-500/10 after:absolute after:w-12 after:h-12 after:left-1/2 after:top-1/2 after:rounded-full after:-translate-x-1/2 after:-translate-y-1/2 after:pointer-events-none after:-z-[1] after:scale-0 focus:after:scale-100 group-active:after:scale-100 duration-100 after:transition-transform active:border-gray-600 active:dark:border-gray-500 after:z-10",
		color === "success" ? "checked:!border-success checked:after:bg-success/10" :
			color === "error" ? "checked:!border-error checked:after:bg-error/10" :
				color === "warn" ? "checked:!border-warn checked:after:bg-warn/10" :
					"checked:!border-primary checked:after:bg-primary/10"
	);
	const icon = "m-0.5 text-white scale-0 peer-checked:scale-125 absolute transition-transform pointer-events-none";
	const label = "select-none text-sm text-gray-800 dark:text-gray-200";
	
	return (
		<div
			className={ classNames(container, className) }>
			<div
				className="relative flex"
				ref={ ref }>
				<input
					className={ checkbox }
					type="checkbox"
					{ ...props } />
				<MdCheck
					className={ icon } />
			</div>
			<label
				className={ label }
				htmlFor={ props.id }>{children}</label>
		</div>
	);
}
