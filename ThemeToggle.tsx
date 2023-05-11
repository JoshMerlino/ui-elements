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
	darkAppleIcon: string;
	darkColor: string;
	lightColor: string;
	lightFavicon: string;
	darkFavicon: string;
	lightAppleIcon: string;
}

export default function ThemeToggle({
	provider = false,
	children,
	bindDocument,
	lightAppleIcon,
	lightFavicon,
	darkFavicon,
	darkAppleIcon,
	darkColor = colors.gray[800],
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
		if (!bindDocument) return;

		// change apple icon
		if (darkAppleIcon && lightAppleIcon) document.querySelector("link[rel=apple-touch-icon]")?.setAttribute("href", isDark ? darkAppleIcon : lightAppleIcon);

		// Change favicon
		if (darkFavicon && lightFavicon) document.querySelector("link[rel=icon]")?.setAttribute("href", isDark ? darkFavicon : lightFavicon);

		// change meta color
		if (darkColor && lightColor) document.querySelector("meta[name=theme-color]")?.setAttribute("content", isDark ? darkColor : lightColor);
		
	}, [ bindDocument, darkColor, darkAppleIcon, lightColor, lightAppleIcon, state, darkFavicon, lightFavicon ]);

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
