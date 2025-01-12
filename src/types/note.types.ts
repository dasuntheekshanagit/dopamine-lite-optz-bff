import { Lesson, Month } from "./lecture.types";

export interface INote {
  noteId: number;
  title: string;
  description?: string;
  date: Date;
  file: string;
  uploadedAt: Date;
  accessGroupId: string;
  belongingMonth: Month;
  belongingLesson: Lesson;
  classId: number;
  access?: boolean;
  handler?: string;
}

export type CreateNoteDTO = Omit<INote, 'NoteId' | 'uploadedAt'>;
export type UpdateNoteDTO = Partial<INote>;