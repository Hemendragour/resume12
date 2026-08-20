// import { useUsers } from "../hooks/useUsers";
// import { useState } from "react";
// import UserDetailsModal from "./UserDetailsModal";
// import { useUserDetails } from "../hooks/useUserDetails";
// import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";

// import DeleteUserModal from "./DeleteUserModal";

// import { useDeleteUser } from "../hooks/useDeleteUser";

// export default function UserTable() {
//   const [selectedId, setSelectedId] = useState("");
//   const [open, setOpen] = useState(false);

//   const { data: details } = useUserDetails(selectedId, open);
//   const { data, isLoading } = useUsers();
//   const { mutate: changeStatus } = useUpdateUserStatus();

//   const [deleteOpen, setDeleteOpen] = useState(false);

//   const [deleteId, setDeleteId] = useState("");

//   const { mutate: deleteUser } = useDeleteUser();

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="w-full overflow-x-auto rounded-xl border bg-white">
//       <table className="min-w-[1000px] w-full">
//         <thead>
//           <tr className="border-b bg-gray-50">
//             <th className="p-4 text-left">Name</th>
//             <th className="p-4 text-left">Email</th>
//             <th className="p-4 text-left">Role</th>
//             <th className="p-4 text-left">Status</th>
//             <th className="p-4 text-left">Joined</th>
//             <th className="p-4 text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((user: any) => (
//             <tr key={user._id} className="border-b">
//               <td className="p-4">{user.fullName}</td>

//               <td className="p-4">{user.email}</td>

//               <td className="p-4">
//                 <span
//                   className={`rounded-full px-3 py-1 text-sm ${
//                     user.role === "admin"
//                       ? "bg-purple-100 text-purple-700"
//                       : "bg-blue-100 text-blue-700"
//                   }`}
//                 >
//                   {user.role}
//                 </span>
//               </td>

//               {/* ✅ New Status Column Added */}
//               <td className="p-4">
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs ${
//                     user.status === "active"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {user.status ?? "active"}
//                 </span>
//               </td>

//               <td className="p-4">
//                 {new Date(user.createdAt).toLocaleDateString()}
//               </td>

//               <td className="p-4">
//                 <div className="flex justify-center gap-2">
//                   <button
//                     onClick={() => {
//                       setSelectedId(user._id);
//                       setOpen(true);
//                     }}
//                     className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
//                   >
//                     👁 View
//                   </button>

//                   {/* <button
//                     onClick={() =>
//                       changeStatus({
//                         id: user._id,
//                         status:
//                           user.status === "active" ? "suspended" : "active",
//                       })
//                     }
//                     className={`rounded px-3 py-1 text-sm text-white ${
//                       user.status === "active"
//                         ? "bg-yellow-500 hover:bg-yellow-600"
//                         : "bg-green-600 hover:bg-green-700"
//                     }`}
//                   >
//                     {user.status === "active" ? "🚫 Suspend" : "✅ Activate"}
//                   </button>

//                   */}
//                   <button
//                     onClick={() => {
//                       console.log("clicked");

//                       changeStatus(
//                         {
//                           id: user._id,
//                           status:
//                             user.status === "active" ? "suspended" : "active",
//                         },
//                         {
//                           onSuccess: (data) => {
//                             console.log("SUCCESS", data);
//                           },
//                           onError: (error) => {
//                             console.log("ERROR", error);
//                           },
//                         },
//                       );
//                     }}
//                     className={`rounded px-3 py-1 text-sm text-white ${
//                       user.status === "active"
//                         ? "bg-yellow-500 hover:bg-yellow-600"
//                         : "bg-green-600 hover:bg-green-700"
//                     }`}
//                   >
//                     {user.status === "active" ? "🚫 Suspend" : "✅ Activate"}
//                   </button>

//                  {user.role === "admin" ? (
//   <button
//     disabled
//     className="cursor-not-allowed rounded bg-gray-400 px-3 py-1 text-sm text-white"
//   >
//     🔒 Admin
//   </button>
// ) : (
//   <button
//     onClick={() => {
//       setDeleteId(user._id);
//       setDeleteOpen(true);
//     }}
//     className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
//   >
//     🗑 Delete
//   </button>
// )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <DeleteUserModal
//   open={deleteOpen}
//   onClose={() =>
//     setDeleteOpen(false)
//   }
//   onDelete={() => {
//     deleteUser(deleteId);

//     setDeleteOpen(false);
//   }}
// />

//       <UserDetailsModal
//         open={open}
//         onClose={() => setOpen(false)}
//         data={details}
//       />
//     </div>
//   );
// }

// UserTable.tsx
import { useUsers } from "../hooks/useUsers";
import { useState } from "react";
import UserDetailsModal from "./UserDetailsModal";
import { useUserDetails } from "../hooks/useUserDetails";
import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";

import DeleteUserModal from "./DeleteUserModal";

import { useDeleteUser } from "../hooks/useDeleteUser";

export default function UserTable() {
  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);

  const { data: details } = useUserDetails(selectedId, open);
  const { data, isLoading } = useUsers();
  const { mutate: changeStatus } = useUpdateUserStatus();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const { mutate: deleteUser } = useDeleteUser();

  if (isLoading) {
    return <p className="text-primary/70">Loading...</p>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-primary/10 bg-card">
      <table className="min-w-[1000px] w-full">
        <thead>
          <tr className="border-b border-primary/10 bg-background">
            <th className="p-4 text-left text-dark">Name</th>
            <th className="p-4 text-left text-dark">Email</th>
            <th className="p-4 text-left text-dark">Role</th>
            <th className="p-4 text-left text-dark">Status</th>
            <th className="p-4 text-left text-dark">Joined</th>
            <th className="p-4 text-center text-dark">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user: any) => (
            <tr key={user._id} className="border-b border-primary/10">
              <td className="p-4 text-dark">{user.fullName}</td>

              <td className="p-4 text-primary/70">{user.email}</td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    user.role === "admin"
                      ? "bg-primary/15 text-primary"
                      : "bg-accent/15 text-dark"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              {/* ✅ New Status Column Added */}
              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    user.status === "active"
                      ? "bg-success/10 text-success"
                      : "bg-danger/10 text-danger"
                  }`}
                >
                  {user.status ?? "active"}
                </span>
              </td>

              <td className="p-4 text-primary/70">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedId(user._id);
                      setOpen(true);
                    }}
                    className="rounded bg-primary px-3 py-1 text-sm text-white hover:bg-dark"
                  >
                    👁 View
                  </button>

                  {/* <button
                    onClick={() =>
                      changeStatus({
                        id: user._id,
                        status:
                          user.status === "active" ? "suspended" : "active",
                      })
                    }
                    className={`rounded px-3 py-1 text-sm text-white ${
                      user.status === "active"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {user.status === "active" ? "🚫 Suspend" : "✅ Activate"}
                  </button>
                  
                  */}
                  <button
                    onClick={() => {
                      console.log("clicked");

                      changeStatus(
                        {
                          id: user._id,
                          status:
                            user.status === "active" ? "suspended" : "active",
                        },
                        {
                          onSuccess: (data) => {
                            console.log("SUCCESS", data);
                          },
                          onError: (error) => {
                            console.log("ERROR", error);
                          },
                        },
                      );
                    }}
                    className={`rounded px-3 py-1 text-sm text-white ${
                      user.status === "active"
                        ? "bg-warning hover:opacity-90"
                        : "bg-success hover:opacity-90"
                    }`}
                  >
                    {user.status === "active" ? "🚫 Suspend" : "✅ Activate"}
                  </button>

                  {user.role === "admin" ? (
                    <button
                      disabled
                      className="cursor-not-allowed rounded bg-primary/30 px-3 py-1 text-sm text-white"
                    >
                      🔒 Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setDeleteId(user._id);
                        setDeleteOpen(true);
                      }}
                      className="rounded bg-danger px-3 py-1 text-sm text-white hover:opacity-90"
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteUserModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={() => {
          deleteUser(deleteId);

          setDeleteOpen(false);
        }}
      />

      <UserDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        data={details}
      />
    </div>
  );
}
