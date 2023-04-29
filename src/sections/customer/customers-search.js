import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Button, Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = ({ handleSearch, selected, handleDeleteMany }) => (
  <Card sx={{ p: 2 }} style={{
    display: 'flex',
    justifyContent: "space-between"
  }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search customer"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
    {
      (selected.length > 1) && <Button variant='contained' color='error' onClick={() => handleDeleteMany(selected)} >
        Delete Many
      </Button>
    }
  </Card>
);
