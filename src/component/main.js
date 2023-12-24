import React from "react";

import { useState } from "react";
import usePasswordGenerator from '../component/password-generator.js'


const Hello =()=>{
    const [length, setLength] = useState(4);
    
    const [copied, setCopied] = useState(false);

    const [checkboxData, setCheckboxData] = useState(
        [
        { title: "Include Uppercase Letters", state: false },
        { title: "Include Lowercase Letters", state: false },
        { title: "Include Numbers", state: false },
        { title: "Include Symbols", state: false }
      ]);

      const handleCheckboxChange = (i) => {
        const updatedCheckboxData = [...checkboxData];
        updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
        setCheckboxData(updatedCheckboxData);
      };

      const handleCopy = () => {
          navigator.clipboard.writeText(password);
          setCopied(true);
          
          setTimeout(() => {
              setCopied(false);
        }, 1500);
      };

      const { password, errorMessage, generatePassword } = usePasswordGenerator();
    return(
        <>
        <div className="container">

           { password && <div className="pass-show">
                <h3>{password}</h3>
                <button  onClick={handleCopy}>{copied ? "Copied" : "copy"}</button>
            </div>}


            <div className="char-len">
                <p>Character Length</p>
                <p>{length}</p>
            </div>


            <div className="range-slider">
                <input 
                type="range" 
                min={4}
                max={100} 
                value={length} 
                onChange={(e)=> setLength(e.target.value)}
                />
            </div>


            <div className="check-box">
                
            {checkboxData.map((checkbox, index) => {
                    return (
                        <div key={index} className="inp-lab">
                            <input type="checkbox"   onChange={()=>handleCheckboxChange(index)} checked={checkbox.state} />
                            <label>{checkbox.title}</label>
                        </div>
                    );
            })};


            </div>
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}

            <div className="gen-but">
                <button onClick={()=>generatePassword(checkboxData,length)}>Generate Password</button>
            </div>

        </div>
        </>
    );
}
export default Hello;
