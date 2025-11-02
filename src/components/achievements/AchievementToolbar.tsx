import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs'
import { useState, useEffect, memo } from 'react'
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
  InputAdornment,
  IconButton,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs, { Dayjs } from 'dayjs'
import { ACHIEVEMENT_CATEGORIES } from '@/data/achievement-constants'

function AchievementToolbar() {
  const [filterParams, setFilterParams] = useQueryStates({
    q: parseAsString.withDefault(''),
    category: parseAsString,
    updatedFrom: parseAsString,
    updatedTo: parseAsString,
    progressMin: parseAsInteger,
    progressMax: parseAsInteger,
  })

  const search = filterParams

  const [localSearch, setLocalSearch] = useState(search.q || '')
  const [localCategory, setLocalCategory] = useState(search.category || 'all')
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
    setLocalCategory(search.category || 'all')
  }, [search.category])

  useEffect(() => {
    const from = search.updatedFrom ? dayjs(search.updatedFrom) : null
    const to = search.updatedTo ? dayjs(search.updatedTo) : null
    setDateRange([from, to])
  }, [search.updatedFrom, search.updatedTo])

  useEffect(() => {
    setLocalProgressRange([search.progressMin ?? 0, search.progressMax ?? 100])
  }, [search.progressMin, search.progressMax])

  const handleDateRangeChange = (newValue: [Dayjs | null, Dayjs | null] | null) => {
    if (newValue) {
      setDateRange(newValue)
    } else {
      setDateRange([null, null])
    }
  }

  const handleReset = () => {
    setFilterParams({
      q: '',
      category: null,
      updatedFrom: null,
      updatedTo: null,
      progressMin: null,
      progressMax: null,
    })
    setLocalSearch('')
    setLocalCategory('all')
    setDateRange([null, null])
    setLocalProgressRange([0, 100])
  }

  const handleApplyFilters = () => {
    setFilterParams({
      q: localSearch || '',
      category: localCategory && localCategory !== 'all' ? localCategory : null,
      updatedFrom: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : null,
      updatedTo: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : null,
      progressMin: localProgressRange[0] !== 0 ? localProgressRange[0] : null,
      progressMax: localProgressRange[1] !== 100 ? localProgressRange[1] : null,
    })
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search by keyword..."
            value={localSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
            size="small"
            InputProps={{
              endAdornment: localSearch ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setLocalSearch('')} edge="end" size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={localCategory || 'all'}
              label="Category"
              onChange={(e) => setLocalCategory(e.target.value as string)}
              renderValue={(value) => (value === 'all' ? 'All' : value)}
            >
              <MenuItem value="all">
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
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                size: 'small',
                sx: {
                  minWidth: { xs: '100%', sm: 360 },
                },
              },
            }}
          />
        </Stack>

        <Box sx={{ paddingTop: 5 }}>
          <Slider
            color="success"
            value={localProgressRange}
            onChange={(_, newValue) => setLocalProgressRange(newValue as [number, number])}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value}%`}
            min={0}
            max={100}
            step={10}
          />
          <Typography variant="body2" gutterBottom color="text.secondary">
            Progress
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            color="primary"
            variant="outlined"
            onClick={handleReset}
            sx={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-fg)',
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            sx={{
              backgroundColor: 'var(--color-border)',
              color: 'var(--color-fg)',
            }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default memo(AchievementToolbar)
