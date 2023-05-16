import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, createRef, useEffect, useState } from "react";

export default function Modal({ children, open = false, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement> & { open?: boolean; }) {

	const [ isContentVisible, setContentVisible ] = useState(open);
	
	const ref = createRef<HTMLDialogElement>();
	useEffect(function() {
		if (!ref.current) return;
		if (open) setContentVisible(true);
		if (!open) setTimeout(function() {
			setContentVisible(false);
		}, 250);
	}, [ open, ref ]);

	return (
		<div className={ classNames("bg-black/25 fixed inset-0 flex isolate items-center transition-opacity z-[500]", !open && "opacity-0 pointer-events-none") }>
			<dialog className={ classNames("m-auto flex transition-transform bg-transparent text-inherit rounded-lg items-center justify-center", open ? "scale-100" : "scale-75 pointer-events-none select-none", className) } ref={ ref }>
				{isContentVisible && children}
			</dialog>
		</div>
	);
}
