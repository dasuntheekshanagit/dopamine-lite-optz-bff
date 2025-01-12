export enum Month {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
}

export enum Lesson {
  lesson1 = 'සෛල ජීව විද්‍යාව',
  lesson2 = 'ජාන විද්‍යාව',
  lesson3 = 'විකාසය',
  lesson4 = 'පරිසර විද්‍යාව',
  lesson5 = 'මානව ශරීර විද්‍යාව',
  lesson6 = 'ශාක ශරීර විද්‍යාව',
  lesson7 = 'ක්ෂුද්‍රජීව විද්‍යාව',
  lesson8 = 'ජීව රසායන විද්‍යාව',
  lesson9 = 'අණුක ජීව විද්‍යාව',
  lesson10 = 'ප්‍රතිශක්ති විද්‍යාව',
  lesson11 = 'ජීව තාක්ෂණ විද්‍යාව',
  lesson12 = 'සත්ත්ව විද්‍යාව',
  lesson13 = 'ශාක විද්‍යාව'

}

export interface ILecture {
  lectureId: number;
  classId: number;
  title: string;
  description?: string;
  date: Date;
  handler: string;
  uploadedAt: Date;
  accessGroupId: string;
  belongingMonth: Month;
  belongingLesson: Lesson;
  duration: number;
  access?: boolean;
  file?: string;
}

export type CreateLectureDTO = Omit<ILecture, 'lectureId' | 'uploadedAt'>;
export type UpdateLectureDTO = Partial<ILecture>;