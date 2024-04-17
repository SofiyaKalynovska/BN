interface FormFieldProps {
    label: string;
    htmlFor: string;
    type: string;
    placeholder: string;
    register: any;
    error: any;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    htmlFor,
    type,
    placeholder,
    register,
    error,
}) => (
    <div className="mb-6">
        <label htmlFor={htmlFor} className="flex mb-2">
            {label}
            <span className="text-red-500">*</span>
        </label>
        <input
            type={type}
            id={htmlFor}
            placeholder={placeholder}
            className="w-full px-4 py-2 border rounded-2xl border-slate500 focus:outline-none focus:border-blue500"
            {...register(htmlFor)}
        />
        {error && <p className="text-red-600 mt-1 text-sm text-left">{error.message}</p>}
    </div>
);

export default FormField;
