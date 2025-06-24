export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const isAnchorLink = (path: string): boolean => {
  return path.startsWith('/#');
};
