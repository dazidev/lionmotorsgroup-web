"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { BasicVehicleResponse } from "../interfaces";
import { getBasicVehicles } from "../actions";

type FinancialContextValue = {
  vehiclesData: BasicVehicleResponse[];
  revalidateData: () => void;
};

const FinancialContext = createContext<FinancialContextValue | null>(null);

interface Props {
  children: React.ReactNode;
  vehiclesData: BasicVehicleResponse[];
}

export function FinancialProvider({ children, vehiclesData }: Props) {
  const [vehicles, setVehicles] =
    useState<BasicVehicleResponse[]>(vehiclesData);

  const revalidateData = useCallback(async () => {
    const vehiclesResponse = await getBasicVehicles();
    if (!vehiclesResponse.success) return;
    setVehicles(vehiclesResponse.data!);
  }, []);

  const value = useMemo<FinancialContextValue>(
    () => ({
      vehiclesData: vehicles,
      revalidateData,
    }),
    [vehicles, revalidateData],
  );

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (!context)
    throw new Error("useFinancial must be used inside FinancialProvider");
  return context;
}
