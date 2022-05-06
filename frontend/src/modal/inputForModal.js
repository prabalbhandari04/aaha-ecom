export default function InputFields(props){
    return(
        <div>
            {/* First Name */}
            <label htmlFor="price" className="block text-sm font-medium text-sub mt-5">
                {props.label}
            </label>
            <div className="mt-2 relative rounded shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                </div>
                <input
                type={props.type}
                name={props.name}
                id={props.name}
                className="focus:ring-neutral focus:border-neutral bg-secondary text-disable block w-full px-5 py-2 sm:text-xs border-neutral rounded"
                placeholder={props.placeholder}
                />
            </div>
        </div>
    );
}