import classNames from "classnames";
import { HTMLAttributes, useRef } from "react";
import { IconType } from "react-icons/lib";
import useCenteredRipple from "./util/useCenteredRipple";

interface IconProps {
	icon: IconType;
	waves: boolean;
}

export default function Icon({ icon: Icon, waves = true, className, children, ...props }: Partial<IconProps> & HTMLAttributes<HTMLDivElement>) {
	const ref = useRef<HTMLDivElement>(null);
	useCenteredRipple(ref, waves);
	return (
		<div className={ classNames("shrink-0 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-500/10 hover:active:bg-gray-500/20 transition-colors group relative text-gray-800 dark:text-gray-200 ripple-center", className) }
			ref={ ref }
			{ ...props }>
			{Icon && <Icon className="text-2xl" />}
			{children}
		</div>
	);
}
