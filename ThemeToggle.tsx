import useEventListener from "@ui-elements/util/useEventListener";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { BsBrightnessHigh } from "react-icons/bs";
import { MdOutlineBrightnessAuto, MdOutlineDarkMode } from "react-icons/md";
import colors from "tailwindcss/colors";

export type Theme = "DARK" | "LIGHT" | "AUTO";
export interface Props {
	provider: boolean;
	children: ReactNode;
	bindDocument: boolean;
	darkIcon: string;
	darkColor: string;
	lightColor: string;
	lightIcon: string;
}

export default function ThemeToggle({
	provider = false,
	children,
	bindDocument,
	darkIcon = "@assets/apple-touch-icon-dark.png",
	darkColor = colors.gray[800],
	lightIcon = "@assets/apple-touch-icon.png",
	lightColor = colors.white,
	...props
}: Partial<Props> & HTMLAttributes<HTMLDivElement>): JSX.Element | null {

	// Determine initial state
	const [ state, setState ] = useState<Theme>("theme" in localStorage ? localStorage.theme === "dark" ? "DARK" : "LIGHT" : "AUTO");

	// Manage theme state
	useEffect(function() {

		// Determine mode
		const isDark = state === "DARK" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches;

		// change body class
		document.documentElement.classList.toggle("dark", isDark);

		// If not binding to document, return
		if (bindDocument) async() => {

			// change apple icon
			/* @vite-ignore */
			document.querySelector("link[rel=apple-touch-icon]")?.setAttribute("href", await import(isDark ? darkIcon : lightIcon));

			// change meta color
			document.querySelector("meta[name=theme-color]")?.setAttribute("content", isDark ? darkColor : lightColor);
			
		};
		
	}, [ bindDocument, darkColor, darkIcon, lightColor, lightIcon, state ]);

	// Attach keybinds
	useEventListener("keydown", function(event: KeyboardEvent) {
		if (event.key !== "F10") return;
		event.preventDefault();
		nextState();
	});

	function nextState() {
		if (state === "DARK") {
			localStorage.removeItem("theme");
			setState("AUTO");
		}
		if (state === "AUTO") {
			localStorage.theme = "light";
			setState("LIGHT");
		}
		if (state === "LIGHT") {
			localStorage.theme = "dark";
			setState("DARK");
		}
	}

	// If provider, don't render anything
	if (provider) return null;

	if (children) return (
		<div onClick={ nextState }
			{ ...props }>
			{ state === "AUTO" && <MdOutlineBrightnessAuto className="w-6 h-6" /> }
			{ state === "LIGHT" && <BsBrightnessHigh className="w-6 h-6" /> }
			{ state === "DARK" && <MdOutlineDarkMode className="w-6 h-6" /> }
			{children}
		</div>
	);

	return (
		<div className="btn"
			onClick={ nextState }>
			{ state === "AUTO" && <MdOutlineBrightnessAuto className="w-6 h-6" /> }
			{ state === "LIGHT" && <BsBrightnessHigh className="w-6 h-6" /> }
			{state === "DARK" && <MdOutlineDarkMode className="w-6 h-6" />}
			<span>Change theme</span>
		</div>
	);
}
