/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const YouTubeEmbed = ({ videoId }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("youtube-player", {
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    return () => {
      tag.parentNode.removeChild(tag);
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videoId]);

  const onPlayerReady = () => {
    setIsReady(true);
  };

  return (
    <div>
      {!isReady && <p>Loading video...</p>}
      <div id="youtube-player"></div>
    </div>
  );
};

export default YouTubeEmbed;
