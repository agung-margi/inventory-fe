import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { PencilIcon } from "../../../icons";

import { getAllItem } from "../../../services/item"; // import service yang kamu buat

interface Item {
  id: string;
  designator: string;
  nama_item: string;
  kategori: string;
  satuan: string;
  harga: number;
  createdAt: string;
  // bisa tambah properti lain jika perlu
}

export default function ItemListComponents() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllItem();
        setItems(response.data);
        setTotalPages(response.meta.totalPage || 1); // data dari API
      } catch (err) {
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);


  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;
  if (!items.length) return <p>Data item kosong</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                Designator
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                Nama Item
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                Kategori
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                Satuan
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                Harga
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                Created At
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-5 py-4 text-start">{item.designator}</TableCell>
                <TableCell className="px-5 py-4 text-start">{item.nama_item}</TableCell>
                <TableCell className="px-5 py-4 text-start">{item.kategori}</TableCell>
                <TableCell className="px-5 py-4 text-start">{item.satuan}</TableCell>
                <TableCell className="px-5 py-4 text-start">{item.harga}</TableCell>
                <TableCell className="px-5 py-4 text-start">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="px-5 py-4 text-start">
                  <Button
                    size="sm"
                    variant="success"
                    startIcon={<PencilIcon className="size-4" />}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between p-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2 flex items-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? "success" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
