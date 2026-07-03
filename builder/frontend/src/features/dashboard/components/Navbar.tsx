// import { Search, Bell } from "lucide-react";

// export default function Navbar() {
//   return (
//     <header className="bg-white h-20 border-b flex items-center justify-between px-8">

//       <div className="relative">

//         <Search
//           size={18}
//           className="absolute left-3 top-3 text-gray-400"
//         />

//         <input
//           placeholder="Search Resume..."
//           className="pl-10 w-80 border rounded-lg h-11 outline-none"
//         />

//       </div>

//       <div className="flex items-center gap-5">

//         <Bell />

//         <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center">

//           H

//         </div>

//       </div>

//     </header>
//   );
// }

import { Bell, Search, Plus, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-white px-8">
      {/* Left */}

      <div className="flex items-center gap-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search resumes..."
            className="h-11 w-80 rounded-xl border border-gray-200 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
          <Plus size={18} />
          Create Resume
        </button>

        <button className="relative rounded-xl border p-3 transition hover:bg-gray-100">
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <button className="flex items-center gap-3 rounded-xl border px-3 py-2 transition hover:bg-gray-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            H
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold">Hemendra</p>

            <p className="text-xs text-gray-500">Free Plan</p>
          </div>

          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  );
}
