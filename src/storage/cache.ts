export const setCache = (key: string, data: unknown) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getCache = <T>(key: string): T | null => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};

export const clearCache = () => localStorage.clear();
