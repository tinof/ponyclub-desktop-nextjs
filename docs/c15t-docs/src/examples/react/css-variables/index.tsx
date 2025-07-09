import { Preview } from "~/components/ui/preview";
import { pages } from "./example-page.tsx";

export default function CSSCookieBannerExample() {
  return <Preview name="css" code={pages} />;
}
