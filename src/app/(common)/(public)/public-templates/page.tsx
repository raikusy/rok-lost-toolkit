import { PublicTemplateList } from "@/components/public/public-template-list";
import { getPublicFancyTexts } from "@/server/actions/fancy-text.action";
import { Loader2 } from "lucide-react";
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
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-dvh">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      }
    >
      <PublicTemplateList page={Number(page)} search={search} />
    </Suspense>
  );
}
