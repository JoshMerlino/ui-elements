import Card from "@ui-elements/Card";
import InputField, { InputFieldProps } from "@ui-elements/InputField";
import classNames from "classnames";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { uuid } from "../util/uuid";

export default function DropDown({ options, className, ...props }: { options: string[]; } & Partial<InputFieldProps> & HTMLAttributes<HTMLInputElement>) {

	// Initialize unique ID
	const id = uuid();
	const ref = useRef<HTMLDivElement>(null);

	// Initialize popover state
	const [ open, setOpen ] = useState(false);

	// Attach to click events
	useEffect(function() {
		if (!ref.current) return;

		// Close the popover when clicking outside of it
		function close(event: Event) {
			if (ref.current?.contains(event.target as Node)) return;
			setOpen(false);
		}

		// Add the event listener
		document.addEventListener("mousedown", close);

		// Close when a different dropdown is opened
		document.addEventListener("focusin", close);

		// Remove the event listener
		return () => document.removeEventListener("mousedown", close);

	}, [ open, options ]);

	function change(option: string) {
		setOpen(false);
		const input = document.getElementById(id) as HTMLInputElement;
		input.value = option;
		if (props.onChange) props.onChange({ target: { value: option }} as any);
	}

	return (
		<div className="relative group"
			ref={ ref }>

			{/* Input field */}
			<InputField
				className={ classNames(className) }
				id={ id }
				onFocus={ _ => setOpen(true) }
				readOnly
				{ ...props } />

			{/* Popover */}
			<Card className={ classNames("absolute top-0 transition-all z-10 !px-0 !gap-0 !text-gray-800 dark:!text-gray-200", open ? "opacity-100 py-2" : "opacity-0 pointer-events-none py-0", open && props.label && "-mt-2") }>

				{/* Options */}
				{options

					// Sort by active
					.sort()
					.sort((a, b) => {
						if (a === props.defaultValue) return -1;
						if (b === props.defaultValue) return 1;
						return 0;
					})

					.map((option, index) => (
						<option className={ classNames(open ? props.height === "large" ? "h-14" : "h-10" : props.height === "large" ? "h-12" : "h-9", "hover:bg-gray/10 focus:bg-gray/10 transition-[height] flex items-center px-3.5 active:bg-gray/20 font-medium text-sm") }
							key={ index }
							onClick={ () => change(option) }
							onKeyDown={ event => event.key === "Enter" && change(option) }
							tabIndex={ open ? 0 : -1 }>{option}</option>
					))}

			</Card>

			<div className={ classNames("absolute top-0 right-0 flex items-center justify-center pointer-events-none opacity-50", props.height === "large" ? "h-14 px-4" : "h-10 px-2") }>
				<IoMdArrowDropdown className="text-base" />
			</div>

		</div>
	);

}
