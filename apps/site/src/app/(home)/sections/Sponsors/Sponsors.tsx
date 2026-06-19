import SponsorsClient from "./SponsorsClient";
import { getSponsors } from "./getSponsors";

const Sponsors = async () => {
	// Keeping sanity fetcher but not using it since we don't have
	// sponsors figured out yet
	await getSponsors();

	return <SponsorsClient />;
};

export default Sponsors;
