import { ClearFilters } from "@/components/admin/clear-filters";
import { DeletedFilter } from "@/components/admin/deleted-filter";
import { PublicFilter } from "@/components/admin/public-filter";
import Pages from "@/components/client/pages";
import { PreviewModal } from "@/components/client/preview-modal";
import SearchBox from "@/components/client/search";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAGES } from "@/config/pages";
import { getAllFancyTexts } from "@/server/actions/fancy-text.action";
import { format } from "date-fns";
import dayjs from "dayjs";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function FancyTextsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    limit?: string;
    public?: string;
    deleted?: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || undefined;
  const limit = Number(searchParams.limit) || 10;
  const isPublic =
    searchParams.public !== undefined
      ? searchParams.public === "true"
      : undefined;
  const isDeleted =
    searchParams.deleted !== undefined
      ? searchParams.deleted === "true"
      : undefined;
  const templates = await getAllFancyTexts({
    page,
    search,
    limit,
    public: isPublic,
    deleted: isDeleted,
  });

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Templates {templates?.total ? `(${templates?.total})` : ""}
          </h2>
          <div className="flex items-center space-x-4">
            {isPublic !== undefined || isDeleted !== undefined ? (
              <ClearFilters />
            ) : null}
            <PublicFilter />
            <DeletedFilter />
            <SearchBox />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates?.data?.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.user.name}</TableCell>
                  <TableCell>
                    {dayjs(template.createdAt).format("DD MMM YYYY, h:mm A")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        template.isPublic
                          ? "bg-orange-500/10 text-orange-500"
                          : "bg-purple-500/10 text-purple-500"
                      }`}
                    >
                      {template.isPublic ? "Public" : "Private"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <PreviewModal
                        content={template.content}
                        name={template.name}
                      />
                      <Link href={PAGES.VIEW_TEMPLATE(template.id)}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pages total={templates?.total ?? 0} />
      </div>
    </>
  );
}
