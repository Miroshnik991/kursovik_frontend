import React, { useState } from 'react';
import ClaimCard from '../ClaimCard/ClaimCard';


const mainPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  gap: '50px',
  flexWrap: 'wrap',
  alignItems: 'center',
};

function ClaimsPage({flag, claims, setUpdateState}) {
  return (
    <>
      <div style={mainPageStyle}>
		{claims.map((claim) => <ClaimCard claim={claim} flag={flag} setUpdateState={setUpdateState} />)}
      </div>
    </>
  );
}

export default React.memo(ClaimsPage);