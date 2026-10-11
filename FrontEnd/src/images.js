// Asks Cloudinary for an automatically compressed image, in the best format
// for the browser, no wider than `width` pixels.
export const optimizeImageUrl = (url, width = 600) => {
  if (!url || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/q_auto,f_auto,c_limit,w_${width}/`);
};
