import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast p-4 rounded-lg shadow-lg border",
          description: "text-gray-200",
          actionButton: "bg-primary text-white px-4 py-2 rounded",
          cancelButton: "bg-muted text-gray-700 px-3 py-1 rounded",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };