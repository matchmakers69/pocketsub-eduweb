import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TextAreaProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  cols?: number;
};

const TextArea = <T extends Record<string, unknown>>({
  register,
  name,
  required = false,
  placeholder = "",
  cols = 10,
  rows = 4,
  ...rest
}: TextAreaProps<T>) => {
  return (
    <textarea
      className="w-full  rounded-md border border-zinc-400 bg-zinc-100 p-2 text-sm font-light text-zinc-800 outline-none placeholder:text-zinc-400  focus:ring-1 focus:ring-inset focus:ring-zinc-800"
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      {...register(name, { required })}
      {...rest}
    ></textarea>
  );
};

export default TextArea;
