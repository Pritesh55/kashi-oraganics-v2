// src\app\components\client\product\Form_field_text.jsx
import React from 'react'

const Form_field_number = (props) => {

    var props_type = (props.type == undefined) ? 'text' : props.type;

    // Step 04 :: pass :: the value you got from the input :: to the parent's method
    const change_handler = (e) => {
        props.handler_name(e.target.value);
    }

    return (
        <>

            {/* 01 :: */}
            <div className="flex flex-col gap-2">
                {/* Label :: htmlFor */}
                <label htmlFor={`${props.state_var}`} className="label-s1 text-black">
                    {props.label_name}
                    {/* label_name */}
                </label>

                {/* input :: 1-type, 2-placeholder_name ,
                3.1--id, 3.2--name, 3.3-value,
                4- onChange :: function Name, 
                 */}

                {(props.max !== undefined) ? <>
                    <input type={`${props_type}`}
                        id={`${props.state_var}`}
                        name={`${props.state_var}`}
                        placeholder={`${props.placeholder_name}`}
                        max={props.max_digits}
                        // ------------------------------------
                        value={
                            (props.state_var == 'undefined')
                                ? props.any
                                : props.state_var
                        }
                        onChange={change_handler}
                        // ------------------------------------
                        className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7" />

                </> : <>

                    <input type={`${props_type}`}
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
                        className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7" />
                </>
                }












            </div>
        </>
    )
}

export default Form_field_number


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