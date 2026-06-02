import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import BaseNavBar from "./BaseNavBar";

export default async function NavbarParent() {
	return (
		<BaseNavBar>
			<PrimaryButton type="button" variant="small">
				Log In
			</PrimaryButton>
		</BaseNavBar>
	);
}
