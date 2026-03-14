import axios from "axios";


export const initializeKeepAlive = (url: string, intervalInMinutes: number = 10) => {
  if (!url) {
    console.warn("Keep-alive URL not provided. Skipping self-ping.");
    return;
  }

  console.log(`Keep-alive initialized. Pinging ${url} every ${intervalInMinutes} minutes.`);

  setInterval(async () => {
    try {
      const response = await axios.get(url);
      console.log(`Keep-alive ping successful: ${url} (Status: ${response.status})`);
    } catch (error: any) {
      console.error(`Keep-alive ping failed for ${url}:`, error.message);
    }
  }, intervalInMinutes * 60 * 1000);
};
