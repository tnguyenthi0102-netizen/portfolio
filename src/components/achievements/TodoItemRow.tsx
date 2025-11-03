import { Checkbox, TextField, IconButton, Box, MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Controller, type Control, type UseFormRegister, type FieldErrors } from 'react-hook-form'
import type { TodoItem } from '@/data/achievement'
import type { AchievementFormData } from '@/utils/achievement'

interface TodoItemRowControlledProps {
  todo: TodoItem
  onToggle: (todoId: number) => void
  onTitleChange: (todoId: number, title: string) => void
  onRemove: (todoId: number) => void
  variant?: 'menu' | 'form'
  mode: 'controlled'
  error?: string
}

interface TodoItemRowFormProps {
  index: number
  control: Control<AchievementFormData>
  register: UseFormRegister<AchievementFormData>
  errors: FieldErrors<AchievementFormData>
  onRemove: () => void
  variant?: 'menu' | 'form'
  mode: 'form'
}

type TodoItemRowProps = TodoItemRowControlledProps | TodoItemRowFormProps

function TodoItemRow(props: TodoItemRowProps) {
  const variant = props.variant || 'form'
  const isMenuVariant = variant === 'menu'

  if (props.mode === 'controlled') {
    const { todo, onToggle, onTitleChange, onRemove, error } = props

    const content = (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
        <Checkbox
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          size="small"
          color="success"
        />
        <TextField
          size="small"
          value={todo.title}
          onChange={(e) => onTitleChange(todo.id, e.target.value)}
          placeholder="Todo title"
          fullWidth
          error={!!error}
          helperText={error}
          onClick={(e) => e.stopPropagation()}
        />
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(todo.id)
          }}
        >
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </Box>
    )

    if (isMenuVariant) {
      return (
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', p: 1 }}>
          {content}
        </MenuItem>
      )
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 1,
          bgcolor: 'action.hover',
          p: 1,
          borderRadius: 1,
        }}
      >
        {content}
      </Box>
    )
  }

  const { index, control, register, errors, onRemove } = props

  const errorMessage = errors.todos?.[index]?.title?.message
  const hasError = !!errorMessage

  const content = (
    <Box sx={{ position: 'relative', width: '100%',}}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          width: '100%',
        }}
      >
        <Controller
          name={`todos.${index}.done`}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              color="success"
            />
          )}
        />
        <TextField
          {...register(`todos.${index}.title` as const)}
          placeholder={`Todo #${index + 1}`}
          size="small"
          fullWidth
          sx={{ flex: 1, minWidth: 0 }}
          error={hasError}
          helperText=""
          FormHelperTextProps={{ sx: { display: 'none', margin: 0 } }}
          onClick={(e) => e.stopPropagation()}
        />
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
      
    </Box>
  )

  if (isMenuVariant) {
    return (
      <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', p: 1 }}>
        {content}
      </MenuItem>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 1,
        bgcolor: 'action.hover',
        p: 1,
        borderRadius: 1,
        width: '100%',
      }}
    >
      {content}
    </Box>
  )
}

export default TodoItemRow
