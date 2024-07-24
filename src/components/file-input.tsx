import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFile(props: InputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" {...props} />
    </div>
  );
}
