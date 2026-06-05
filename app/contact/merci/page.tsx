import { redirect } from "next/navigation";

// Consolidated: all confirmation traffic now goes to the single /merci page,
// which is the conversion trigger managed in GTM. This route is kept as a
// permanent redirect so old links/bookmarks keep working.
export default function ContactMerciRedirect() {
  redirect("/merci");
}
