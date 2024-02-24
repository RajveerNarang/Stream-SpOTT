import React from "react";

const ContentItem = ({ source }) => {
  const handleContentClick = () => {
    if (source.type === "video") {
      console.log(`Now playing video: ${source.title}`);
      // Implement video player functionality here
    } else if (source.type === "image") {
      console.log(`Viewing image: ${source.title}`);
      // Implement image display or navigation here
    }
  };

  return (
    <div className="content-item" onClick={handleContentClick}>
      {source.type === "video" ? (
        <video src={source.source} alt={source.title} controls />
      ) : (
        <img src={source.source} alt={source.title} />
      )}
      <h3>{source.title}</h3>
    </div>
  );
};

export default ContentItem;
