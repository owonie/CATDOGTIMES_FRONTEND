import React, { useState } from "react";

function ShareButton2() {
  const [isSharing, setIsSharing] = useState(false);

  const handleClick = async () => {
    setIsSharing(true);
    try {
      await navigator.share({
        title: "멍냥일보",
        text: "",
        url: window.location.href,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <a href="#" disabled={isSharing} onClick={handleClick}>
      <i className="fas fa-share-alt fa-lg"></i>
    </a>
  );
}

export default ShareButton2;
