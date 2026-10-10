import type { ComponentProps } from "react";

// Normal document links keep every page reachable without client-side routing.
export default function SiteLink(props: ComponentProps<"a">) {
  return <a {...props} />;
}
