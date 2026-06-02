import { redirect } from "next/navigation";

export default function AuthCallback() {
	redirect("/");
}
