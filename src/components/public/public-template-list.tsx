import { getPublicFancyTexts } from "@/server/actions/fancy-text.action";
import Pages from "../client/pages";
import SearchBox from "../client/search";
import { TemplateCard } from "../template-card";

export async function PublicTemplateList({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const templates = await getPublicFancyTexts({ page, search });
  return (
    <section className="w-full py-12" id="#public">
      <div className="container space-y-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-2xl dark:bg-gray-800 mb-8">
              Public Mail Templates
            </div>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore Hundreds of Public Mail Templates created by other players
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <SearchBox />
        </div>
        {templates?.data?.length ? (
          <>
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
              {templates?.data?.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
            <Pages total={templates?.total} />
          </>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No public mail templates found
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
