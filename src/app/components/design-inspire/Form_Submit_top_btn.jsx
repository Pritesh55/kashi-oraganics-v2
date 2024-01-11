import React from 'react'

const Form_Submit_top_btn = () => {
    return (
        <button
            onClick={() => {
                setUserChange(true);
                // set UserChange to Rerun UseEffect...

                setCre_pt_btn(true);
                // set Cre_pt_btn to display that "The "Submit" info "operation" is started..."


                // console.log("   Save and Update");
                // console.log("Cre_pt_btn", cre_pt_btn);
                // console.log("userChange", userChange);
            }}
            className="w-auto px-6 text-lg leading-6 py-3 bg-yellow-300 text-black font-medium rounded-lg">
            Create Product
            {/* Name of the Submit Button */}
        </button>
    )
}

export default Form_Submit_top_btn