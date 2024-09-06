/* eslint-disable react/prop-types */
import { Textarea } from '@/components/ui/textarea'

function TextAreaField({ item, handleInputChange ,carInfo }) {
  return (
    <div>
      <Textarea
        name={item?.name}
        required={item?.required}
        defaultValue={carInfo?.[item?.name]}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
      />
    </div>
  )
}

export default TextAreaField
