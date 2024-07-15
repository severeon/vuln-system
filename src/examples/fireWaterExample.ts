import { InteractionType, Type, TypeChart, TypeInteraction } from '../context/TypeSystemContext'
import { bimatch } from '../interactionUtils'

const interactions: TypeInteraction[] = [
  {
    types: ['1', '2'],
    isBidirectional: true,
    interactionType: InteractionType.APPLYING,
    interactionTags: ['ElementalWeakness', 'ElementalStrength'],
    interactionMapper: (interaction: any, direction?: 'forward' | 'reverse') => {
      if (direction === 'forward') {
        return { ...interaction, damage: interaction.damage * 0.5 };
      } else {
        return { ...interaction, damage: interaction.damage * 2 };
      }
    },
  },
]

const exampleTypes: Type[] = [
  {
    id: '1',
    name: 'Fire',
    color: '#F44336',
    icon: 'local_fire_department',
    statusEffect: 'Burn',
    environmentalBoost: 'Sunny weather',
  },
  {
    id: '2',
    name: 'Water',
    color: '#2196F3',
    icon: 'water_drop',
    statusEffect: 'Soak',
    environmentalBoost: 'Rainy weather',
  },
]

const fireWaterExample: TypeChart = {
  id: 'tc1',
  name: 'Fire and Water Chart',
  types: exampleTypes,
  interactions,
  getInteractions: bimatch(interactions),
};

export default fireWaterExample