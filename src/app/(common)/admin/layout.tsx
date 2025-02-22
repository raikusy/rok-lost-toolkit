import { getCurrentUserSession } from "@/server/actions/auth.action";
import { ROLES } from "@/config/roles";
import { redirect } from "next/navigation";
import { PAGES } from "@/config/pages";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const adminLinks = [
  {
    href: "/users",
    label: "Users",
  },
  {
    href: "/fancy-texts",
    label: "Fancy Texts",
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getCurrentUserSession();

  if (!user || user.role !== ROLES.ADMIN) {
    redirect(PAGES.HOME);
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <nav className="flex items-center space-x-4">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={`/admin${link.href}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
