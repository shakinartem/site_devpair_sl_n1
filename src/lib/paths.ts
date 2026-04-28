export const publicImage = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

export const sitePath = (path = '') => {
  const normalized = path.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
};
