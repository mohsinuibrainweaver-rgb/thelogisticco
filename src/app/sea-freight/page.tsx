import { ServicePage } from "@/components/sections/ServicePage";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getService("sea-freight");

export const metadata = pageMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: service.href,
  image: service.image,
});

export default function Page() {
  return <ServicePage service={service} />;
}
