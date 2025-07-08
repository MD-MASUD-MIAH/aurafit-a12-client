






























import React from 'react';

const Loader = () => {
    return (
 <div>
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="h-8 w-8 bg-white rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
        </div>
    );
};

export default Loader;