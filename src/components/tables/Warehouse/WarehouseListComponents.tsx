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
import { useNavigate } from "react-router-dom";
import { getAllWarehouse } from "../../../services/warehouse";

interface Warehouse {
  id: string;
  kode_wh: string; // Kode WH
  nama_wh: string; // Nama WH
  alamat: string; // Alamat
}

export default function WarehouseListComponents() {
  const navigate = useNavigate();
  const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // get all warehouse
  const getAllData = async (page: number, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllWarehouse(page, limit);
      console.log(response);
      // backend diharapkan mengembalikan { data: [...], meta: { totalPages: X } }
      setWarehouseList(response.data || []);
      setTotalPages(response.meta.totalPage || 1);
    } catch (err) {
      setError("Gagal mengambil data warehouse");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData(currentPage, 10);
  }, [currentPage]);
  const handleView = (id: string) => {
    navigate(`/warehouse/view/${id}`);

    console.log(`Navigating to view warehouse with ID: ${id}`);
    // Pastikan route ini ada di App.tsx / routes config
  };
  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;
  if (!warehouseList.length) return <p>Data warehouse kosong</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium"
              >
                Kode WH
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium"
              >
                Nama WH
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium"
              >
                Alamat
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {warehouseList.map((wh) => (
              <TableRow key={wh.id}>
                {/* Kode WH */}
                <TableCell className="px-5 py-4 text-start font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {wh.kode_wh}
                </TableCell>

                {/* Nama WH */}
                <TableCell className="px-4 py-3 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                  {wh.nama_wh}
                </TableCell>

                {/* Alamat */}
                <TableCell className="px-4 py-3 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                  {wh.alamat}
                </TableCell>

                {/* Action */}
                <TableCell>
                  <Button
                    size="sm"
                    variant="success"
                    startIcon={<PencilIcon className="size-4" />}
                    onClick={() => handleView(wh.id)}
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
