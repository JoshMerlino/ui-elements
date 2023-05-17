import classNames from "classnames";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import Button from "./Button";

export interface ExpandGroupProps {
	height?: number;
	button?: (state: boolean) => string;
}

export default function ExpandGroup({ children, height = 512, button = state => state ? "Show Less" : "Show More" }: Partial<ExpandGroupProps> & HTMLAttributes<HTMLDivElement>): JSX.Element {

	const ref = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null);
	const [ state, setState ] = useState(false);

	function resize() {
		reload();
		setState(false);
	}

	useEffect(reload, [ state ]);
	useEffect(function() {
		window.addEventListener("resize", resize);
		Promise.all(Array.from(ref.current!.querySelectorAll("img")).filter(img => !img.complete)
			.map(img => new Promise(resolve => {
				img.onload = resolve;
			})))
			.then(() => {
				resize();
			});
		return () => window.removeEventListener("resize", resize);
	}, [ ]);

	function reload() {
		if (!ref.current || !wrapper.current) return;
		let substate = state;
		if (ref.current.children[0].clientHeight + wrapper.current.clientHeight < height) substate = false;
		wrapper.current.style.display = ref.current.children[0].scrollHeight < height ? "none" : "flex";
		ref.current.style.paddingBottom = (substate ? 96 : 0) + "px";
		ref.current.style.maxHeight = (substate ? ref.current.children[0].clientHeight + wrapper.current.clientHeight + 32 : height) + "px";
		wrapper.current.style.boxShadow = substate ? "0px 0px 32px 0px var(--tw-shadow-color)" : "0px 0px 32px 64px var(--tw-shadow-color)";
	}

	const classes = "bg-gray-100 dark:bg-gray-900 shadow-gray-100 dark:shadow-gray-900";

	return (
		<div className={ classNames("transition-[max-height,box-shadow,padding-bottom,margin-bottom] duration-300 relative overflow-y-hidden") } ref={ ref }>
			{ children }
			<div className={ classNames("w-full bottom-0 transition-[box-shadow,transform,height] flex justify-center absolute", classes, state && "h-24") } ref={ wrapper }>
				<Button
					className={ classNames("flex items-center gap-2 !rounded-lg", state ? "translate-y-6" : "-translate-y-6") }
					color="gray"
					onClick={ () => setState(s => !s) }
					size="large">
					{ state ? <MdOutlineExpandLess className="text-2xl" /> : <MdOutlineExpandMore className="text-2xl" /> }
					<p className="text-lg select-none font-medium pl-2">{ button(state) }</p>
				</Button>
			</div>
		</div>
	);
}