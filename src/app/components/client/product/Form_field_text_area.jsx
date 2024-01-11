// src\app\components\client\product\Form_field_text.jsx
import React from 'react'

const Form_field_text_area = (props) => {

    // Step 04 :: pass :: the value you got from the input :: to the parent's method
    const change_handler = (e) => {
        props.handler_name(e.target.value);
    }

    return (
        <>

            <div className="flex flex-col gap-2 w-full">
                {/* Label :: htmlFor */}
                <label htmlFor={`${props.state_var}`} className="label-s1">
                    {props.label_name}
                </label>

                {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                <textarea rows={1}
                    id={`${props.state_var}`}
                    name={`${props.state_var}`}
                    placeholder={`${props.placeholder_name}`}
                    // ------------------------------------
                    value={
                        (props.state_var == 'undefined')
                            ? props.any
                            : props.state_var
                    }
                    onChange={change_handler}
                    // ------------------------------------
                    className="w-full bg-white rounded-md border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7    shadow-sm  min-w-full min-h-[124px]"
                />

            </div>
        </>
    )
}

export default Form_field_text_area


// Usage Example ::
// ----------------------

// src\app\components\client\product\cre_pt_form.jsx
// --------------------------------------------------
// 01) Example 01 :: 
// ----------------------
{/* 
<Form_field_text
    state_var={pt_title3}
    handler_name={pt_title_Handler3}
    label_name={`Product stock`}
    placeholder_name={`type stock`}
/> 
*/}
// ----------------------