import { cn } from "@/lib/utils";

const Flex = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Flex;
