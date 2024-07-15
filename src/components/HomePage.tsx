import React, { MouseEventHandler } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  styled,
  Stack,
} from '@mui/material';
import { 
  AddCircle as AddCircleIcon, 
  FolderOpen as FolderOpenIcon, 
  Lightbulb as LightbulbIcon 
} from '@mui/icons-material';
import { useTypeSystem, VSystem } from '../context/TypeSystemContext';
import fireWaterExample from '../examples/fireWaterExample'
import { useNavigate } from 'react-router-dom';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: 48,
  marginBottom: theme.spacing(2),
}));

interface OptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: MouseEventHandler<Element>;
}

const Option: React.FC<OptionProps> = ({ title, description, icon, onClick }) => (
  <Grid item xs={12} sm={4} >
    <StyledPaper elevation={2} onClick={onClick} sx={{height: '100%'}}>
      <IconWrapper>{icon}</IconWrapper>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
    </StyledPaper>
  </Grid>
);

const HomePage: React.FC = () => {
  const { setCurrentSystem } = useTypeSystem();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    console.log('Create New System clicked');

    setCurrentSystem(null);

    navigate('/new');
  };

  const handleLoadSaved = () => {
    console.log('Load Saved System clicked');
    // Implement loading saved system here
  };

  const handleLoadExample: MouseEventHandler<HTMLDivElement> = (event) => {
    const selectedExample = 'fireWater'
    
    if (selectedExample === 'fireWater') {
      const exampleSystem: VSystem = {
        id: 'example1',
        name: 'Fire and Water System',
        typeCharts: [fireWaterExample],
      };

      setCurrentSystem(exampleSystem);
      navigate('/edit');
    }
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: 1, flex: 2 }}>
      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: 'background.default'}}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Welcome to V-System
        </Typography>
        <Grid container spacing={3} alignItems='stretch'>
          <Option
            title="Create New System"
            description="Start from scratch and build your own custom type system. Define types, interactions, and rules to suit your needs."
            icon={<AddCircleIcon fontSize="large" />}
            onClick={handleCreateNew}
          />
          <Option
            title="Load Saved System"
            description="Continue working on a previously saved type system. Pick up right where you left off and keep refining your creation."
            icon={<FolderOpenIcon fontSize="large" />}
            onClick={handleLoadSaved}
          />
          <Option
            title="Load Example System"
            description="Explore pre-built type systems to get inspiration or use as a starting point for your own custom system."
            icon={<LightbulbIcon fontSize="large" />}
            onClick={handleLoadExample}
          />
        </Grid>
      </Box>
    </Stack>
  );
};

export default HomePage;