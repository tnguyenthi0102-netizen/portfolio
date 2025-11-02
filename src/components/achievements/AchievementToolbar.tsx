import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs'
import { useState, useEffect } from 'react'
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Stack,
  Slider,
  Typography,
  Box,
} from '@mui/material'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs, { Dayjs } from 'dayjs'
import { ACHIEVEMENT_CATEGORIES } from '@/data/achievement-constants'

function AchievementToolbar() {
  const [search, setSearch] = useQueryStates({
    search: parseAsString.withDefault(''),
    category: parseAsString,
    updatedFrom: parseAsString,
    updatedTo: parseAsString,
    progressMin: parseAsInteger,
    progressMax: parseAsInteger,
    page: parseAsString.withDefault('1'),
    limit: parseAsString.withDefault('10'),
  })

  const [localSearch, setLocalSearch] = useState(search.search || '')
  const [localCategory, setLocalCategory] = useState(search.category || '')
  const [localProgressRange, setLocalProgressRange] = useState<[number, number]>([
    search.progressMin ?? 0,
    search.progressMax ?? 100,
  ])

  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>(() => {
    const from = search.updatedFrom ? dayjs(search.updatedFrom) : null
    const to = search.updatedTo ? dayjs(search.updatedTo) : null
    return [from, to]
  })

  useEffect(() => {
    const from = search.updatedFrom ? dayjs(search.updatedFrom) : null
    const to = search.updatedTo ? dayjs(search.updatedTo) : null
    setDateRange([from, to])
  }, [search.updatedFrom, search.updatedTo])

  useEffect(() => {
    setLocalProgressRange([
      search.progressMin ?? 0,
      search.progressMax ?? 100,
    ])
  }, [search.progressMin, search.progressMax])

  const handleDateRangeChange = (newValue: [Dayjs | null, Dayjs | null] | null) => {
    if (newValue) {
      setDateRange(newValue)
    } else {
      setDateRange([null, null])
    }
  }

  const handleReset = () => {
    setSearch({
      search: '',
      category: null,
    
      updatedFrom: null,
      updatedTo: null,
      progressMin: null,
      progressMax: null,
      page: '1',
    })
    setLocalSearch('')
    setLocalCategory('')
    setDateRange([null, null])
    setLocalProgressRange([0, 100])
  }

  const handleApplyFilters = () => {
    setSearch({
      search: localSearch || '',
      category: localCategory ? localCategory : null,
      updatedFrom: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : null,
      updatedTo: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : null,
      progressMin: localProgressRange[0] !== 0 ? localProgressRange[0] : null,
      progressMax: localProgressRange[1] !== 100 ? localProgressRange[1] : null,
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
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
          <DateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            disableFuture
            format='DD/MM/YYYY'
            slotProps={{
              textField: {
                size: 'small',
                sx: {
                  minWidth: { xs: '100%', sm: 360 },
                  '& .MuiInputBase-root': {
                    backgroundColor: 'red',
                  },
                },
              },
            }}
          />
        </Stack>

        <Box>

          <Slider
            color='success'
            value={localProgressRange}
            onChange={(_, newValue) => setLocalProgressRange(newValue as [number, number])}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value}%`}
            min={0}
            max={100}
            step={10}
          />
          <Typography variant="body2" gutterBottom color='text.secondary'>
            Progress
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleReset}
            sx={{
              minWidth: 120,
              height: '40px',
              backgroundColor: 'var(--color-border)',
              color: 'var(--color-fg)',
              '&:hover': {
                backgroundColor: 'var(--color-border)',
                opacity: 0.8,
              },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            sx={{
              minWidth: 120,
              height: '40px',
              backgroundColor: 'var(--color-border)',
              color: 'var(--color-fg)',
              '&:hover': {
                backgroundColor: 'var(--color-border)',
                opacity: 0.8,
              },
            }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default AchievementToolbar
