import { HomeLayout } from "~/components/layouts/home";
import { homePageOptions } from "./layout.config.tsx";
import NotFoundClient from "./not-found.client.tsx";
export default function NotFound() {
  return (
    <HomeLayout {...homePageOptions}>
      <NotFoundClient />
    </HomeLayout>
  );
}
