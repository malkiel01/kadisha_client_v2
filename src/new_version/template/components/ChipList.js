import React, { useState } from 'react';
import { Stack, Chip } from '@mui/material';

function ChipList({ initialChips, onChipsChange }) {
  const [chips, setChips] = useState(initialChips);

  const handleDelete = (chipToDelete) => () => {
    const updatedChips = chips.filter((chip) => chip.id !== chipToDelete.id);
    setChips(updatedChips);
    onChipsChange(updatedChips);
  };

  return (
    <Stack direction="row" spacing={1}>
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.name}
          onDelete={handleDelete(chip)}
        />
      ))}
    </Stack>
  );
}

export default ChipList;
