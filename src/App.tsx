// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout"; // ini import context-mu

// import semua pages
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/User/UserPage";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import Home from "./pages/Dashboard/Home";
import WarehousePage from "./pages/Warehouse/WarehousePage";
import ItemPage from "./pages/Item/ItemPage";
import CreateWarehousePage from "./pages/Warehouse/CreateWarehousePage";
import CreateItemPage from "./pages/Item/CreateItemPage";
import UserPage from "./pages/User/UserPage";
import CreateUserPage from "./pages/User/CreateUserPage";
import CreatePengeluaranPage from "./pages/Transaksi/pengeluaran";
import CreatePengeluaranAGPage from "./pages/Transaksi/pengeluaranAG";
import PermintaanPage from "./pages/Transaksi/permintaan";
import ViewWarehouse from "./components/tables/Warehouse/ViewWarehouse";
import FormPermintaanComponents from "./components/form/create-form/FormPermintaanComponents";
import ApprovePermintaanForm from "./components/form/create-form/ViewPermintaanComponents";
import DisplayStokpage from "./pages/Item/DisplayStokPage";
import CreatePenerimaanPage from "./pages/Transaksi/penerimaan";
import ListPengeluaranPage from "./pages/Transaksi/Pengeluaran/listpengeluaran";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
      <AuthProvider>
        <ScrollToTop />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          style={{ zIndex: 999999 }}
        />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* user */}
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/create" element={<CreateUserPage />} />

            {/* warehouse */}
            <Route path="/warehouse" element={<WarehousePage />} />
            <Route path="/warehouse/create" element={<CreateWarehousePage />} />
            <Route path="/warehouse/view/:id" element={<ViewWarehouse />} />

            {/* items */}
            <Route path="/items" element={<ItemPage />} />
            <Route path="/items/create" element={<CreateItemPage />} />
            <Route path="/items/stock" element={<DisplayStokpage />} />

            {/* transaksi */}
            <Route path="/pengeluaran" element={<ListPengeluaranPage />} />
            <Route path="/pengeluaran/create" element={<CreatePengeluaranPage />} />
            <Route path="/tag" element={<CreatePengeluaranAGPage />} />
            <Route path="/permintaan" element={<PermintaanPage />} />
            <Route path="/penerimaan" element={<CreatePenerimaanPage />} />

            <Route path="/permintaan/create" element={<FormPermintaanComponents />} />
            <Route path="/permintaan/view/:id" element={<ApprovePermintaanForm />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
  );
}
