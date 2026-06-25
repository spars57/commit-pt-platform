export const premiumLessonPaths = new Set([
  "/courses/introducao-programacao/variaveis",
  "/courses/introducao-programacao/funcoes",
]);

export function isPremiumRoute(pathname: string) {
  return premiumLessonPaths.has(pathname);
}
