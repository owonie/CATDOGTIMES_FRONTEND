import React, { useState } from "react";

function ShareButton() {
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
    <button disabled={isSharing} onClick={handleClick}>
      공유하기
    </button>
  );
}

export default ShareButton;
