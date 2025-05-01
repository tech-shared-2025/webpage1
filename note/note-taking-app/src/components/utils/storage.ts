import { Note } from '../models/Note';

const STORAGE_KEY = 'notes_app_data';

export const saveNotes = (notes: Note[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const getNotes = (): Note[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    const parsedData = JSON.parse(data);
    // Convert string dates back to Date objects
    return parsedData.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt)
    }));
  } catch (error) {
    console.error('Error parsing notes data', error);
    return [];
  }
};