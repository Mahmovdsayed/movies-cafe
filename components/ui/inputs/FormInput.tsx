'use client'
import { Input } from "@heroui/react";
import { useRef } from "react";

interface IProps {
    type: string;
    name: string;
    placeholder: string;
    accept?: boolean;
    value?: string;
    label: string;
    description?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    isRequired?: boolean;
    size?: "md" | "sm" | "lg";
    defaultValue?: string;
    variant?: "flat" | "underlined" | "faded" | "bordered"
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    startContent?: React.ReactNode
    isDisabled?: boolean
}

const FormInput = ({ onChange, isDisabled, startContent, onKeyDown, onBlur, type, name, placeholder, label, description, value, accept, isRequired = true, size = "md", defaultValue, variant = "faded" }: IProps) => {

    const inputRef = useRef<HTMLInputElement>(null)

    return <>
        <Input
            ref={inputRef}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            type={type}
            name={name}
            variant={variant}
            className="ios-no-zoom w-full mb-1"
            color="default"
            placeholder={placeholder}
            startContent={startContent}
            accept={accept ? "image/* " : ""}
            label={label}
            labelPlacement="outside"
            isRequired={isRequired}
            radius="md"
            isClearable
            onClear={() => {
                if (onChange) {
                    onChange({
                        target: { name, value: "" },
                    } as React.ChangeEvent<HTMLInputElement>);
                }
            }}
            size={size}
            defaultValue={defaultValue}
            onKeyDown={onKeyDown}
            description={description}
            isDisabled={isDisabled}
            style={{
                touchAction: 'manipulation'
            }}
        />

    </>

};

export default FormInput;