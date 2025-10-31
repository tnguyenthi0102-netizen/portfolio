import { useQueryStates, parseAsString } from 'nuqs'
import { useState } from 'react'
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Stack,
} from '@mui/material'
import { ACHIEVEMENT_CATEGORIES, ACHIEVEMENT_STATUSES } from '@/data/achievement-constants'

function AchievementToolbar() {
  const [search, setSearch] = useQueryStates({
    search: parseAsString.withDefault(''),
    category: parseAsString,
    status: parseAsString,
    createdFrom: parseAsString,
    createdTo: parseAsString,
    updatedFrom: parseAsString,
    updatedTo: parseAsString,
    page: parseAsString.withDefault('1'),
    limit: parseAsString.withDefault('10'),
  })

  const [localSearch, setLocalSearch] = useState(search.search || '')
  const [localCategory, setLocalCategory] = useState(search.category || '')
  const [localStatus, setLocalStatus] = useState(search.status || '')
  const [localCreatedFrom, setLocalCreatedFrom] = useState(search.createdFrom || '')
  const [localCreatedTo, setLocalCreatedTo] = useState(search.createdTo || '')

  const handleReset = () => {
    setSearch({
      search: '',
      category: null,
      status: null,
      createdFrom: null,
      createdTo: null,
      updatedFrom: null,
      updatedTo: null,
      page: '1',
    })
    setLocalSearch('')
    setLocalCategory('')
    setLocalStatus('')
    setLocalCreatedFrom('')
    setLocalCreatedTo('')
  }

  const handleApplyFilters = () => {
    setSearch({
      search: localSearch || '',
      category: localCategory ? localCategory : null,
      status: localStatus ? localStatus : null,
      createdFrom: localCreatedFrom ? localCreatedFrom : null,
      createdTo: localCreatedTo ? localCreatedTo : null,
      page: '1',
    })
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            size="small"
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={localCategory}
              label="Category"
              onChange={(e) => setLocalCategory(e.target.value as string)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {ACHIEVEMENT_CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={localStatus}
              label="Status"
              onChange={(e) => setLocalStatus(e.target.value as string)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {ACHIEVEMENT_STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Created From"
            type="date"
            value={localCreatedFrom}
            onChange={(e) => setLocalCreatedFrom(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: { xs: '100%', sm: 180 } }}
          />
          <TextField
            label="Created To"
            type="date"
            value={localCreatedTo}
            onChange={(e) => setLocalCreatedTo(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: { xs: '100%', sm: 180 } }}
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleReset} sx={{ minWidth: 120, height: '40px' }}>
            Reset
          </Button>
          <Button variant="contained" onClick={handleApplyFilters} sx={{ minWidth: 120, height: '40px' }}>
            Filter
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default AchievementToolbar
