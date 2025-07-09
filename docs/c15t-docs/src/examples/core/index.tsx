import { Preview } from "~/components/ui/preview";
import { pages } from "./example.ts";

export default function CoreCookieBannerExample() {
  return (
    <Preview
      name="core-cookie-banner"
      code={pages}
      defaultFile="index.html"
      template="static"
    />
  );
}
