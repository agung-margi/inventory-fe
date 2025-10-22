import { useState } from "react";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import Button from "../../ui/button/Button.tsx";

// =======================
// Reusable Typography
// =======================
const SectionTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mt-4">{children}</h2>
);

const PageTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{children}</h1>
);

// =======================
// Main Form Component
// =======================
function Form() {
  const [selectedPortofolio, setSelectedPortofolio] = useState("");
  const [programList, setProgramList] = useState<string[]>([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [boqItems, setBoqItems] = useState<{ item: string; volume: string }[]>([
    { item: "", volume: "" },
  ]);

  // -----------------------
  // Handle portofolio dropdown
  // -----------------------
  const handlePortofolioChange = (value: string) => {
    setSelectedPortofolio(value);

    if (value === "infra") {
      setProgramList([
        "OSP",
        "OSP Granular",
        "PT 2",
        "WIFI",
        "Feeder Branching",
        "HEM",
        "QE Akses Project",
        "Node B",
        "Relok Utilitas",
        "Migrasi",
        "Project SPBU",
        "Node B OLO",
        "FTM",
        "Konstruksi Eksternal",
      ]);
    } else if (value === "software") {
      setProgramList([
        "IOAN",
        "MS SPBU",
        "Service Node",
        "QE Recovery",
        "Relok Alpro",
        "QE Akses",
        "QE OLO",
        "MS Eksternal",
        "MS Anper",
      ]);
    } else if (value === "jaringan") {
      setProgramList([
        "Provisioning",
        "Provisioning HSI",
        "Provisioning EBIS",
        "Provisioning WIBS",
        "Provisioning Eksternal",
      ]);
    } else if (value === "keamanan") {
      setProgramList([
        "SDI",
        "Inventory Solution",
        "Survey & Due Diligence",
        "Training & Certification",
        "NW Surveilance Solution",
        "Warehouse Service",
      ]);
    } else {
      setProgramList([]);
    }
  };

  // -----------------------
  // Handle BOQ Input
  // -----------------------
  const handleBoqChange = (index: number, field: "item" | "volume", value: string) => {
    const updated = [...boqItems];
    updated[index][field] = value;
    setBoqItems(updated);
  };

  const addBoqRow = () => {
    setBoqItems([...boqItems, { item: "", volume: "" }]);
  };

  const removeBoqRow = (index: number) => {
    const updated = boqItems.filter((_, i) => i !== index);
    setBoqItems(updated);
  };

  // -----------------------
  // Render Form
  // -----------------------
  return (
    <>
      <PageTitle>Project Management</PageTitle>
      <SectionTitle>Form Input</SectionTitle>

      {/* ===================== */}
      {/* Form Utama */}
      {/* ===================== */}
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Pid Proactive */}
        <Label>
          Pid Proactive
          <Input className="mt-4 w-1/2" placeholder="" />
        </Label>

        {/* WBS */}
        <Label className="mt-4">
          WBS Elements
          <Input className="mt-1" placeholder="" />
        </Label>

        {/* Lokasi */}
        <Label className="mt-4">
          Detail Lokasi Project
          <Input className="mt-1" placeholder="" />
        </Label>

        {/* Portofolio Dropdown */}
        <Label className="mt-4">
          <span>Portofolio</span>
          <select
            className="mt-1 w-60"
            value={selectedPortofolio}
            onChange={(e) => handlePortofolioChange(e.target.value)}
          >
            <option value="">Pilih Portofolio</option>
            <option value="infra">Construction</option>
            <option value="software">Manage Service</option>
            <option value="jaringan">Provisioning</option>
            <option value="keamanan">Solution</option>
          </select>
        </Label>

        {/* Program Dropdown */}
        <Label className="mt-4">
          <span className="text-sm font-medium">Program</span>
          <select
            className="mt-1 w-60 text-sm max-h-36 overflow-y-auto rounded-md"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            disabled={programList.length === 0}
          >
            <option value="">Pilih Program</option>
            {programList.map((program, index) => (
              <option key={index} value={program} className="truncate">
                {program}
              </option>
            ))}
          </select>
        </Label>

        {/* Eksekutor */}
        <Label className="mt-4">
          <span>Eksekutor Project</span>
          <select className="mt-1 w-60">
            <option value="">Pilih Eksekutor Project</option>
            <option value="TA">Swakelola</option>
            <option value="mitra">Kemitraan</option>
          </select>
        </Label>

        {/* Waspang */}
        <Label className="mt-4">
          Waspang
          <Input className="mt-1" placeholder="" />
        </Label>

        {/* Waktu Pelaksanaan */}
        <Label className="mt-4 block">Waktu Pelaksanaan</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <Label>
              <span>Start</span>
              <Input type="date" className="mt-1" />
            </Label>
          </div>
          <div>
            <Label>
              <span>End</span>
              <Input type="date" className="mt-1" />
            </Label>
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Label>
            <span className="text-sm font-medium">Input File BOQ</span>
            <div className="mt-1">
              <label className="flex items-center gap-1 px-2 py-1 bg-gray-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700">
                Choose file
                <Input type="file" className="hidden" />
              </label>
            </div>
          </Label>

          <Label>
            <span>MoM</span>
            <div className="mt-1">
              <label className="flex items-center gap-1 px-2 py-1 bg-gray-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700">
                Choose file
                <Input type="file" className="hidden" />
              </label>
            </div>
          </Label>
        </div>

        {/* BOQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Label>
            <span>Item BOQ</span>
            {boqItems.map((row, index) => (
              <Input
                key={`item-${index}`}
                type="text"
                className="mt-1"
                value={row.item}
                onChange={(e) => handleBoqChange(index, "item", e.target.value)}
              />
            ))}
          </Label>

          <Label>
            <span>Volume</span>
            {boqItems.map((row, index) => (
              <Input
                key={`volume-${index}`}
                type="number"
                className="mt-1"
                value={row.volume}
                onChange={(e) => handleBoqChange(index, "volume", e.target.value)}
              />
            ))}
          </Label>
        </div>

        {/* Tombol Tambah/Hapus Baris */}
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded"
            onClick={addBoqRow}
          >
            Add
          </Button>

          <Button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
            onClick={() => {
              if (boqItems.length > 1) removeBoqRow(boqItems.length - 1);
            }}
          >
            Del
          </Button>
        </div>
      </div>

      {/* ===================== */}
      {/* Tombol Submit */}
      {/* ===================== */}
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="mt-4">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default Form;
export const CreateFormProjectComponents = () => {
  return (
    <div>
      <Form />
    </div>
  );
}