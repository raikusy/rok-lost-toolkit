import Pages from "@/components/client/pages";
import SearchBox from "@/components/client/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nameToAvatar } from "@/lib/utils";
import { getAllUsers } from "@/server/actions/user.action";
import dayjs from "dayjs";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; limit?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || undefined;
  const limit = Number(searchParams.limit) || 10;

  const result = await getAllUsers({ page, search, limit });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Users {result?.total ? `(${result?.total})` : ""}
        </h2>
        <div className="flex items-center space-x-4">
          <SearchBox />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email Verified</TableHead>
              <TableHead>Joined At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              result.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage alt={user.name} src={user.image ?? ""} />
                        <AvatarFallback>
                          {nameToAvatar(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {user.role || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.emailVerified ? (
                      <span className="rounded bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                        Verified
                      </span>
                    ) : (
                      <span className="rounded bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500">
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs">
                      {dayjs(user.createdAt).format("DD MMM YYYY hh:mm A")}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pages total={result.total} />
    </div>
  );
}
