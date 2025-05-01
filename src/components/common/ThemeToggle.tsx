import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useAppStore } from '@/stores/appStore';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
      className="rounded-full h-9 w-9"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] text-amber-500" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] text-indigo-700" />
      )}
    </Button>
  );
};

export default ThemeToggle;
