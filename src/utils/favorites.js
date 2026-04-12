const KEY_NOTES = "pwm_fav_notes_v1";
const KEY_COURSES = "pwm_fav_courses_v1";

const safeParse = (raw, fallback) => {
  try {
    return JSON.parse(raw) ?? fallback;
  } catch {
    return fallback;
  }
};

const readIds = (key) => {
  const raw = localStorage.getItem(key);
  const arr = safeParse(raw, []);
  if (!Array.isArray(arr)) return new Set();
  return new Set(arr.map(String));
};

const writeIds = (key, set) => {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
};

export const getFavoriteNotesSet = () => readIds(KEY_NOTES);
export const getFavoriteCoursesSet = () => readIds(KEY_COURSES);

export const toggleFavoriteNote = (noteId) => {
  const set = readIds(KEY_NOTES);
  const id = String(noteId);
  if (set.has(id)) set.delete(id);
  else set.add(id);
  writeIds(KEY_NOTES, set);
  return set;
};

export const toggleFavoriteCourse = (courseId) => {
  const set = readIds(KEY_COURSES);
  const id = String(courseId);
  if (set.has(id)) set.delete(id);
  else set.add(id);
  writeIds(KEY_COURSES, set);
  return set;
};

