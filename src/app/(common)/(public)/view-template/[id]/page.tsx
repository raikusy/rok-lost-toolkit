import { FancyTextEditor } from "@/components/client/fancy-text-editor";
import { getCurrentUserSession } from "@/server/actions/auth.action";
import { getFancyTextById } from "@/server/actions/fancy-text.action";

export default async function Page({ params }: { params: { id: string } }) {
  const template = await getFancyTextById(params.id);
  const { user } = await getCurrentUserSession();

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-500 dark:text-gray-400">
          Mail not found
        </h1>
      </div>
    );
  }
  return (
    <section className="w-full h-full flex flex-1 items-center justify-center">
      <FancyTextEditor mode="view" fancyText={template} user={user} />
    </section>
  );
}
