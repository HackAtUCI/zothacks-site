import axios from "axios";
import useSWR from "swr";

export interface ArrivalTimeResponse {
	arrival_time: string | null;
	late_arrival_reason: string | null;
	late_arrival_edit_request: string | null;
	late_arrival_edit_reason: string | null;
}

const fetcher = async (url: string) => {
	const res = await axios.get<ArrivalTimeResponse>(url);
	return res.data;
};

function useArrivalTime() {
	const { data, error, isLoading, mutate } = useSWR<ArrivalTimeResponse>(
		"/api/user/rsvp/late-arrival",
		fetcher,
	);

	return { arrivalData: data, error, isLoading, mutate };
}

export default useArrivalTime;
