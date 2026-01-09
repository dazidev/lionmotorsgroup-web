"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getBrands, getSpecifications } from "../actions";
import { ServerResponse, Specification } from "../interfaces";

export type CatalogSpec = {
  id: string;
  type: string;
  name: string;
  checked: boolean;
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
  handleCheckedSpec: (id: string) => void;
  resetCheckedSpec: () => void;
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
        const specResponse: ServerResponse<Specification[]> =
          await getSpecifications();
        if (!specResponse.success) return;
        if (!specResponse.data) return;
        const data: CatalogSpec[] = specResponse.data?.map((spec) => {
          return {
            id: spec.id,
            type: spec.type,
            name: spec.name,
            checked: false,
            createdAt: spec.createdAt,
            updatedAt: spec.updatedAt,
          };
        });
        setSpecifications(data);
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

  const handleCheckedSpec = useCallback((id: string) => {
    setSpecifications((prev) =>
      prev.map((spec) => {
        if (spec.id === id) {
          return { ...spec, checked: !spec.checked };
        }
        return spec;
      })
    );
  }, []);

  const resetCheckedSpec = useCallback(() => {
    setSpecifications((prev) =>
      prev.map((spec) => {
        return { ...spec, checked: false };
      })
    );
  }, []);

  const value = useMemo<CatalogContextValue>(
    () => ({
      specificationsData: specifications,
      brandsData: brands,
      revalidateData,
      handleCheckedSpec,
      resetCheckedSpec,
    }),
    [
      specifications,
      brands,
      revalidateData,
      handleCheckedSpec,
      resetCheckedSpec,
    ]
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
