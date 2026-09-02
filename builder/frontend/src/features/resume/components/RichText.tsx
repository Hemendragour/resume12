import { parseBoldSegments } from "../utils/boldText";

interface RichTextProps {
  text: string;
}

export default function RichText({ text }: RichTextProps) {
  const segments = parseBoldSegments(text);

  return (
    <>
      {segments.map((seg, i) =>
        seg.bold ? (
          <strong key={i}>{seg.text}</strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}
