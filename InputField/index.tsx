import classNames from "classnames";
import { InputHTMLAttributes, useEffect, useRef } from "react";
import "./index.css";

export interface InputFieldProps {
	height: "default" | "large";
	label: string;
	hint: string;
}

export default function InputField({ label, hint, className, height = "default", ...props }: Partial<InputFieldProps> & InputHTMLAttributes<HTMLInputElement>) {

	// Initialize ref
	const ref = useRef<HTMLDivElement>(null);

	// Initialize unique ID
	props.id = props.id || Math.floor(Math.random() * 1e10).toString(36);
	
	// Check for content
	useEffect(function() {
		const input = ref.current?.querySelector("input");
		const setHasContent = (hasContent: boolean) => ref.current?.classList.toggle("hascontents", hasContent);
		setHasContent((input?.value.length || 0) > 0);
		input?.addEventListener("input", () => setHasContent(input.value.length > 0));
		return () => input?.removeEventListener("input", () => setHasContent(input.value.length > 0));
	});
	
	// Styles
	const heights = {
		default: "h-12",
		large: "h-16"
	};
	
	const container = "relative w-full group input-group pb-2 mb-1";
	const input = "peer w-full h-full text-gray-700 dark:text-gray-200 font-roboto font-normal disabled:border-dashed transition-colors placeholder-shown:border placeholder-shown:border-gray-500/20 border px-3 py-2.5 focus:px-[11px] focus:!border-2 rounded-lg border-gray-400/40 dark:border-gray-400/25 focus:!border-primary backdrop-blur-2xl !bg-white/10 dark:!bg-gray-900/10 group-[.hascontents]:invalid:!border-error group-[.invalid]:!border-error placeholder:text-gray-600 dark:placeholder:text-gray-400 text-base md:text-sm";
	const labelStyles = "text-gray-600 dark:text-gray-400 font-roboto font-normal text-sm px-1 absolute top-[20px] left-2 -translate-y-1/2 py-0.5 peer-focus:top-0.5 peer-focus:text-primary peer-focus:text-xs peer-focus:px-2 peer-placeholder-shown:text-xs peer-placeholder-shown:px-2 peer-placeholder-shown:top-0.5 z-[1] transition-all peer-focus:bg-gray-100 dark:peer-focus:bg-gray-900 peer-placeholder-shown:bg-gray-100 dark:peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:dark:bg-gray-900 group-[.hascontents]:bg-gray-100 dark:group-[.hascontents]:bg-gray-900 group-[.hascontents]:text-xs group-[.hascontents]:px-2 group-[.hascontents]:top-0.5 group-[.hascontents]:peer-invalid:!text-error group-[.invalid]:!text-error group-[.card]:!bg-white dark:group-[.card]:!bg-gray-800 whitespace-nowrap";
	const hintStyles = "px-3 text-xs font-medium font-roboto my-0.5 text-gray-500 group-[.hascontents]:peer-invalid:!text-error group-[.invalid]:!text-error";

	return (
		<div
			className={ classNames(container, className, heights[height]) }
			ref={ ref }>
			<input
				className={ classNames(input, height === "large" && "px-5 focus:px-[19px]", className) }
				{ ...props } />
			{ label && <label
				className={ classNames(labelStyles, height === "large" && "top-[28px] mx-2") }
				htmlFor={ props.id }>{label}</label> }

			{ hint && <p
				className={ hintStyles }>{hint}</p> }
		</div>
	);
}
