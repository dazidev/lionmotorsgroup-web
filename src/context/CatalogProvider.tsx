import React, { createContext, useContext, useMemo, useState } from "react";

export type CatalogSpec = {
  id: string;
  name: string;
};

export type CatalogBrand = {
  id: string;
  name: string;
  imagePath: string;
};

type CatalogContextValue = {
  securitySpecsData: CatalogSpec[];
  confortSpecsData: CatalogSpec[];
  brandsData: CatalogBrand[];
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

interface Props {
  children: React.ReactNode;
  securitySpecsData: CatalogSpec[];
  confortSpecsData: CatalogSpec[];
  brandsData: CatalogBrand[];
}

export function CatalogProvider({
  children,
  securitySpecsData,
  confortSpecsData,
  brandsData,
}: Props) {
  const [securitySpecs, setSecuritySpecs] =
    useState<CatalogSpec[]>(securitySpecsData);
  const [confortSpecs, setConfortSpecs] =
    useState<CatalogSpec[]>(confortSpecsData);
  const [brands, setBrands] = useState<CatalogBrand[]>(brandsData);

  const value = useMemo<CatalogContextValue>(
    () => ({
      securitySpecsData: securitySpecs,
      confortSpecsData: confortSpecs,
      brandsData: brands,
    }),
    [securitySpecs, confortSpecs, brands]
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context)
    throw new Error("useCatalog must be used inside CatalogProvider");
  return context;
}
