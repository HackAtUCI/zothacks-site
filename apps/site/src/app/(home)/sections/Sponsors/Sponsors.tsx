import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity/client";
import SponsorsClient from "./SponsorsClient";
import { getSponsors } from "./getSponsors";

const builder = imageUrlBuilder(client);

const Sponsors = async () => {
	const { sponsors } = await getSponsors();

	return (
		<SponsorsClient
			sponsors={sponsors.map(({ _key, name, url, logo }) => ({
				_key,
				name,
				url,
				logoUrl: builder.image(logo).width(600).format("webp").url(),
			}))}
		/>
	);
};

export default Sponsors;
