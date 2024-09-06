/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function SelectField({ item, handleInputChange ,carInfo }) {
  return (
    <div>
      <Select
        onValueChange={(value) => handleInputChange(item.name, value)}
        required={item?.required} defaultValue={carInfo?.[item?.name]}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={carInfo?.[item?.name] ? carInfo?.[item?.name] : item?.label} />
        </SelectTrigger>
        <SelectContent>
          {item.options.map((option, index) => (
            <SelectItem value={option} key={index}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectField
