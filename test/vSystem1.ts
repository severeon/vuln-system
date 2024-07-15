import { Type, TypeChart, TypeInteraction, InteractionType } from '../src/context/TypeSystemContext'

export const elementalTypes: Type[] = [
  { id: 'fire', name: 'Fire', color: '#FF4136', icon: 'fire', statusEffect: 'Burn', environmentalBoost: 'Sunny' },
  { id: 'water', name: 'Water', color: '#0074D9', icon: 'water', statusEffect: 'Soak', environmentalBoost: 'Rain' },
  { id: 'earth', name: 'Earth', color: '#3D9970', icon: 'mountain', statusEffect: 'Quake', environmentalBoost: 'Sandstorm' },
  { id: 'air', name: 'Air', color: '#FFFFFF', icon: 'wind', statusEffect: 'Gust', environmentalBoost: 'Windy' },
];

export const elementalInteractions: TypeInteraction[] = [
  {
    types: ['fire', 'water'],
    isBidirectional: true,
    interactionType: InteractionType.APPLYING,
    interactionTags: ['ElementalWeakness'],
    interactionMapper: (interaction: any, direction?: 'forward' | 'reverse') => {
      if (direction === 'forward') {
        return { ...interaction, damage: interaction.damage * 0.5 };
      } else {
        return { ...interaction, damage: interaction.damage * 2 };
      }
    }
  },
  {
    types: ['fire', 'earth'],
    isBidirectional: false,
    interactionType: InteractionType.APPLYING,
    interactionTags: ['ElementalStrength'],
    interactionMapper: (interaction: any) => {
      return { ...interaction, damage: interaction.damage * 1.5 };
    }
  },
  {
    types: ['water', 'earth'],
    isBidirectional: true,
    interactionType: InteractionType.APPLYING,
    interactionTags: ['ElementalSynergy'],
    interactionMapper: (interaction: any) => {
      return { ...interaction, statusEffectChance: (interaction.statusEffectChance || 0) + 0.2 };
    }
  },
  {
    types: ['air', 'fire'],
    isBidirectional: true,
    interactionType: InteractionType.APPLYING,
    interactionTags: ['ElementalAmplification'],
    interactionMapper: (interaction: any) => {
      return { ...interaction, damage: interaction.damage * 1.2, range: (interaction.range || 0) + 1 };
    }
  }
];

export const elementalTypeChart: TypeChart = {
  id: 'elemental',
  name: 'Elemental Types',
  types: elementalTypes,
  interactions: elementalInteractions,
  getInteractions(type1: string, type2: string): TypeInteraction[] {
    return this.interactions.filter(i => 
      (i.types[0] === type1 && i.types[1] === type2) ||
      (i.isBidirectional && i.types[0] === type2 && i.types[1] === type1)
    );
  }
};