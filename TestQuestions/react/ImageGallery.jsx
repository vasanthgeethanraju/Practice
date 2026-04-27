import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const ImageGallery = ({ links }) => {
  const [images, setImages] = useState(links);

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      {images.map((link, index) => (
        <div className="image" key={link}>
          <img src={link} />
          <button className="remove" onClick={() => removeImage(index)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

document.body.innerHTML = "<div id='root'> </div>";

const rootElement = document.getElementById("root");
const links = ["https://tinyurl.com/im-gal-1st", "https://tinyurl.com/im-gal-2nd"];
const root = createRoot(rootElement);
root.render(<ImageGallery links={links} />);

setTimeout(() => {
  document.querySelectorAll('.remove')[0]?.click();
  setTimeout(() => {
    console.log(rootElement?.innerHTML);
  });
});