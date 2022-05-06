// import { faPen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Field(props){
    return(
        <div>
            {/* First Name */}
            <label htmlFor="price" className="block text-sm font-medium text-neutral mt-5">
                {props.label}
            </label>
            <div className="mt-2 relative rounded-lg shadow-sm bg-primary w-full flex justify-between">
                <p className="text-sm text-disable p-3">{props.placeholder}</p>
                    {/* <div className="p-3">
                        <FontAwesomeIcon icon={faPen} style={props.styling} color="green"/>
                    </div> */}
            </div>
        </div>
    );
}