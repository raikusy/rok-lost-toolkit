import { PublicTemplateList } from "@/components/public/public-template-list";
import { getPublicFancyTexts } from "@/server/actions/fancy-text.action";
import { Suspense } from "react";

export default async function PublicTemplates({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}) {
  const { page = 1, search = "" } = await searchParams;
  getPublicFancyTexts({ page: Number(page), search });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublicTemplateList page={Number(page)} search={search} />
    </Suspense>
  );
}
