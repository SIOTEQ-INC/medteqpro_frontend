/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";

type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: any;
  containerClass?: string;
  error?: string;
  helperText?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  rows?: number;
};

export const TextArea = (props: TextAreaProps) => {
  return (
    <div
      className={`flex flex-col font-medium w-full relative ${
        props.containerClass ?? ""
      }`}
    >
      <Label className="text-sm whitespace-nowrap text-stone-900">
        {props.label}
      </Label>
      <div className="flex items-center bg-white rounded-lg border border-solid border-stone-300 py-1 mt-2 px-3 gap-1">
        <span>{props.startAdornment}</span>
        <Textarea
          {...props}
          className="w-full text-sm leading-5 border-0 text-stone-900 !focus-visible:ring-0 !ring-0 !focus:border-0 !focus:outline-none px-0 placeholder:text-xs placeholder:text-gray-300 flex-1 focus-visible:ring-offset-0"
        />
        <span>{props.endAdornment}</span>
      </div>
      {props.error ? (
        <span className="text-xs text-red-500 mt-1">{props.error}</span>
      ) : props.helperText ? (
        <span className="text-xs text-gray-500 mt-1">{props.helperText}</span>
      ) : null}
    </div>
  );
};
