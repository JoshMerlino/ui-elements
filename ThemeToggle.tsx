import useEventListener from "@ui-elements/util/useEventListener";
import iconDark from "assets/apple-touch-icon-dark.png";
import iconLight from "assets/apple-touch-icon.png";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { BsBrightnessHigh } from "react-icons/bs";
import { MdOutlineBrightnessAuto, MdOutlineDarkMode } from "react-icons/md";

export type Theme = "DARK" | "LIGHT" | "AUTO";

export default function ThemeToggle({ provider = false, children, bindDocument, ...props }: { provider?: boolean, children?: ReactNode, bindDocument?: boolean } & HTMLAttributes<HTMLDivElement>): JSX.Element | null {

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

		// change meta color
		document.querySelector("meta[name=theme-color]")?.setAttribute("content", isDark ? "#18202f" : "#ffffff");
		
		// change apple icon
		if (bindDocument) document.querySelector("link[rel=apple-touch-icon]")?.setAttribute("href", isDark ? iconDark : iconLight);
		
	}, [ bindDocument, state ]);

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

	if (children) return <div onClick={ nextState }
		{ ...props }>
		{ state === "AUTO" && <MdOutlineBrightnessAuto className="w-6 h-6" /> }
		{ state === "LIGHT" && <BsBrightnessHigh className="w-6 h-6" /> }
		{ state === "DARK" && <MdOutlineDarkMode className="w-6 h-6" /> }
		{children}
	</div>;

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
