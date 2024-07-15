import { Type, TypeChart, TypeInteraction } from '../context/TypeSystemContext'

export default abstract class BaseTypeChart implements TypeChart {
  id: string;
  name: string;
  types: Type[];
  interactions: TypeInteraction[];

  constructor(options: Record<string, any>) {
    const { id, name, types, interactions } = options

    this.id = id ?? 'default'
    this.name = name ?? 'default'
    this.types = types ?? []
    this.interactions = interactions ?? []
  }

  getInteractions(type1: string, type2: string): TypeInteraction[] {
    return this.interactions.filter(i => 
      (i.types[0] === type1 && i.types[1] === type2) ||
      (i.isBidirectional && i.types[0] === type2 && i.types[1] === type1)
    );
  }
}