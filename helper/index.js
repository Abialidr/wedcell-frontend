export function extractYouTubeId(url) {
  // Regular expression to match the video ID in the URL
  const pattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(pattern);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}
