export const exerciseOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const fullUrl = `${baseUrl}${url}`;
  console.log("full url", fullUrl);
  const response = await fetch(fullUrl, options);
  const data = await response.json();
  console.log("response", data);
  return data;
};

export const fetchYt = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log("response", data);
  return data;
};
