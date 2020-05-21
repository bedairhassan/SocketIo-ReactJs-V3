import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
export default function RadioButton({ onClick, items, groupName }) {

    return (
        <React.Fragment >
            <form 
            onClick={(e) => onClick(e.target.value)} > 

                {
                    items.map(item => <React.Fragment>
                        <input 
                        name={groupName} 
                        type="radio" 
                        value={item} /> {item}</React.Fragment>)
                }

            </form>
        </React.Fragment>
    );
}