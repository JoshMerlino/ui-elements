import classNames from "classnames";
import { HTMLAttributes } from "react";

export default function Drawer({ children, className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element {
	return (
		<aside className={ classNames("bg-white dark:bg-gray-800 ease-in-out w-[300px] absolute top-0 h-full z-[10] shadow-md transition-[opacity,left] xl:left-0 flex flex-col p-2 py-4 rounded-r-xl", className) }
			{ ...props }>{children}</aside>
	);
}

export const DrawerDivider = ({ className, ...props }: HTMLAttributes<HTMLHRElement>) => <hr className={ classNames("dark:border-gray-700/50 mx-4 my-2", className) }
	{ ...props } />;
	
export const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={ classNames("text-gray-600 dark:text-gray-400 mr-auto text-sm font-medium p-4 py-2", className) }
	{ ...props }>{props.children}</div>;