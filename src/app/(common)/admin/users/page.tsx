import { getAllUsers } from "@/server/actions/user.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { nameToAvatar } from "@/lib/utils";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email Verified</TableHead>
              <TableHead>Google ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt={user.name} src={user.image ?? ""} />
                      <AvatarFallback>{nameToAvatar(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {user.role}
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
                  <span className="font-mono text-xs">{user.googleId}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
