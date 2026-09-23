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
//     <div className="flex flex-col gap-6 rounded-2xl border border-dark-border bg-card p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
//       {/* Left Side - Title */}
//       <div>
//         <h1 className="text-3xl font-bold text-dark">My Resumes</h1>
//         <p className="mt-2 text-primary/70">{total} resumes available</p>
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
//           className="h-12 w-full rounded-xl border border-primary/10 bg-card px-4 text-sm text-dark focus:border-primary focus:outline-none lg:w-auto"
//         >
//           <option value="all">All</option>
//           <option value="draft">Draft</option>
//           <option value="completed">Completed</option>
//         </select>

//         {/* Sort Select */}
//         <select
//           value={sort}
//           onChange={(e) =>
//             onSort(e.target.value as "updated" | "newest" | "oldest" | "az")
//           }
//           className="h-12 w-full rounded-xl border border-dark-border bg-card px-4 text-sm text-dark focus:border-primary focus:outline-none lg:w-auto"
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

// DashboardHeader.tsx
import { Search, Plus, ScanSearch } from "lucide-react";

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
  onAnalyseATS: () => void;
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
  onAnalyseATS,
}: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-primary/10 bg-card p-5 shadow-sm sm:gap-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
      {/* Left Side - Title */}
      <div>
        <h1 className="text-2xl font-bold text-dark sm:text-3xl">
          My Resumes
        </h1>
        <p className="mt-1 text-sm text-primary/70 sm:mt-2 sm:text-base">
          {total} resumes available
        </p>
      </div>

      {/* Right Side - Controls */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center">
        {/* Search Input */}
        <div className="w-full lg:w-64 xl:w-80">
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search resume..."
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Filter + Sort */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-3">
          <select
            value={filter}
            onChange={(e) =>
              onFilter(e.target.value as "all" | "draft" | "completed")
            }
            className="h-11 w-full min-w-0 rounded-xl border border-primary/10 bg-card px-3 text-sm text-dark focus:border-primary focus:outline-none sm:h-12 sm:w-auto sm:px-4"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={sort}
            onChange={(e) =>
              onSort(e.target.value as "updated" | "newest" | "oldest" | "az")
            }
            className="h-11 w-full min-w-0 rounded-xl border border-primary/10 bg-card px-3 text-sm text-dark focus:border-primary focus:outline-none sm:h-12 sm:w-auto sm:px-4"
          >
            <option value="updated">Recently Updated</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        {/* Create / Analyse buttons */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-3">
          <Button
            leftIcon={<ScanSearch size={18} />}
            onClick={onAnalyseATS}
            className="w-full whitespace-nowrap sm:w-auto"
          >
            <span className="hidden sm:inline">Analyse ATS Score</span>
            <span className="sm:hidden">Analyse</span>
          </Button>

          <Button
            leftIcon={<Plus size={18} />}
            onClick={onCreate}
            className="w-full whitespace-nowrap sm:w-auto"
          >
            <span className="hidden sm:inline">Create Resume</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
