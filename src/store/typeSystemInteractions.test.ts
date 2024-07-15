import { elementalTypeChart } from '../../test/vSystem1';
import { InteractionType } from '../context/TypeSystemContext'

describe('Elemental Type Interactions', () => {
  test('Fire is weak against Water', () => {
    const interactions = elementalTypeChart.getInteractions('fire', 'water');
    expect(interactions).toHaveLength(1);
    const interaction = interactions[0];
    expect(interaction.interactionType).toBe(InteractionType.APPLYING);
    expect(interaction.interactionTags).toContain('ElementalWeakness');
    
    const result = interaction.interactionMapper({ damage: 100 }, 'forward');
    expect(result.damage).toBe(50);
  });

  test('Water is strong against Fire', () => {
    const interactions = elementalTypeChart.getInteractions('water', 'fire');
    expect(interactions).toHaveLength(1);
    const interaction = interactions[0];
    expect(interaction.interactionType).toBe(InteractionType.APPLYING);
    expect(interaction.interactionTags).toContain('ElementalWeakness');
    
    const result = interaction.interactionMapper({ damage: 100 }, 'reverse');
    expect(result.damage).toBe(200);
  });

  test('Fire is strong against Earth', () => {
    const interactions = elementalTypeChart.getInteractions('fire', 'earth');
    expect(interactions).toHaveLength(1);
    const interaction = interactions[0];
    expect(interaction.interactionType).toBe(InteractionType.APPLYING);
    expect(interaction.interactionTags).toContain('ElementalStrength');
    
    const result = interaction.interactionMapper({ damage: 100 });
    expect(result.damage).toBe(150);
  });

  test('Earth has no special interaction with Fire', () => {
    const interactions = elementalTypeChart.getInteractions('earth', 'fire');
    expect(interactions).toHaveLength(0);
  });

  test('Water and Earth have synergy', () => {
    const interactions = elementalTypeChart.getInteractions('water', 'earth');
    expect(interactions).toHaveLength(1);
    const interaction = interactions[0];
    expect(interaction.interactionType).toBe(InteractionType.APPLYING);
    expect(interaction.interactionTags).toContain('ElementalSynergy');
    
    const result = interaction.interactionMapper({ statusEffectChance: 0.3 });
    expect(result.statusEffectChance).toBe(0.5);
  });

  test('Air amplifies Fire', () => {
    const interactions = elementalTypeChart.getInteractions('air', 'fire');
    expect(interactions).toHaveLength(1);
    const interaction = interactions[0];
    expect(interaction.interactionType).toBe(InteractionType.APPLYING);
    expect(interaction.interactionTags).toContain('ElementalAmplification');
    
    const result = interaction.interactionMapper({ damage: 100, range: 2 });
    expect(result.damage).toBe(120);
    expect(result.range).toBe(3);
  });
});