"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getBrands, getSpecifications } from "../actions";

export type CatalogSpec = {
  id: string;
  name: string;
};

export type CatalogBrand = {
  id: string;
  name: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
};

type DataOptions = "securitySpecs" | "confortSpecs" | "brands";

type CatalogContextValue = {
  securitySpecsData: CatalogSpec[];
  confortSpecsData: CatalogSpec[];
  brandsData: CatalogBrand[];
  revalidateData: (option: DataOptions) => void;
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

  const revalidateData = useCallback(async (option: DataOptions) => {
    switch (option) {
      case "securitySpecs":
        const securityResponse = await getSpecifications("security");
        if (!securityResponse.success) return;
        setSecuritySpecs(securityResponse.data);
        break;

      case "confortSpecs":
        const confortResponse = await getSpecifications("confort");
        if (!confortResponse.success) return;
        setConfortSpecs(confortResponse.data);
        break;

      case "brands":
        const brandsResponse = await getBrands();
        if (!brandsResponse.success) return;
        setBrands(brandsResponse.data!);
        break;

      default:
        break;
    }
  }, []);

  const value = useMemo<CatalogContextValue>(
    () => ({
      securitySpecsData: securitySpecs,
      confortSpecsData: confortSpecs,
      brandsData: brands,
      revalidateData,
    }),
    [securitySpecs, confortSpecs, brands, revalidateData]
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
