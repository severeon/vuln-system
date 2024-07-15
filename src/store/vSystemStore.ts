import { Type } from 'typescript';
import { create } from 'zustand'
import { VSystem, TypeChart, TypeInteraction } from '../context/TypeSystemContext';

export interface VSystemState {
  vSystems: VSystem[];
  addVSystem: (vSystem: VSystem) => void;
  updateVSystem: (id: string, vSystem: Partial<VSystem>) => void;
  deleteVSystem: (id: string) => void;
  addTypeChart: (vSystemId: string, typeChart: TypeChart) => void;
  updateTypeChart: (vSystemId: string, typeChartId: string, typeChart: Partial<TypeChart>) => void;
  deleteTypeChart: (vSystemId: string, typeChartId: string) => void;
  addType: (vSystemId: string, typeChartId: string, type: Type) => void;
  updateType: (vSystemId: string, typeChartId: string, typeId: string, type: Partial<Type>) => void;
  deleteType: (vSystemId: string, typeChartId: string, typeId: string) => void;
}

const useVSystemStore = create<VSystemState>((set) => ({
  vSystems: [],
  addVSystem: (vSystem) => set((state) => ({ vSystems: [...state.vSystems, vSystem] })),
  updateVSystem: (id, updatedVSystem) => set((state) => ({
    vSystems: state.vSystems.map(vs => vs.id === id ? { ...vs, ...updatedVSystem } : vs)
  })),
  deleteVSystem: (id) => set((state) => ({
    vSystems: state.vSystems.filter(vs => vs.id !== id)
  })),
  addTypeChart: (vSystemId, typeChart) => set((state) => ({
    vSystems: state.vSystems.map(vs => 
      vs.id === vSystemId ? { ...vs, typeCharts: [...vs.typeCharts, typeChart] } : vs
    )
  })),
  updateTypeChart: (vSystemId, typeChartId, updatedTypeChart) => set((state) => ({
    vSystems: state.vSystems.map(vs => 
      vs.id === vSystemId ? {
        ...vs,
        typeCharts: vs.typeCharts.map(tc => 
          tc.id === typeChartId ? { ...tc, ...updatedTypeChart } : tc
        )
      } : vs
    )
  })),
  deleteTypeChart: (vSystemId, typeChartId) => set((state) => ({
    vSystems: state.vSystems.map(vs => 
      vs.id === vSystemId ? {
        ...vs,
        typeCharts: vs.typeCharts.filter(tc => tc.id !== typeChartId)
      } : vs
    )
  })),
  addType: (vSystemId, typeChartId, type) => set((state) => ({
    vSystems: state.vSystems.map(vs => 
      vs.id === vSystemId ? {
        ...vs,
        typeCharts: vs.typeCharts.map(tc => 
          tc.id === typeChartId ? { ...tc, types: [...tc.types, type] } : tc
        )
      } as VSystem : vs
    )
  })),
  updateType: (vSystemId, typeChartId, typeId, updatedType) => set((state) => ({
    vSystems: state.vSystems.map(vs => 
      vs.id === vSystemId ? {
        ...vs,
        typeCharts: vs.typeCharts.map(tc => 
          tc.id === typeChartId ? {
            ...tc,
            types: tc.types.map(t => t.id === typeId ? { ...t, ...updatedType } : t)
          } : tc
        )
      } : vs
    )
  })),
  deleteType: (vSystemId, typeChartId, typeId) => set((state) => ({
    vSystems: state.vSystems.map(vs => 
      vs.id === vSystemId ? {
        ...vs,
        typeCharts: vs.typeCharts.map(tc => 
          tc.id === typeChartId ? {
            ...tc,
            types: tc.types.filter(t => t.id !== typeId)
          } : tc
        )
      } : vs
    )
  })),
  addInteraction: (vSystemId: string, typeChartId: string, interaction: TypeInteraction) => 
    set(state => ({
      vSystems: state.vSystems.map(vs => 
        vs.id === vSystemId ? {
          ...vs,
          typeCharts: vs.typeCharts.map(tc =>
            tc.id === typeChartId ? {
              ...tc,
              interactions: [...tc.interactions, interaction]
            } : tc
          )
        } : vs
      )
    })),
    addBidirectionalInteraction: (vSystemId: string, typeChartId: string, interaction: Omit<TypeInteraction, 'isBidirectional'>) => 
      set(state => ({
        vSystems: state.vSystems.map(vs => 
          vs.id === vSystemId ? {
            ...vs,
            typeCharts: vs.typeCharts.map(tc =>
              tc.id === typeChartId ? {
                ...tc,
                interactions: [...tc.interactions, { ...interaction, isBidirectional: true }]
              } : tc
            )
          } : vs
        )
      })),    
}))

export default useVSystemStore;