export const safeJsonParse = (jsonString: string) => {
  try {
    const parsedJson = JSON.parse(jsonString);
    return parsedJson;
  } catch (e) {
    return undefined;
  }
};
