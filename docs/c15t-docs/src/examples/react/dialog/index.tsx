import { Preview } from "~/components/ui/preview";
import { pages } from "./example-page.tsx";

export default function DialogExample() {
  return <Preview name="dialog" code={pages} height={500} />;
}
