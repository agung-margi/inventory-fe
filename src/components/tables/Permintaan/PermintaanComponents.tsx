import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { PencilIcon } from "../../../icons";
import { fetchPermintaan } from "../../../services/permintaan";

interface Permintaan {
  id: string;
  tujuanWh: string;
  pemintaId: string;
  status: string;
  project: string;
  catatan: string;
  tanggal: string;
  createdAt: string;
}

export default function PermintaanListComponents() {
  const navigate = useNavigate();
  const [permintaanList, setPermintaanList] = useState<Permintaan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPermintaanData = async (page: number, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchPermintaan(page, limit);
      console.log(response);
      // backend diharapkan mengembalikan { data: [...], meta: { totalPages: X } }
      setPermintaanList(response.data || []);
      setTotalPages(response.meta.totalPage || 1);
    } catch (err) {
      setError("Gagal mengambil data permintaan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermintaanData(currentPage, 10);
  }, [currentPage]);

  const handleView = (id: string) => {
    navigate(`/permintaan/view/${id}`);

    console.log(`Navigating to view permintaan with ID: ${id}`);
    // Pastikan route ini ada di App.tsx / routes config
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;
  if (!permintaanList.length) return <p>Data permintaan kosong</p>;
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium"
              >
                Tanggal
              </TableCell>
              <TableCell
                isHeader
                className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium"
              >
                Warehouse
              </TableCell>
              <TableCell
                isHeader
                className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium"
              >
                Project
              </TableCell>
              <TableCell
                isHeader
                className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {permintaanList.map((permintaan) => (
              <TableRow key={permintaan.id}>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {permintaan.id}
                </TableCell>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {new Date(permintaan.tanggal).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {permintaan.tujuanWh}
                </TableCell>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {permintaan.project}
                </TableCell>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {permintaan.status}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="success"
                    startIcon={<PencilIcon className="size-4" />}
                    onClick={() => handleView(permintaan.id)}
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
