"use client";

import { getAllFancyTexts } from "@/server/actions/fancy-text.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import { PAGES } from "@/config/pages";
import SearchBox from "@/components/client/search";
import Pages from "@/components/client/pages";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink } from "lucide-react";
import { PreviewModal } from "@/components/client/preview-modal";
import { useEffect, useState } from "react";
import { FancyText } from "@/db/schema";
import { useSearchParams } from "next/navigation";

interface TemplateData {
  data: FancyText[];
  total: number;
  page: number;
  limit: number;
}

export default function FancyTextsPage() {
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState<FancyText | null>(
    null
  );
  const [templates, setTemplates] = useState<TemplateData | null>(null);
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFancyTexts({ page, search });
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchData();
  }, [page, search]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Fancy Texts</h2>
          <div className="flex items-center space-x-4">
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
                    {format(new Date(template.createdAt), "dd MMM yyyy, HH:mm")}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
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

      {selectedTemplate && (
        <PreviewModal
          isOpen={true}
          onClose={() => setSelectedTemplate(null)}
          content={selectedTemplate.content}
          name={selectedTemplate.name}
        />
      )}
    </>
  );
}
