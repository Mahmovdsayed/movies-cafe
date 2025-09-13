'use client'

import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { Input } from "@heroui/react";
import { useState } from "react";

interface IProps {
    placeholder: string
    name: string
    value: string
    description?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}
const FormInputPassword = ({ placeholder, onBlur, onChange, value, name, description }: IProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return <>
        <Input
            onBlur={onBlur}
            name={name}
            variant="faded"
            color="default"
            value={value}
            placeholder={placeholder}
            label="Password"
            labelPlacement="outside"
            className="mb-1"
            isRequired
            radius="md"
            size="md"
            description={description}
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon />
                    ) : (
                        <EyeFilledIcon />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
            onChange={onChange}
        />
    </>;
};

export default FormInputPassword;