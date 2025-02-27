import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getCurrentUserSession } from "@/server/actions/auth.action";

import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const { user, session } = await getCurrentUserSession();
  return (
    <div className="flex flex-col min-h-dvh">
      <Header session={session} user={user} />
      <main className="container flex flex-col flex-1 h-full">{children}</main>
      <Footer />
    </div>
  );
}
