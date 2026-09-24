import Modal from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (title: string) => void;
}

const sectionOptions = [
  "Hackathons",
  "Open Source",
  "Research Papers",
  "Volunteer Experience",
  "Leadership",
  "Training",
  "Workshops",
  "Publications",
  "Patents",
  "Conferences",
  "Community Work",
  "Extra Curricular",
  "Custom",
];

export default function AddSectionModal({ open, onClose, onSelect }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Add Custom Section">
      <div className="max-h-[70vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {sectionOptions.map((section) => (
            <Button
              key={section}
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                onSelect(section);
                onClose();
              }}
            >
              {section}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
