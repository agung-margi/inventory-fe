import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { EyeIcon } from "../../../icons";

interface StockItem {
  id: number;
  code: string; // kode WH
  warehouseName: string;
  items: {
    name: string;
    stock: number;
  }[];
}

const tableData: StockItem[] = [
  {
    id: 1,
    code: "WH001",
    warehouseName: "WH SUKARESMI",
    items: [
      { name: "Semen Portland", stock: 120 },
      { name: "Besi Beton", stock: 80 },
      { name: "Batu Bata", stock: 5000 },
    ],
  },
  {
    id: 2,
    code: "WH002",
    warehouseName: "WH CIKARANG",
    items: [
      { name: "Pipa PVC", stock: 300 },
      { name: "Keramik Lantai", stock: 200 },
    ],
  },
  {
    id: 3,
    code: "WH003",
    warehouseName: "WH JAKARTA",
    items: [
      { name: "Cat Tembok", stock: 150 },
      { name: "Kayu Lapis", stock: 90 },
      { name: "Triplek", stock: 70 },
    ],
  },
];

export default function DisplayStockComponents() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                Kode WH
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                Nama WH
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                List Item
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                Stock
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedData.map((wh) => (
              <TableRow key={wh.id}>
                {/* Kode WH */}
                <TableCell className="px-5 py-4 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {wh.code}
                </TableCell>

                {/* Nama WH */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {wh.warehouseName}
                </TableCell>

                {/* List Item */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <ul className="list-disc pl-4">
                    {wh.items.map((item, i) => (
                      <li key={i}>{item.name}</li>
                    ))}
                  </ul>
                </TableCell>

                {/* Stock */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <ul className="list-none">
                    {wh.items.map((item, i) => (
                      <li key={i}>{item.stock}</li>
                    ))}
                  </ul>
                </TableCell>

                {/* Action */}
                <TableCell className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="success"
                    startIcon={<EyeIcon className="size-4" />}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
