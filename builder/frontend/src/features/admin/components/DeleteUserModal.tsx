// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onDelete: () => void;
// }

// export default function DeleteUserModal({ open, onClose, onDelete }: Props) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="w-[420px] rounded-xl bg-white p-6">
//         <h2 className="text-2xl font-bold">Delete User</h2>

//         <p className="mt-4 text-gray-600">
//           Are you sure you want to delete this user?
//         </p>

//         <div className="mt-8 flex justify-end gap-3">
//           <button onClick={onClose} className="rounded-lg border px-5 py-2">
//             Cancel
//           </button>

//           <button
//             onClick={onDelete}
//             className="rounded-lg bg-red-600 px-5 py-2 text-white"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// DeleteUserModal.tsx
interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteUserModal({ open, onClose, onDelete }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40">
      <div className="w-[420px] rounded-xl border border-primary/10 bg-modal p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-dark">Delete User</h2>

        <p className="mt-4 text-primary/70">
          Are you sure you want to delete this user?
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-primary/10 px-5 py-2 text-dark transition hover:bg-background"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-danger px-5 py-2 text-white transition hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
