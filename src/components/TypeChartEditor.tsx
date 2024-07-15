// src/components/TypeChartEditor.tsx

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  styled,
  Icon
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTypeSystem, Type, TypeChart } from '../context/TypeSystemContext';

const ColorBar = styled(Box)<{ barcolor: string }>(({ barcolor }) => ({
  height: '10px',
  backgroundColor: barcolor,
}));

const TypeCard: React.FC<{ type: Type; typeChart: TypeChart }> = ({ type, typeChart }) => {
  return (
    <Card>
      <ColorBar barcolor={type.color} />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          <Icon>{type.icon}</Icon> {type.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Status Effect: {type.statusEffect}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Environmental Boost: {type.environmentalBoost}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Interactions:
        </Typography>
        {typeChart.getInteractions(type.id, type.id).map((interaction, index) => (
          <Chip
            key={index}
            label={`${interaction.interactionTags.join(', ')} with ${typeChart.types.find(t => t.id === interaction.types[1])?.name}`}
            size="small"
            style={{ margin: '2px' }}
          />
        ))}
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
};

const TypeChartEditor: React.FC = () => {
  const { currentSystem, addType } = useTypeSystem();

  const handleAddType = () => {
    // Implement adding a new type
    console.log('Add new type');
  };

  if (!currentSystem) {
    return <Typography>No type system loaded. Please create or load a system.</Typography>;
  }

  const currentTypeChart = currentSystem.typeCharts[0]; // For now, we're just using the first type chart

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Type Chart Editor: {currentTypeChart.name}
      </Typography>
      <Grid container spacing={3}>
        {currentTypeChart.types.map((type) => (
          <Grid item xs={12} sm={6} md={4} key={type.id}>
            <TypeCard type={type} typeChart={currentTypeChart} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddType}
              >
                Add New Type
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TypeChartEditor;