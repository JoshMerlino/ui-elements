import { useEffect } from "react";

export default function useEventListener<K extends keyof DocumentEventMap>(event: K, handler: (ev: DocumentEventMap[K]) => unknown, element: HTMLElement | Document = document) {
	useEffect(() => {
		if (!element) return;
		element.addEventListener(event, handler as unknown as EventListener);
		return () => element.removeEventListener(event, handler as unknown as EventListener);
	}, [ element, event, handler ]);
}