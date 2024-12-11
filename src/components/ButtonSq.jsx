import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function ButtonSq({
  className,
  label,
  iconStyle,
  iconDiv,
  to,
  ...props
}) {
  return (
    <Link to={to || '#'}>
    <Button
      className={` rounded-none px-6 py-3 text-lg cursor-pointer font-semibold ${className}`}
      {...props}
    >
      {label}
      <div className={`ml-4 p-2 -mr-6 -my-3 ${iconDiv}`}>
        <ArrowRight className={`h-5 w-6 ${iconStyle}`} />
      </div>
      </Button>
    </Link>
  );
}
