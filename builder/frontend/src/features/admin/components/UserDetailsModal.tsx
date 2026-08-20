// interface Props {
//   open: boolean;
//   onClose: () => void;
//   data: any;
// }

// export default function UserDetailsModal({ open, onClose, data }: Props) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="w-[500px] rounded-xl bg-white p-6">
//         <h2 className="mb-6 text-2xl font-bold">User Details</h2>

//         <div className="space-y-3">
//           <p>
//   <b>Name:</b> {data?.user?.fullName}
// </p>

//           <p>
//             <b>Email:</b> {data?.user?.email}
//           </p>

//           <p>
//             <b>Role:</b> {data?.user?.role}
//           </p>

//           <p>
//             <b>Status:</b> {data?.user?.status}
//           </p>

//           <hr />

//           <p>
//             <b>Resumes:</b> {data?.stats?.resumes}
//           </p>

//           <p>
//             <b>AI Requests:</b> {data?.stats?.aiRequests}
//           </p>

//           <p>
//             <b>ATS Analyses:</b> {data?.stats?.atsAnalyses}
//           </p>
//         </div>

//         <button
//           onClick={onClose}
//           className="mt-8 rounded bg-black px-5 py-2 text-white"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// UserDetailsModal.tsx
interface Props {
  open: boolean;
  onClose: () => void;
  data: any;
}

export default function UserDetailsModal({ open, onClose, data }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40">
      <div className="w-[500px] rounded-xl border border-primary/10 bg-modal p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-dark">User Details</h2>

        <div className="space-y-3 text-dark">
          <p>
            <b>Name:</b> {data?.user?.fullName}
          </p>

          <p>
            <b>Email:</b> {data?.user?.email}
          </p>

          <p>
            <b>Role:</b> {data?.user?.role}
          </p>

          <p>
            <b>Status:</b> {data?.user?.status}
          </p>

          <hr className="border-primary/10" />

          <p>
            <b>Resumes:</b> {data?.stats?.resumes}
          </p>

          <p>
            <b>AI Requests:</b> {data?.stats?.aiRequests}
          </p>

          <p>
            <b>ATS Analyses:</b> {data?.stats?.atsAnalyses}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 rounded bg-primary px-5 py-2 text-white hover:bg-dark"
        >
          Close
        </button>
      </div>
    </div>
  );
}
