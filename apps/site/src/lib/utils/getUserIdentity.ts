import { cache } from "react";
import { cookies } from "next/headers";
import axios from "axios";
import api from "./api";

export interface Identity {
  uid: string | null;
  roles: ReadonlyArray<string>;
  status: string | null;
}

/**
 * Server-only util. Reads auth cookies, calls /user/me, and returns identity.
 * - `cookies()` marks this as dynamic (no static caching).
 * - `cache()` memoizes per-request so multiple calls don't duplicate the API hit.
 */
async function _getUserIdentity(): Promise<Identity> {
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

const getUserIdentity = cache(_getUserIdentity);
export default getUserIdentity;
