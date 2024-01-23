import { object, string } from "yup";

export interface TodoType {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

export interface TodoInput {
  title: string;
  content: string;
}

export const validationSchema = object().shape({
  title: string().required("Title is required"),
  content: string(),
});
