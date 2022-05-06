export default function InputProducts(props){
    return(
        <div>
            {/* First Name */}
            <div className="mt-8 relative rounded shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                </div>
                <input
                type={props.type}
                name={props.name}
                id={props.name}
                className="focus:ring-neutral focus:border-neutral bg-primary text-secondary block w-full p-3 sm:text-xs border-neutral rounded"
                placeholder={props.placeholder}
                value={props.value}
                  onChange = {props.onChange} />
            </div>
        </div>
    );
}