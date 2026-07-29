import axios from "axios";

import { Decision, Role, Status, Uid } from "@/lib/userRecord";
import useSWR from "swr";

export interface Identity {
	uid: Uid | null;
	roles: ReadonlyArray<Role>;
	status: Status | null;
	decision: Decision | null;
}

const fetcher = async (url: string) => {
	const res = await axios.get<Identity>(url);
	return res.data;
};

function useUserIdentity() {
	const { data } = useSWR<Identity>("/api/user/me", fetcher);

	return data;
}

export default useUserIdentity;
