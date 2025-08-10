// // src/components/auth/ProtectedRoute.tsx
// import { Navigate, Outlet } from "react-route";/ hook yang ambil data user dari context/auth

// interface ProtectedRouteProps {
//   allowedRoles: string[];
// }

// export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
//   const { user } = useAuth();

//   if (!user) {
//     // kalau belum login → lempar ke /signin
//     return <Navigate to="/signin" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     // kalau login tapi role tidak diizinkan → lempar ke 404
//     return <Navigate to="/404" replace />;
//   }

//   return <Outlet />;
// }
