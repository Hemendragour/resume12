export interface TextSegment {
  text: string;
  bold: boolean;
}

/**
 * Parses a string like "Increased revenue by **40%** in Q1"
 * into segments so it can be rendered with bold formatting.
 */
export function parseBoldSegments(text: string): TextSegment[] {
  if (!text) return [];

  const segments: TextSegment[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }

  return segments;
}
