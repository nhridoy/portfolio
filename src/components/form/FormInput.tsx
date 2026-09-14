import { Input } from "@/components/ui/input";
import { FormBase, type FormControlFunc } from "./FormBase";

export const FormInput: FormControlFunc = (props) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <Input
          className="w-full rounded-none border-0 border-b border-background/25 bg-transparent px-0 py-1.5 [@media(min-width:768px)_and_(min-height:800px)]:py-3 text-base text-background placeholder:text-background/30 focus:border-background focus:outline-none focus:ring-0 transition-colors"
          {...field}
        />
      )}
    </FormBase>
  );
};
