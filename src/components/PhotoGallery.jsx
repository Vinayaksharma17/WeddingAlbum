import React from "react";

const PhotoGallery = ({images}) => {
  return (
    <div>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
        <div className="-m-1 flex flex-wrap md:-m-2 justify-center">
        {images.map((image) => (
            <div
              className="w-[700px] p-1 md:p-2"
              key={image.id}
            >
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center shadow-3xl hover:scale-100 transition-transform ease-in-out duration-300"
                src={image.imgSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;


