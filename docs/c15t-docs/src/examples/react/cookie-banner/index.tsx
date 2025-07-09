import { Preview } from "~/components/ui/preview";
import { pages } from "./example-page.tsx";

export default function UseConsentManagerExample() {
  return <Preview name="sandbox" code={pages} />;
}
