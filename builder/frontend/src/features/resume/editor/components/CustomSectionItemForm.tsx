import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";
import { useResumeStore } from "../../../../store/resume.store";
import { Trash2 } from "lucide-react";

// interface Props {
//   sectionId: string;

//   config: {
//     title: string;

//     fields: {
//       title: string;
//       subtitle: string;
//       startDate: string;
//       endDate: string;
//       description: string;
//     };
//   };

//   item: {
//     id: string;
//     title: string;
//     subtitle?: string;
//     startDate?: string;
//     endDate?: string;
//     description?: string;
//   };
// }


interface Props {
  sectionId: string;

  config: {
    title: string;

    fields: {
      title: string;
      subtitle: string;
      startDate: string;
      endDate: string;
      description: string;
    };
  };

  item: {
    id: string;
    title: string;
    subtitle?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  };
}
export default function CustomSectionItemForm({
  sectionId,
  item,
  config,
}: Props) {
  const updateCustomSectionItem = useResumeStore(
    (state) => state.updateCustomSectionItem,
  );

  const deleteCustomSectionItem = useResumeStore(
    (state) => state.deleteCustomSectionItem,
  );
  return (
    <div className="space-y-4 rounded-xl border p-5">
      <Input
        label={config.fields.title}
        placeholder={config.fields.title}
        value={item.title}
        onChange={(e) =>
          updateCustomSectionItem(sectionId, item.id, "title", e.target.value)
        }
      />

      <Input
        label={config.fields.subtitle}
        placeholder={config.fields.subtitle}
        value={item.subtitle ?? ""}
        onChange={(e) =>
          updateCustomSectionItem(
            sectionId,
            item.id,
            "subtitle",
            e.target.value,
          )
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={config.fields.startDate}
          placeholder={config.fields.startDate}
          value={item.startDate ?? ""}
          onChange={(e) =>
            updateCustomSectionItem(
              sectionId,
              item.id,
              "startDate",
              e.target.value,
            )
          }
        />

        <Input
          label={config.fields.endDate}
          placeholder={config.fields.endDate}
          value={item.endDate ?? ""}
          onChange={(e) =>
            updateCustomSectionItem(
              sectionId,
              item.id,
              "endDate",
              e.target.value,
            )
          }
        />
      </div>

      <Textarea
        label={config.fields.description}
        placeholder={config.fields.description}
        value={item.description ?? ""}
        onChange={(e) =>
          updateCustomSectionItem(
            sectionId,
            item.id,
            "description",
            e.target.value,
          )
        }
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => deleteCustomSectionItem(sectionId, item.id)}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          <Trash2 size={18} />
          Delete Item
        </button>
      </div>
    </div>
  );
}
