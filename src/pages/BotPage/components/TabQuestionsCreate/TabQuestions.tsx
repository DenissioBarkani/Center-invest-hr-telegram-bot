import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Question } from './Question.tsx';

interface QuestionType {
  id: number;
  text: string;
  answers: string[];
}

interface FormValues {
  questionText: string;
  answers: { value: string }[];
}

const mockQuestions: QuestionType[] = [
  {
    id: 1,
    text: 'Как вас зовут?',
    answers: ['Иван', 'Петр', 'Мария'],
  },
  {
    id: 2,
    text: 'Сколько вам лет?',
    answers: ['До 18', '18-25', '26-35', 'Старше 35'],
  },
];

const TabQuestions = () => {
  const [dataQuestions, setQuestions] =
    useState<QuestionType[]>(mockQuestions);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [update, setUpdate] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      questionText: '',
      answers: [{ value: '' }, { value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://6842d197e1347494c31e0af7.mockapi.io/bots/botinfo'
      );
      console.log(response);
      // if (response.status < 200 || response.status >= 300) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // setBotInfo(response.data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Server error:', error.response.status);
        } else if (error.request) {
          console.error('Network error:', error.message);
        } else {
          console.error('Request error:', error.message);
        }
      } else {
        console.error(
          `Произошла ошибка: ${error instanceof Error
            ? error.message
            : 'Неизвестная ошибка'
          }`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  const onSubmit = (data: FormValues) => {
    if (data.answers.some((a) => !a.value.trim())) {
      alert('Все ответы должны быть заполнены!');
      return;
    }

    const newQuestion: QuestionType = {
      id: Date.now(),
      text: data.questionText.trim(),
      answers: data.answers.map((a) => a.value.trim()),
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    reset();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Управление вопросами
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mb: 4 }}
      >
        <TextField
          label="Текст вопроса"
          fullWidth
          {...register('questionText', {
            required: 'Введите текст вопроса',
          })}
          error={!!errors.questionText}
          helperText={errors.questionText?.message}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1" gutterBottom>
          Варианты ответов:
        </Typography>

        {fields.map((field, index) => (
          <Box
            key={field.id}
            display="flex"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <TextField
              fullWidth
              {...register(`answers.${index}.value`, {
                required: 'Обязательное поле',
              })}
              error={!!errors.answers?.[index]?.value}
              helperText={errors.answers?.[index]?.value?.message}
              sx={{ mr: index > 1 ? 1 : '72px' }}
            />
            {index > 1 && (
              <IconButton
                sx={{ mr: 3 }}
                onClick={() => remove(index)}
              >
                <Delete color="error" />
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          startIcon={<Add />}
          onClick={() => append({ value: '' })}
          sx={{ mr: 2 }}
          type="button"
        >
          Добавить вариант
        </Button>

        <Button variant="contained" type="submit" disabled={!isValid}>
          Создать вопрос
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography gutterBottom variant="h5">
        Созданные вопросы:
      </Typography>
      <List>
        {isLoading && (
          <Box sx={{ p: 2 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        {!isLoading && (!dataQuestions || dataQuestions.length === 0) && (
          <Box sx={{ p: 2 }}>Нет вопросов</Box>
        )}
        {!isLoading && dataQuestions?.length > 0 && dataQuestions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </List>
    </Paper>
  );
};

export default TabQuestions;
