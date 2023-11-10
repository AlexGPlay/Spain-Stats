import { cn } from "@/lib/utils";
import { Button } from "./Button";

const Link = ({ className, ...props }: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      variant="link"
      className={cn("p-0", "h-auto", className)}
      {...props}
    />
  );
};

export default Link;
