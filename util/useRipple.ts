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
		element.classList.add("relative", "overflow-hidden");

		let to: number | undefined;
		
		// On element mousedown, start ripple
		const onMouseDown = function(event: MouseEvent) {
			
			// If ripple is disabled, return
			if (!state) return;
			
			// Hide other ripples
			const ripples = element.querySelectorAll(".ripple");
			for (const ripple of ripples) ripple.classList.remove("!opacity-20", "animate-pulse");

			// Add the ripple element
			const ripple = document.createElement("div");
			ripple.classList.add(...classNames("ripple rounded-full aspect-square absolute scale-0 transition-[transform,opacity] duration-500 ease-in-out pointer-events-none opacity-0", className || "bg-black dark:bg-white").split(" "));
			element.appendChild(ripple);

			// Get the element size and mouse position
			const { width, height } = element.getBoundingClientRect();
			const { offsetX, offsetY } = event;

			// Get the distance from the center of the element
			const x = offsetX - width / 2;
			const y = offsetY - height / 2;
			const distance = Math.sqrt(x * x + y * y);
			const size = Math.max(width, height) + distance;

			// Set the ripple size
			ripple.style.width = ripple.style.height = size + "px";
			
			// Set the ripple position
			ripple.style.left = offsetX - size / 2 + "px";
			ripple.style.top = offsetY - size / 2 + "px";

			// Start the ripple
			ripple.classList.add("scale-[.6]", "!opacity-20");

			to = setTimeout(function() {
				ripple.classList.add("animate-pulse");
				ripple.classList.remove("scale-[.6]");
			}, 450);
			
		};

		// On element mouseup, remove ripple
		const onMouseUp = function() {
			
			clearTimeout(to);
			
			// If ripple is disabled, return
			if (!state) return;

			// Get the ripple element
			const ripples = element.querySelectorAll(".ripple");

			// If ripple doesn't exist, return
			if (!ripples) return;

			for (const ripple of ripples) {

				// Stop animating
				ripple.classList.remove("animate-pulse", "scale-[.6]");
				ripple.classList.add("scale-50");
				
				// Start next animation
				setTimeout(function() {
					ripple.classList.add("scale-150");
					ripple.classList.remove("scale-50");
					setTimeout(function() {
						ripple.classList.remove("!opacity-20");
						setTimeout(function() {
							ripple.remove();
						}, 500);
					}, 500);
				}, 5);
			}

		};

		// Bind listeners
		element.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mouseup", onMouseUp);
		return function() {
			element.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mouseup", onMouseUp);
		};
		
	}, [ className, ref, state ]);
}