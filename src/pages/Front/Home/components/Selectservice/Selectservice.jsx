import React from "react"
import "./Selectservice.css"

export default function Selectservice (props){

    const styles = {
        backgroundImage: `url(${props.url})`,
        opacity: props.opacity ? "0.7" : "1",
        textDecoration: "none",
        width:"23.5vw ",
    }

    return (
        <div>
            <a href="" className="cs_ss_firstService" style={styles} onMouseEnter={()=>props.serviceToggle(props.id)} onMouseLeave={()=>props.serviceToggle(props.id)}><p>{props.name}</p></a>
        </div>
    )
}
