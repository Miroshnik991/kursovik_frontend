import React from "react";
import FormPropsTextFields from "../TextFieeld/TextFieeld";
import ClaimForm from "../ClaimForm/ClaimForm";



function CreateClaim({setUpdateState}) {
	
	return (
		<>
			{/* <FormPropsTextFields /> */}
			<ClaimForm setUpdateState={setUpdateState} />
		</>
		);
}

export default React.memo(CreateClaim);