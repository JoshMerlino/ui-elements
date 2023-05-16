import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, useEffect, useState } from "react";

export default function Modal({ children, open: openProp = false, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement> & { open?: boolean; }) {

	const [ open, setOpen ] = useState(false);
	useEffect(() => setOpen(openProp), [ openProp ]);

	return (
		<div className={ classNames("bg-black/25 fixed inset-0 flex isolate items-center transition-opacity z-[500]", !open && "opacity-0 pointer-events-none") }>
			<dialog className={ classNames("m-auto flex transition-transform bg-transparent text-inherit rounded-lg items-center justify-center", open ? "scale-100" : "scale-75", className) } open={ open }>
				{children}
			</dialog>
		</div>
	);
}
