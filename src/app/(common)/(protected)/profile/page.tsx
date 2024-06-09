import { getCurrentUserSession } from "@/server/actions/auth.action";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import LogoutButton from "@/components/client/profile/logout-button";
import { getMyFancyTexts } from "@/server/actions/fancy-text.action";
import Link from "next/link";
import { format } from "date-fns";
import { PAGES } from "@/config/pages";
import { nameToAvatar } from "@/lib/utils";
import Pages from "@/components/client/pages";
import SearchBox from "@/components/client/search";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
  };
}) {
  const { user } = await getCurrentUserSession();
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search;
  const templates = await getMyFancyTexts({ page, search });
  if (!user) return null;
  return (
    <div>
      <div className="flex flex-col items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="User Avatar" src={user.image} />
          <AvatarFallback>{nameToAvatar(user?.name ?? "")}</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
        <LogoutButton />
      </div>

      <div className="flex flex-col gap-4 my-8">
        <h3 className="text-center text-xl font-semibold">My Mail Templates</h3>
        <div className="flex justify-center">
          <SearchBox />
        </div>
        {templates?.total ? (
          <>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {templates?.data?.map((template) => (
                <Link href={PAGES.VIEW_TEMPLATE(template.id)} key={template.id}>
                  <div className="p-4 bg-[#F1E3C3] rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="text-lg font-semibold">{template.name}</h2>
                    <p>{format(template.createdAt, "dd MMM, yyyy")}</p>
                    {template.isPublic ? (
                      <span className="bg-orange-500 text-white px-2 rounded">
                        Public
                      </span>
                    ) : (
                      <span className="bg-purple-500 text-white px-2 rounded">
                        Private
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <Pages total={templates?.total} />
          </>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No mail templates found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
