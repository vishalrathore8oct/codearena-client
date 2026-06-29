const getJudge0LanguageId = (language: string): number => {
  const languageMap: { [key: string]: number } = {
    JAVA: 62,
    JAVASCRIPT: 63,
    PYTHON: 71,
  } as const;

  const languageId = languageMap[language.toUpperCase()];
  if (!languageId) {
    throw new Error(`Unsupported language: ${language}`);
  }
  return languageId;
};

const getJudge0LanguageName = (languageId: number): string => {
  const languageMap: { [key: number]: string } = {
    62: "JAVA",
    63: "JAVASCRIPT",
    71: "PYTHON",
  } as const;

  const languageName = languageMap[languageId];
  if (!languageName) {
    throw new Error(`Unsupported language ID: ${languageId}`);
  }
  return languageName;
};

export { getJudge0LanguageId, getJudge0LanguageName };
