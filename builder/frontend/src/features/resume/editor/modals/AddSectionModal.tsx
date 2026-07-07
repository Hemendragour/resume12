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
  "Publications",
  "Research Papers",
  "Volunteer Experience",
  "Leadership",
  "Training",
  "Workshops",
  "Achievements",
  "Custom",
];

export default function AddSectionModal({ open, onClose, onSelect }: Props) {
  return (
   <Modal
  open={open}
  onClose={onClose}
  title="Add Custom Section"
>
      <div className="space-y-3">
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
    </Modal>
  );
}
