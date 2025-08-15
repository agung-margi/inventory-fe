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
import { getPengeluaran } from "../../../services/pengeluaran";
import { getMe } from "../../../services/auth";

interface Pengeluaran {
  id: string;
  warehouseId: string;
  penerimaId: string;
  status: string;
  project: string;
  catatan: string;
  tanggal: string;
  createdAt: string;
}

export default function PengeluaranListComponents() {
  const navigate = useNavigate();
  const [pengeluaranList, setPengeluaranList] = useState<Pengeluaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kodeWh, setKodeWh] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getPengeluaranData = async (
    page: number,
    limit: number,
    kodeWh: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPengeluaran(page, limit, kodeWh);
      console.log(response);
      const list = response.data.data.data || [];
      const meta = response.data.data.meta || {};

      setPengeluaranList(list);
      setTotalPages(meta.totalPage || 1);
    } catch (err) {
      setError("Gagal mengambil data pengeluaran");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserMe = async () => {
    try {
      const res = await getMe(); // endpoint GET /me
      const userData = res.data;
      console.log("User Data:", userData);
      if (userData?.kode_wh) {
        setKodeWh(userData.kode_wh);
      }
    } catch {
      setError("Gagal mengambil data user");
    }
  };

  // Ambil data user dulu
  useEffect(() => {
    fetchUserMe();
  }, []);

  // Setelah kodeWh ada, fetch pengeluaran
  useEffect(() => {
    if (kodeWh) {
      getPengeluaranData(currentPage, 10, kodeWh);
    }
  }, [currentPage, kodeWh]);

  const handleView = (id: string) => {
    navigate(`/pengeluaran/view/${id}`);
  };

  // Kondisi loading & error
  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;
  if (!pengeluaranList.length) return <p>Data pengeluaran kosong</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium">
                ID
              </TableCell>
              <TableCell isHeader className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium">
                Tanggal
              </TableCell>
              <TableCell isHeader className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium">
                Warehouse
              </TableCell>
              <TableCell isHeader className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium">
                Project
              </TableCell>
              <TableCell isHeader className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium">
                Status
              </TableCell>
              <TableCell isHeader className="text-center px-5 py-3 text-theme-sm text-gray-500 dark:text-gray-400 font-medium">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {pengeluaranList.map((pengeluaran) => (
              <TableRow key={pengeluaran.id}>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {pengeluaran.id}
                </TableCell>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {new Date(pengeluaran.tanggal).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {pengeluaran.warehouseId}
                </TableCell>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {pengeluaran.project}
                </TableCell>
                <TableCell className="px-5 py-4 text-center dark:text-white">
                  {pengeluaran.status}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="success"
                    startIcon={<PencilIcon className="size-4" />}
                    onClick={() => handleView(pengeluaran.id)}
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
