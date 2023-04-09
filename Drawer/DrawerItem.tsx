import classNames from "classnames";
import { HTMLAttributes, useRef } from "react";
import { IconType } from "react-icons/lib";
import useRipple from "../util/useRipple";

interface DrawerItemProps {
	active: boolean;
	icon: IconType;
	waves: boolean;
	size: "default" | "dense"
}

export default function DrawerItem({ children, icon: Icon, active, waves = true, size = "default", ...props }: Partial<DrawerItemProps> & HTMLAttributes<HTMLLIElement>) {

	// Initialize the ref
	const ref = useRef<HTMLLIElement>(null);

	// Add ripple
	useRipple(ref, waves, active ? "bg-primary" : "bg-black/50 dark:bg-white/50");

	const base = "flex p-4 items-center rounded-full group transition-colors duration-75";
	const gray = "hover:bg-gray-100 text-gray-700 hover:active:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:active:bg-gray-700/80";
	const primary = "bg-primary/5 hover:bg-primary/10 text-primary hover:active:bg-primary/20";

	return (
		<li className={ classNames(base, active ? primary : gray, size === "dense" ? "h-12 gap-2" : "h-14 gap-4") }
			ref={ ref }
			{ ...props }>
			{Icon && <Icon className="text-2xl pointer-events-none" />}
			<p className="text-sm font-medium grow flex pointer-events-none">
				{children}
			</p>
		</li>
	);
}
