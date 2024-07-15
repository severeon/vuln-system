// import { TypeChart, Type } from '../store/vSystemStore'

// import useVSystemStore from './vSystemStore';

// describe('vSystemStore', () => {
//   beforeEach(() => {
//     // Clear the store before each test
//     useVSystemStore.setState({ vSystems: [] });
//   });

//   test('should add a v-system', () => {
//     const addVSystem = useVSystemStore.getState().addVSystem;
//     const newVSystem = { id: '1', name: 'Test V-System', typeCharts: [] as TypeChart[] };
    
//     addVSystem(newVSystem);
    
//     const vSystems = useVSystemStore.getState().vSystems;
//     expect(vSystems).toHaveLength(1);
//     expect(vSystems[0]).toEqual(newVSystem);
//   });

//   test('should update a v-system', () => {
//     const { addVSystem, updateVSystem } = useVSystemStore.getState();
//     const vSystem = { id: '1', name: 'Original Name', typeCharts: [] as TypeChart[] };
//     addVSystem(vSystem);
    
//     updateVSystem('1', { name: 'Updated Name' });
    
//     const updatedVSystem = useVSystemStore.getState().vSystems[0];
//     expect(updatedVSystem.name).toBe('Updated Name');
//   });

//   test('should delete a v-system', () => {
//     const { addVSystem, deleteVSystem } = useVSystemStore.getState();
//     const vSystem = { id: '1', name: 'To Be Deleted', typeCharts: [] as TypeChart[] };
//     addVSystem(vSystem);
    
//     deleteVSystem('1');
    
//     const vSystems = useVSystemStore.getState().vSystems;
//     expect(vSystems).toHaveLength(0);
//   });

//   test('should add a type chart to a v-system', () => {
//     const { addVSystem, addTypeChart } = useVSystemStore.getState();
//     const vSystem = { id: '1', name: 'Test V-System', typeCharts: [] as TypeChart[] };
//     addVSystem(vSystem);
    
//     const newTypeChart = { id: 'tc1', name: 'Test Type Chart', types: [] as Type[] };
//     addTypeChart('1', newTypeChart);
    
//     const updatedVSystem = useVSystemStore.getState().vSystems[0];
//     expect(updatedVSystem.typeCharts).toHaveLength(1);
//     expect(updatedVSystem.typeCharts[0]).toEqual(newTypeChart);
//   });

//   test('should update a type chart', () => {
//     const { addVSystem, addTypeChart, updateTypeChart } = useVSystemStore.getState();
//     const vSystem = { id: '1', name: 'Test V-System', typeCharts: [] as TypeChart[] };
//     addVSystem(vSystem);
//     const typeChart = { id: 'tc1', name: 'Original Name', types: [] as Type[] };
//     addTypeChart('1', typeChart);
    
//     updateTypeChart('1', 'tc1', { name: 'Updated Name' });
    
//     const updatedTypeChart = useVSystemStore.getState().vSystems[0].typeCharts[0];
//     expect(updatedTypeChart.name).toBe('Updated Name');
//   });

//   test('should delete a type chart', () => {
//     const { addVSystem, addTypeChart, deleteTypeChart } = useVSystemStore.getState();
//     const vSystem = { id: '1', name: 'Test V-System', typeCharts: [] as TypeChart[] };
//     addVSystem(vSystem);
//     const typeChart = { id: 'tc1', name: 'To Be Deleted', types: [] as Type[] };
//     addTypeChart('1', typeChart);
    
//     deleteTypeChart('1', 'tc1');
    
//     const updatedVSystem = useVSystemStore.getState().vSystems[0];
//     expect(updatedVSystem.typeCharts).toHaveLength(0);
//   });

//   test('should add a type to a type chart', () => {
//     const { addVSystem, addTypeChart, addType } = useVSystemStore.getState();
//     const vSystem = { id: '1', name: 'Test V-System', typeCharts: [] as TypeChart[] };
//     addVSystem(vSystem);
//     const typeChart = { id: 'tc1', name: 'Test Type Chart', types: [] as Type[] };
//     addTypeChart('1', typeChart);
    
//     const newType = { 
//       id: 't1', 
//       name: 'Fire', 
//       color: '#FF0000', 
//       icon: 'fire',
//       weakTo: {},
//       strongAgainst: {},
//       statusEffect: 'Burn',
//       environmentalBoost: 'Sunny'
//     };
//     addType('1', 'tc1', newType);
    
//     const updatedTypeChart = useVSystemStore.getState().vSystems[0].typeCharts[0];
//     expect(updatedTypeChart.types).toHaveLength(1);
//     expect(updatedTypeChart.types[0]).toEqual(newType);
//   });

//   // TODO add more tests for updateType and deleteType following the same pattern
// });

export default {}