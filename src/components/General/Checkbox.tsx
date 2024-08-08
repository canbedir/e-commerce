import { FieldValues, UseFormRegister } from "react-hook-form"

interface CheckboxProps {
    id: string
    register: UseFormRegister<FieldValues>
    label: string
}
const CheckboxComponent:React.FC<CheckboxProps> = ({id, register, label}) => {
  return (
    <div className="flex items-center gap-2 my-3">
       <input type="checkbox" {...register(id)}  />
       <label className="text-sm text-white/90" htmlFor={id}>{label}</label>
    </div>
    
  )
}
export default CheckboxComponent