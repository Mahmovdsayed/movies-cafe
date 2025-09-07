import { Textarea } from "@heroui/react";

interface IProps {
    name: string
    description?: string
    label: string
    value: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    isRequired?: boolean
}
const FormTextArea = ({ isRequired, name, description, label, placeholder, onChange, onBlur, value }: IProps) => {
    return <>

        <Textarea
            isRequired={isRequired}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            isClearable
            onClear={() => onChange({ target: { name, value: "" } } as React.ChangeEvent<HTMLInputElement>)}
            variant="faded"
            color="default"
            labelPlacement="inside"
            radius="md"
            className="mb-1 w-full"
            size="sm"
            description={description}
            label={label}
            placeholder={placeholder}
        />
    </>;
};

export default FormTextArea;