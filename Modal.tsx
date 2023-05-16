import classNames from "classnames";
import { PropsWithChildren, useEffect, useState } from "react";

export default function Modal({ children, open: openProp = false }: PropsWithChildren & { open?: boolean; }) {

	const [ open, setOpen ] = useState(false);
	useEffect(() => setOpen(openProp), [ openProp ]);

	return (
		<div className={ classNames("bg-black/25 fixed inset-0 flex isolate items-center transition-opacity z-[500]", !open && "opacity-0 pointer-events-none") }>
			<dialog className={ classNames("m-auto flex transition-transform bg-transparent text-inherit rounded-lg", open ? "scale-100" : "scale-75") } open={ open }>
				{children}
			</dialog>
		</div>
	);
}
