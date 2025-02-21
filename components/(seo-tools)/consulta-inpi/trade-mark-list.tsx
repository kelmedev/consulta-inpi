"use client";

import TradeMarkForm from "./trade-mark-form";
import TradeMarkModal from "./trade-mark-modal";
import TrademarkTable from "./trade-mark-table";

import { useState } from "react";

export default function TradeMarkList() {
  const [searchData, setSearchData] = useState({} as any);
  const [data, setData] = useState([] as any);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleFormSubmit = async (values: any) => {
    const objectFormated = {
      brand: values.brandSearch,
      isRadical: values.searchType === "exact" ? false : true,
    };
    setSearchData(objectFormated);
    openModal();
  };

  return (
    <>
      <TradeMarkForm onSubmit={handleFormSubmit} />
      {data.raws && data.raws.length > 0 && <TrademarkTable data={data.raws} />}
      <TradeMarkModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchData={searchData}
        setData={setData}
      />
    </>
  );
}
