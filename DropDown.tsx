import Card from "@ui-elements/Card";
import InputField, { InputFieldProps } from "@ui-elements/InputField";
import classNames from "classnames";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
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
		function close(event: MouseEvent) {
			if (ref.current?.contains(event.target as Node)) return;
			setOpen(false);
		}

		// Add the event listener
		document.addEventListener("click", close);

		// Remove the event listener
		return () => document.removeEventListener("click", close);

	}, []);

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
				onFocus={ () => setOpen(true) }
				{ ...props } />

			{/* Popover */}
			<Card className={ classNames("absolute top-0 transition-all z-10 !px-0 !gap-0", open ? "opacity-100 py-2" : "opacity-0 pointer-events-none py-0", open && props.label && "-mt-2") }>

				{/* Options */}
				{options

					// Sort by active
					.sort((a, b) => {
						if (a === props.defaultValue) return -1;
						if (b === props.defaultValue) return 1;
						return 0;
					})

					.map((option, index) => (
						<div className={ classNames(open ? props.height === "large" ? "h-14" : "h-10" : props.height === "large" ? "h-12" : "h-9", "hover:bg-gray/10 transition-[height] flex items-center px-3.5 active:bg-gray/20 font-medium text-sm") }
							key={ index }
							onClick={ () => change(option) }>{option}</div>
					))}

			</Card>

		</div>
	);

}
