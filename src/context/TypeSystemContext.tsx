// src/context/TypeSystemContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum InteractionType {
  APPLYING,
  RECEIVING
}

export interface TypeInteraction {
  types: [string, string]; // [sourceType, targetType]
  isBidirectional: boolean;
  interactionType: InteractionType;
  interactionTags: string[];
  interactionMapper: (interaction: any, direction?: 'forward' | 'reverse') => any;
}

export interface Type {
  id: string;
  name: string;
  color: string;
  icon: string;
  statusEffect: string;
  environmentalBoost: string;
}

export interface TypeChart {
  id: string;
  name: string;
  types: Type[];
  interactions: TypeInteraction[];
  getInteractions(type1: string, type2: string): TypeInteraction[];
}

export interface VSystem {
  id: string;
  name: string;
  typeCharts: TypeChart[];
}

interface TypeSystemContextType {
  currentSystem: VSystem | null;
  setCurrentSystem: (system: VSystem | null) => void;
  addTypeChart: (typeChart: TypeChart) => void;
  updateTypeChart: (id: string, typeChart: Partial<TypeChart>) => void;
  deleteTypeChart: (id: string) => void;
  addType: (typeChartId: string, type: Type) => void;
  updateType: (typeChartId: string, typeId: string, type: Partial<Type>) => void;
  deleteType: (typeChartId: string, typeId: string) => void;
  addInteraction: (typeChartId: string, interaction: TypeInteraction) => void;
  updateInteraction: (typeChartId: string, index: number, interaction: Partial<TypeInteraction>) => void;
  deleteInteraction: (typeChartId: string, index: number) => void;
}

const TypeSystemContext = createContext<TypeSystemContextType | undefined>(undefined);

export const useTypeSystem = () => {
  const context = useContext(TypeSystemContext);
  if (context === undefined) {
    throw new Error('useTypeSystem must be used within a TypeSystemProvider');
  }
  return context;
};

export const TypeSystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSystem, setCurrentSystem] = useState<VSystem | null>(null);

  const addTypeChart = (typeChart: TypeChart) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: [...currentSystem.typeCharts, typeChart],
      });
    }
  };

  const updateTypeChart = (id: string, updatedTypeChart: Partial<TypeChart>) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: currentSystem.typeCharts.map(tc => 
          tc.id === id ? { ...tc, ...updatedTypeChart } : tc
        ),
      });
    }
  };

  const deleteTypeChart = (id: string) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: currentSystem.typeCharts.filter(tc => tc.id !== id),
      });
    }
  };

  const addType = (typeChartId: string, type: Type) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: currentSystem.typeCharts.map(tc => 
          tc.id === typeChartId ? { ...tc, types: [...tc.types, type] } : tc
        ),
      });
    }
  };

  const updateType = (typeChartId: string, typeId: string, updatedType: Partial<Type>) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: currentSystem.typeCharts.map(tc => 
          tc.id === typeChartId ? {
            ...tc,
            types: tc.types.map(t => t.id === typeId ? { ...t, ...updatedType } : t)
          } : tc
        ),
      });
    }
  };

  const deleteType = (typeChartId: string, typeId: string) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: currentSystem.typeCharts.map(tc => 
          tc.id === typeChartId ? {
            ...tc,
            types: tc.types.filter(t => t.id !== typeId)
          } : tc
        ),
      });
    }
  };

  const addInteraction = (typeChartId: string, interaction: TypeInteraction) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: currentSystem.typeCharts.map(tc => 
          tc.id === typeChartId ? { ...tc, interactions: [...tc.interactions, interaction] } : tc
        ),
      });
    }
  };

  const updateInteraction = (typeChartId: string, index: number, updatedInteraction: Partial<TypeInteraction>) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: currentSystem.typeCharts.map(tc => 
          tc.id === typeChartId ? {
            ...tc,
            interactions: tc.interactions.map((interaction, i) => 
              i === index ? { ...interaction, ...updatedInteraction } : interaction
            )
          } : tc
        ),
      });
    }
  };

  const deleteInteraction = (typeChartId: string, index: number) => {
    if (currentSystem) {
      setCurrentSystem({
        ...currentSystem,
        typeCharts: currentSystem.typeCharts.map(tc => 
          tc.id === typeChartId ? {
            ...tc,
            interactions: tc.interactions.filter((_, i) => i !== index)
          } : tc
        ),
      });
    }
  };

  return (
    <TypeSystemContext.Provider
      value={{
        currentSystem,
        setCurrentSystem,
        addTypeChart,
        updateTypeChart,
        deleteTypeChart,
        addType,
        updateType,
        deleteType,
        addInteraction,
        updateInteraction,
        deleteInteraction,
      }}
    >
      {children}
    </TypeSystemContext.Provider>
  );
};

export default TypeSystemProvider;