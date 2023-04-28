import classNames from "classnames";
import { RefObject, useEffect } from "react";

export default function useRipple(ref: RefObject<HTMLElement>, state = true, className?: string) {
	useEffect(function() {
		
		// Get the element
		const element = ref.current;
		if (!element) return;

		// remove existing ripple
		element.querySelector(".ripple")?.remove();

		// Add the ripple container class
		element.classList.add("relative");

		// On element mousedown, start ripple
		const onMouseDown = function() {
			
			// If ripple is disabled, return
			if (!state) return;
			
			// Hide other ripples
			const ripples = element.querySelectorAll(".ripple");
			for (const ripple of ripples) ripple.classList.remove("!opacity-20", "animate-pulse");

			// Add the ripple element
			const ripple = document.createElement("div");
			ripple.classList.add(...classNames("ripple rounded-full aspect-square absolute scale-0 transition-[transform,opacity] duration-500 ease-in-out pointer-events-none opacity-0", className || "bg-black dark:bg-white").split(" "));
			element.appendChild(ripple);

			// Get the distance from the center of the element
			const { width, height } = element.getBoundingClientRect();
			const size = Math.max(width, height);

			// Set the ripple size
			ripple.style.width = ripple.style.height = size + "px";

			// Start the ripple
			ripple.classList.add("scale-100", "!opacity-20");
			
		};

		// On element mouseup, remove ripple
		const onMouseUp = function() {
			
			// If ripple is disabled, return
			if (!state) return;

			// Get the ripple element
			const ripples = element.querySelectorAll(".ripple");

			// If ripple doesn't exist, return
			if (!ripples) return;

			for (const ripple of ripples) {

				setTimeout(function() {
					
					ripple.classList.add("scale-125");
					ripple.classList.remove("scale-100");

					setTimeout(function() {
						ripple.classList.remove("!opacity-20");
						setTimeout(function() {
							ripple.remove();
						}, 250);
					}, 250);
					
				}, 5);
			}

		};

		// Bind listeners
		element.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mouseup", onMouseUp);
		element.addEventListener("mouseleave", onMouseUp);
		return function() {
			element.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mouseup", onMouseUp);
			element.removeEventListener("mouseleave", onMouseUp);
		};
		
	}, [ className, ref, state ]);
}