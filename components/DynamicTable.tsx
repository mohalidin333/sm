import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import DynamicDropDownMenu from "./DynamicDropDownMenu";

export type DynamicTableProps<T> = {
  tableHead: string[];
  tableRow: T[];
  actions: { action: (row: T) => void; text: string }[];
};

export default function DynamicTable<T extends object>({
  tableHead,
  tableRow,
  actions,
}: DynamicTableProps<T>) {
  return (
    <Table>
      <TableHeader className="bg-gray-100">
        <TableRow>
          {tableHead.map((head, index) => (
            <TableHead
              key={index}
              className={`p-3 ${head === "Actions" && "text-right"}`}
            >
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableRow.length > 0 ? (
          tableRow.map((row, index) => (
            <TableRow key={index}>
              {/* data */}
              {Object.values(row).map((cell, index) =>
                typeof cell !== "object" ? (
                  <TableCell
                    data-label={tableHead.filter(
                      (head, headIndex) => index === headIndex && head
                    )}
                    key={index}
                    className="p-3"
                  >
                    {cell}
                  </TableCell>
                ) : (
                  <TableCell key={index} className="p-3">
                    {cell.element}
                  </TableCell>
                )
              )}

              {/* actions */}
              {actions && actions.length > 0 && (
                <TableCell className="p-3 flex flex justify-end gap-2">
                  <DynamicDropDownMenu
                    trigger={<EllipsisVertical className="h-4 w-4" />}
                    label="Actions"
                    items={actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => action.action(row)}
                        className="w-full text-start"
                      >
                        {action.text}
                      </button>
                    ))}
                  />
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={tableHead.length}
              className="text-center text-muted-foreground"
            >
              No data found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
