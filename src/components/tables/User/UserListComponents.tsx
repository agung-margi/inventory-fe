import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button";
import { PencilIcon } from "../../../icons";
import { getAllUser } from "../../../services/auth";

interface User {
  id: string;
  // image: string;
  nama: string;
  nama_warehouse: string;
  role: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
// Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllUser();
        console.log(response.data);
        setUsers(response.data.data);
      } catch (err) {
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  
  if (!users.length) return <p>Data pengguna tidak tersedia</p>;
  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

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
                Nama
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium"
              >
                Posisi
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400 font-medium"
              >
                Email
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 text-start">{user.nama}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.nama_warehouse}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.role}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.email}</TableCell>
                <TableCell className="px-4 py-3 text-start">
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
