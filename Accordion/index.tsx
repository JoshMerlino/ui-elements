import classNames from "classnames";
import { HTMLAttributes } from "react";

export default function Accordion({ children, className }: HTMLAttributes<HTMLUListElement>): JSX.Element {

	return (
		<ul className={ classNames("group-Accordion -m-4 p-4", className) }>{children}</ul>
	);
}