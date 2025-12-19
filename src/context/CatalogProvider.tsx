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
  type: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CatalogBrand = {
  id: string;
  name: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
};

type DataOptions = "specifications" | "brands";

type CatalogContextValue = {
  specificationsData: CatalogSpec[];
  brandsData: CatalogBrand[];
  revalidateData: (option: DataOptions) => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

interface Props {
  children: React.ReactNode;
  specificationsData: CatalogSpec[];
  brandsData: CatalogBrand[];
}

export function CatalogProvider({
  children,
  specificationsData,
  brandsData,
}: Props) {
  const [specifications, setSpecifications] =
    useState<CatalogSpec[]>(specificationsData);
  const [brands, setBrands] = useState<CatalogBrand[]>(brandsData);

  const revalidateData = useCallback(async (option: DataOptions) => {
    switch (option) {
      case "specifications":
        const securityResponse = await getSpecifications();
        if (!securityResponse.success) return;
        setSpecifications(securityResponse.data);
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
      specificationsData: specifications,
      brandsData: brands,
      revalidateData,
    }),
    [specifications, brands, revalidateData]
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
