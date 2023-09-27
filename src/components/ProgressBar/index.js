import React, { useEffect } from "react";

const ProgressBar = ({idQuestion,maxQuestion}) => {
  const getWidht = (totalQuestion,questionId)=>{
    return (100/totalQuestion)*questionId;
  }
  const actualQuestion = idQuestion +1;
  const progressPercent = getWidht(maxQuestion,actualQuestion);

  return (
    <>
      <div className="percentage">
        <div className="progressPercent">Question: {actualQuestion}/{maxQuestion}</div>
        <div className="progressPercent">Progression: {progressPercent}%</div>
      </div>
      <div className="progressBar">
        <div className="progressBarChange" style={{ width: `${progressPercent}%`}}></div>
      </div>
    </>
  );
};

export default React.memo(ProgressBar);
