import { Sparkles } from "lucide-react";

import Button from "../../../components/ui/Button";

interface Props {
  loading?: boolean;
  onClick: () => void;
}

export default function AIGenerateButton({ loading, onClick }: Props) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading}
      leftIcon={<Sparkles size={16} />}
    >
      {loading ? "Generating..." : "Generate with AI"}
    </Button>
  );
}
