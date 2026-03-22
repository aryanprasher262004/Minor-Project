import knowledge from "./knowledge_base.json";

export function getAnswer(intent: string): string {
  const kb = knowledge as Record<string, string>;

  return kb[intent] || kb["default"];
}