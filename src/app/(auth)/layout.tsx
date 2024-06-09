// import Image from "next/image";
import { PAGES } from "@/config/pages";
import { getCurrentUserSession } from "@/server/actions/auth.action";
import Image from "next/image";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const { session } = await getCurrentUserSession();
  if (session) return redirect(PAGES.PROFILE);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">{children}</div>
      </div>
      <div className="hidden bg-muted lg:block overflow-hidden">
        <Image
          src="/auth_bg.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale duration-1000"
        />
      </div>
    </div>
  );
}
