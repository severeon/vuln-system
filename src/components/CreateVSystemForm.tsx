import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const CreateVSystemForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  // Simplified for this example. In a real application, you would manage typeCharts more dynamically.
  const [typeCharts, setTypeCharts] = useState([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would add the logic to add the new VSystem to your context or state.
    console.log({ id, name, typeCharts });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Create VSystem</h1>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '8fr 4fr',
          gap: '1rem',
          '@media (max-width: 600px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="System Name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* For typeCharts, you would likely need a more complex input mechanism */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create VSystem
        </Button>
      </Box>
    </Box>
  );
};

export default CreateVSystemForm;