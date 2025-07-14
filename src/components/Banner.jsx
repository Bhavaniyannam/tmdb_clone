import React from 'react';

function Banner() {
  return (
    <div
      className="h-[20vh] md:h-[85vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: "url('https://musicart.xboxlive.com/7/5abd4c00-0000-0000-0000-000000000002/504/image.jpg')"
      }}
    >
      <div className="text-white text-xl text-center bg-gray-900/60 w-full p-4">The Avengers</div>
    </div>
  );
}

export default Banner;
