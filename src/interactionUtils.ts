import { TypeInteraction } from "./context/TypeSystemContext"

export const bidirectionalMatcher = (interactions: TypeInteraction[]) => (type1: string, type2: string) => {
  return interactions.filter(i => 
    (i.types[0] === type1 && i.types[1] === type2) ||
    (i.isBidirectional && i.types[0] === type2 && i.types[1] === type1)
  );
}
export const bimatch = bidirectionalMatcher