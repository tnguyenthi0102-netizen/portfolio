import { useEffect, useRef } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
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
  FormHelperText,
  IconButton,
  Typography,
  Divider,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { achievementSchema, type AchievementFormData, areValuesEqual, filterValidTodos } from '@/utils/achievement'
import { createAchievement, updateAchievement } from '@/services/achievements'
import { toast } from 'sonner'
import { ACHIEVEMENT_CATEGORIES } from '@/data/achievement-constants'
import type { Achievement } from '@/data/achievement'
import TodoItemRow from './TodoItemRow'

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
      todos: [],
    },
  })

  const initialValuesRef = useRef<AchievementFormData | null>(null)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'todos',
  })

  console.log(errors)

  useEffect(() => {
    if (achievement) {
      const initialValues: AchievementFormData = {
        title: achievement.title,
        description: achievement.description,
        category: achievement.category,
        todos: achievement.todos || [],
      }
      initialValuesRef.current = initialValues
      reset(initialValues)
    } else {
      const emptyValues: AchievementFormData = {
        title: '',
        description: '',
        category: '',
        todos: [],
      }
      initialValuesRef.current = null
      reset(emptyValues)
    }
  }, [achievement, reset, open])

  const onSubmit = async (data: AchievementFormData) => {
    try {
      if (achievement) {
        if (initialValuesRef.current && areValuesEqual(data, initialValuesRef.current)) {
          toast.info('No changes to save')
          onClose()
          return
        }
        const normalizedData = {
          title: data.title,
          description: data.description,
          category: data.category,
          todos: filterValidTodos(data.todos).map(todo => ({
            ...todo,
            id: typeof todo.id === 'number' ? todo.id : Date.now(),
          })),
        }
        await updateAchievement(achievement.id, normalizedData)
        toast.success('Achievement updated successfully')
      } else {
        const normalizedData = {
          title: data.title,
          description: data.description,
          category: data.category,
          status: 'pending',
          score: 0,
          todos: filterValidTodos(data.todos).map(todo => ({
            id: typeof todo.id === 'number' ? todo.id : Date.now(),
            title: todo.title,
            done: todo.done ?? false,
          })),
        }
        await createAchievement(normalizedData)
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
                <FormHelperText>{errors.category.message}</FormHelperText>
              )}
            </FormControl>
            <TextField
              {...register('description')}
              label="Description"
              fullWidth
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />


            <Divider sx={{ my: 2 }} />

            {/* ----- TODOS SECTION ----- */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1">Todos</Typography>
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => append({ title: '', done: false })}
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>

              {fields.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No todos added
                </Typography>
              )}

              {fields.map((field, index) => (
                <TodoItemRow
                  key={field.id}
                  mode="form"
                  index={index}
                  control={control}
                  register={register}
                  errors={errors}
                  onRemove={() => remove(index)}
                  variant="form"
                />
              ))}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: 3 }}>
          <Button onClick={onClose} variant="outlined"
            sx={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-fg)',
            }}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : achievement ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AchievementDialog
