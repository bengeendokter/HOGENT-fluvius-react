import {useFormContext} from "react-hook-form";

const LabelInput = ({name, label, type, defaultValue, validation, ...rest}) =>
{
  const {register, formState: {errors}} = useFormContext();
  return (
    <>
      {/* // <div className="col-span-6 sm:col-span-3 p-2"> */}
      <label className="text-[#055063]" htmlFor={label}>{label}</label>
      <input className="border-2 border-grey p-2"
        {...register(name, validation)}
        defaultValue={defaultValue}
        placeholder={label}
        type={type}
        name={name}
        {...rest}
      />
      {errors[name] && (
        <p data-cy="labelinput-error" className="text-red-500">
          {errors[name].message}
        </p>
      )}
    </>
  );
};

export default LabelInput;