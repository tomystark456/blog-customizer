import { useEffect, RefObject } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: RefObject<HTMLElement>;
	arrowRef: RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	onClose,
	rootRef,
	arrowRef,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!rootRef.current?.contains(target) &&
				!arrowRef.current?.contains(target)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose, rootRef, arrowRef]);
};
