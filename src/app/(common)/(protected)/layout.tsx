// import Image from "next/image";
import { getCurrentUserSession } from "@/server/actions/auth.action";
import { redirect } from "next/navigation";

import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const { session } = await getCurrentUserSession();
  if (!session) return redirect("/login");
  return <>{children}</>;
}
