import { cache } from "react";
import { cookies } from "next/headers";
import axios from "axios";
<<<<<<< HEAD
import api from "./api";

export interface Identity {
  uid: string | null;
  roles: ReadonlyArray<string>;
  status: string | null;
=======

import { Role, Uid } from "@/lib/userRecord";
import api from "./api";

export interface Identity {
	uid: Uid | null;
	roles: ReadonlyArray<Role>;
	status: string | null;
>>>>>>> ca08bc10444620eb339c4a14f5033c452e89e2de
}

/**
 * Server-only util. Reads auth cookies, calls /user/me, and returns identity.
 * - `cookies()` marks this as dynamic (no static caching).
 * - `cache()` memoizes per-request so multiple calls don't duplicate the API hit.
 */
async function _getUserIdentity(): Promise<Identity> {
<<<<<<< HEAD
  // Tell Next this depends on request cookies → dynamic render
  void cookies();

  try {
    const resp = await api.get<Identity>("/user/me");
    return resp.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("[getUserIdentity]", err.message);
    } else {
      console.error(err);
    }
    return { uid: null, roles: [], status: null };
  }
}

=======
	// Tell Next this depends on request cookies → dynamic render
	// The cookies will actually be added by a request interceptor on the Axios instance
	void cookies();

	try {
		const resp = await api.get<Identity>("/user/me");
		return resp.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.error("[getUserIdentity]", err.message);
		} else {
			console.error(err);
		}
		return { uid: null, roles: [], status: null };
	}
}

// Use request memoization so that the API request is made only once when React renders the tree
// Axios uses XHR by default internally unlike `fetch` which would be automatically cached
>>>>>>> ca08bc10444620eb339c4a14f5033c452e89e2de
const getUserIdentity = cache(_getUserIdentity);
export default getUserIdentity;
