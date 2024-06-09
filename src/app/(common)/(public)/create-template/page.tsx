import { FancyTextEditor } from "@/components/client/fancy-text-editor";
import { getCurrentUserSession } from "@/server/actions/auth.action";

export default async function Page() {
  const { user } = await getCurrentUserSession();

  return (
    <section className="w-full h-full flex flex-1 items-center justify-center">
      <FancyTextEditor mode="create" user={user} />
    </section>
  );
}
