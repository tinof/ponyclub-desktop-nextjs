import { Preview } from "~/components/ui/preview";
import { pages } from "./example-page.tsx";

export default function TailwindCookieBannerExample() {
  return <Preview name="tailwind" code={pages} />;
}
