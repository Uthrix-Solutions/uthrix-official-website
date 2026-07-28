import { ThemeToggle } from './ThemeToggle';

export function FloatingThemeToggle() {
  return (
    <div className="fixed bottom-20 left-4 md:top-4 md:right-6 md:bottom-auto md:left-auto z-40">
      <ThemeToggle />
    </div>
  );
}