import { use, useEffect, useInsertionEffect, useRef, useState } from "react";
import { checkHeading, replaceHeading } from "./helper";
const Answer = ({ ans, ind ,totalResult,type}) => {
 
 
 
    const[heading,setHeading]=useState(false);
    const[answer,setAnswer]=useState(ans);
    
 
 
 
    useEffect(() => {
   if(checkHeading(ans)){
    setHeading(true);
    setAnswer(replaceHeading(ans));
   }
  }, []);

 
  return( <> 
      {
        ind==0&& totalResult>1?<span className="pt-2 text-lg   block" >{answer} </span>:
       heading?<span className="pt-2 text-lg  block">{answer}</span>
       :<span className={type=='q'?'pl-1':'pl-5'}> {answer}</span> 
      }  
  
  
  </>)
};
export default Answer;
