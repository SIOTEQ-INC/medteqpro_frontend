/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterOptions } from "react-hook-form";

export type TextSelectProps = {
  name: string;
  label?: string | any;
  containerClass?: string;
  error?: string;
  helperText?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  onChange?: RegisterOptions["onChange"];
  value: RegisterOptions["value"];
  disabled?: boolean;
};

export const TextSelect = ({ label, ...rest }: TextSelectProps) => {
  return (
    <div className={rest?.containerClass ?? ""}>
      <Label
        htmlFor={typeof label === "string" ? label : ""}
        className="mb-2 block text-sm text-stone-900"
      >
        {label}
      </Label>

      <Select
        defaultValue={rest.value}
        onValueChange={(value) =>
          rest?.onChange?.({ target: { name: rest.name ?? "", value } })
        }
        disabled={rest.disabled}
      >
        <SelectTrigger className="w-full bg-white 1text-xs !text-stone-600 !h-12">
          <SelectValue
            className="!text-xs !text-gray-300 "
            placeholder={rest?.placeholder}
          />
        </SelectTrigger>
        <SelectContent>
          {rest?.options?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {rest.error ? (
        <span className="text-xs text-red-500 mt-1">{rest.error}</span>
      ) : rest.helperText ? (
        <span className="text-xs text-gray-500 mt-1">{rest.helperText}</span>
      ) : null}
    </div>
  );
};
