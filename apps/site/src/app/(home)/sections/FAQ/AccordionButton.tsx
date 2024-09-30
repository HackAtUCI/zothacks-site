import { useAccordionButton } from "react-bootstrap";

interface AccordionButtonProps {
	children: React.ReactNode;
	eventKey: string;
}

const AccordionButton: React.FC<AccordionButtonProps> = ({
	children,
	eventKey,
}) => {
	const decoratedOnClick = useAccordionButton(eventKey, () =>
		console.log("totally custom!"),
	);

	return (
		<button
			type="button"
			style={{ backgroundColor: "pink" }}
			onClick={decoratedOnClick}
		>
			{children}
		</button>
	);
};

export default AccordionButton;
