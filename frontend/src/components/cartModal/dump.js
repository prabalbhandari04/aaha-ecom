import './App.css';
import Give from './assets/Images/giveaway.jpg';

function Dump() {
  return (
    <div className="p-0 max-w-md mx-auto bg-white flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img className="h-24 w-24 rounded-xl" src={Give} alt="ChitChat Logo" />
      </div>
      <div>
        <div className="text-l font-medium text-black">Gaming Mouse GM-5319 Prime Edition</div>
        <div className="flex space-x-4">
          <div className="flex space-x-1">
            <p className="text-gray-500">Quantity</p>
            <div className="px-1.5 w-6 bg-black rounded text-white text-sm flex justify-center">-</div>
            <p>1</p>
            <div className="px-1.5 w-6 bg-black rounded text-white text-sm justify-center">+</div>
          </div>
          <p>X</p>
          <p>Rs. 1100</p>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default Dump;
