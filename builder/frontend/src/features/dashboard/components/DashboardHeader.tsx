// import { Search, Plus } from "lucide-react";

// import Button from "../../../components/ui/Button";
// import Input from "../../../components/ui/Input";

// interface Props {
//   total: number;
//   search: string;
//   filter: "all" | "draft" | "completed";
//   sort: "updated" | "newest" | "oldest" | "az";
//   onSearch: (value: string) => void;
//   onFilter: (value: "all" | "draft" | "completed") => void;
//   onSort: (value: "updated" | "newest" | "oldest" | "az") => void;
//   onCreate: () => void;
// }

// export default function DashboardHeader({
//   total,
//   search,
//   filter,
//   sort,
//   onSearch,
//   onFilter,
//   onSort,
//   onCreate,
// }: Props) {
//   return (
//     <div className="flex flex-col gap-6 rounded-2xl border bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
//       {/* Left Side - Title */}
//       <div>
//         <h1 className="text-3xl font-bold">My Resumes</h1>
//         <p className="mt-2 text-slate-500">{total} resumes available</p>
//       </div>

//       {/* Right Side - Controls */}
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
//         {/* Search Input */}
//         <div className="w-full lg:w-80">
//           <Input
//             value={search}
//             onChange={(e) => onSearch(e.target.value)}
//             placeholder="Search resume..."
//             leftIcon={<Search size={18} />}
//           />
//         </div>

//         {/* Filter Select */}
//         <select
//           value={filter}
//           onChange={(e) =>
//             onFilter(e.target.value as "all" | "draft" | "completed")
//           }
//           className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm focus:border-slate-500 focus:outline-none lg:w-auto"
//         >
//           <option value="all">All</option>
//           <option value="draft">Draft</option>
//           <option value="completed">Completed</option>
//         </select>

//         {/* Sort Select */}
//         <select
//           value={sort}
//           onChange={(e) =>
//             onSort(
//               e.target.value as "updated" | "newest" | "oldest" | "az"
//             )
//           }
//           className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm focus:border-slate-500 focus:outline-none lg:w-auto"
//         >
//           <option value="updated">Recently Updated</option>
//           <option value="newest">Newest</option>
//           <option value="oldest">Oldest</option>
//           <option value="az">A-Z</option>
//         </select>

//         {/* Create Button */}
//         <Button
//           leftIcon={<Plus size={18} />}
//           onClick={onCreate}
//           className="w-full lg:w-auto"
//         >
//           Create Resume
//         </Button>
//       </div>
//     </div>
//   );
// }

import { Search, Plus } from "lucide-react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

interface Props {
  total: number;
  search: string;
  filter: "all" | "draft" | "completed";
  sort: "updated" | "newest" | "oldest" | "az";
  onSearch: (value: string) => void;
  onFilter: (value: "all" | "draft" | "completed") => void;
  onSort: (value: "updated" | "newest" | "oldest" | "az") => void;
  onCreate: () => void;
}

export default function DashboardHeader({
  total,
  search,
  filter,
  sort,
  onSearch,
  onFilter,
  onSort,
  onCreate,
}: Props) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-dark-border bg-card p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Left Side - Title */}
      <div>
        <h1 className="text-3xl font-bold text-dark">My Resumes</h1>
        <p className="mt-2 text-primary/70">{total} resumes available</p>
      </div>

      {/* Right Side - Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search Input */}
        <div className="w-full lg:w-80">
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search resume..."
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Filter Select */}
        <select
          value={filter}
          onChange={(e) =>
            onFilter(e.target.value as "all" | "draft" | "completed")
          }
          className="h-12 w-full rounded-xl border border-dark-border bg-card px-4 text-sm text-dark focus:border-primary focus:outline-none lg:w-auto"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
        </select>

        {/* Sort Select */}
        <select
          value={sort}
          onChange={(e) =>
            onSort(e.target.value as "updated" | "newest" | "oldest" | "az")
          }
          className="h-12 w-full rounded-xl border border-dark-border bg-card px-4 text-sm text-dark focus:border-primary focus:outline-none lg:w-auto"
        >
          <option value="updated">Recently Updated</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A-Z</option>
        </select>

        {/* Create Button */}
        <Button
          leftIcon={<Plus size={18} />}
          onClick={onCreate}
          className="w-full lg:w-auto"
        >
          Create Resume
        </Button>
      </div>
    </div>
  );
}
