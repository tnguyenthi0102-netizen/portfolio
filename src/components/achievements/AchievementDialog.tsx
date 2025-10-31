import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from '@mui/material'
import { achievementSchema, type AchievementFormData } from '@/lib/validation/achievement'
import { createAchievement, updateAchievement } from '@/lib/api/achievements'
import { toast } from 'sonner'
import { ACHIEVEMENT_CATEGORIES, ACHIEVEMENT_STATUSES } from '@/data/achievement-constants'
import type { Achievement } from '@/data/achievement'

interface AchievementDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  achievement?: Achievement | null
}

function AchievementDialog({ open, onClose, onSuccess, achievement }: AchievementDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      status: '',
      score: 0,
    },
  })

  useEffect(() => {
    if (achievement) {
      reset({
        title: achievement.title,
        description: achievement.description,
        category: achievement.category,
        status: achievement.status,
        score: achievement.score,
      })
    } else {
      reset({
        title: '',
        description: '',
        category: '',
        status: '',
        score: 0,
      })
    }
  }, [achievement, reset, open])

  const onSubmit = async (data: AchievementFormData) => {
    try {
      if (achievement) {
        await updateAchievement(achievement.id, data)
        toast.success('Achievement updated successfully')
      } else {
        await createAchievement(data)
        toast.success('Achievement created successfully')
      }
      onSuccess()
      onClose()
      reset()
    } catch (error) {
      toast.error(achievement ? 'Failed to update achievement' : 'Failed to create achievement')
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{achievement ? 'Edit Achievement' : 'Create Achievement'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              {...register('title')}
              label="Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              {...register('description')}
              label="Description"
              fullWidth
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Category">
                    {ACHIEVEMENT_CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.category && (
                <Alert severity="error" sx={{ mt: 0.5 }}>
                  {errors.category.message}
                </Alert>
              )}
            </FormControl>
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Status">
                    {ACHIEVEMENT_STATUSES.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.status && (
                <Alert severity="error" sx={{ mt: 0.5 }}>
                  {errors.status.message}
                </Alert>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : achievement ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AchievementDialog
