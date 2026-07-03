// import { useForm } from "react-hook-form";
// import { useEffect } from "react";

// import { useResumeStore } from "../../../../store/resume.store";

// const resume = useResumeStore(
//   (state) => state.resume
// );

// const updatePersonalInfo =
//   useResumeStore(
//     (state) =>
//       state.updatePersonalInfo
//   );

// export interface PersonalInfoFormData {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   address: string;
//   linkedIn: string;
//   github: string;
//   portfolio: string;
// }

// export default function PersonalInfoSection() {
//   const resume = useResumeStore(
//     (state) => state.resume
//   );

//   const updatePersonalInfo =
//     useResumeStore(
//       (state) =>
//         state.updatePersonalInfo
//     );

//   const {
//     register,
//     reset,
//     watch,
//   } = useForm<PersonalInfoFormData>({
//     defaultValues: {
//       fullName: "",
//       title: "",
//       email: "",
//       phone: "",
//       address: "",
//       linkedIn: "",
//       github: "",
//       portfolio: "",
//     },

//   });

//   useEffect(() => {

//   if (!resume) return;

//   reset(
//     resume.personalInfo
//   );

// }, [resume, reset]);

// const values =
//   watch();

// useEffect(() => {

//   updatePersonalInfo(
//     values
//   );

// }, [values, updatePersonalInfo]);

//   return (
//     <div className="space-y-8">
//       {/* Profile Photo */}

//       <div className="flex justify-center">
//         <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
//           <span className="text-sm text-gray-500">Photo</span>
//         </div>
//       </div>

//       {/* Personal Information */}

//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="font-medium">Full Name</label>

//           <input
//             {...register("fullName")}
//             className="w-full border rounded-lg h-12 px-4 mt-2"
//             placeholder="Hemendra Gour"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Professional Title</label>

//           <input
//             {...register("title")}
//             className="w-full border rounded-lg h-12 px-4 mt-2"
//             placeholder="Frontend Developer"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Email</label>

//           <input
//             {...register("email")}
//             className="w-full border rounded-lg h-12 px-4 mt-2"
//             placeholder="hemendra@gmail.com"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Phone</label>

//           <input
//             {...register("phone")}
//             className="w-full border rounded-lg h-12 px-4 mt-2"
//             placeholder="+91 9876543210"
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="font-medium">Address</label>

//           <input
//             {...register("address")}
//             className="w-full border rounded-lg h-12 px-4 mt-2"
//             placeholder="Bhopal, India"
//           />
//         </div>

//         <div>
//           <label className="font-medium">LinkedIn</label>

//           <input
//             {...register("linkedIn")}
//             className="w-full border rounded-lg h-12 px-4 mt-2"
//             placeholder="https://linkedin.com/in/..."
//           />
//         </div>

//         <div>
//           <label className="font-medium">GitHub</label>

//           <input
//             {...register("github")}
//             className="w-full border rounded-lg h-12 px-4 mt-2"
//             placeholder="https://github.com/..."
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="font-medium">Portfolio</label>

//           <input
//             {...register("portfolio")}
//             className="w-full border rounded-lg h-12 px-4 mt-2"
//             placeholder="https://portfolio.com"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useResumeStore } from "../../../../store/resume.store";

export interface PersonalInfoFormData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

export default function PersonalInfoSection() {
  const resume = useResumeStore((state) => state.resume);

  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo,
  );

  const { register, reset } = useForm<PersonalInfoFormData>({
    defaultValues: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      linkedIn: "",
      github: "",
      portfolio: "",
    },
  });

  // Existing resume load
  useEffect(() => {
    if (!resume) return;

    reset(resume.personalInfo);
  }, [resume, reset]);

  // Watch all form values

  return (
    <div className="space-y-8">
      <label className="cursor-pointer">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-300 hover:bg-slate-50">
          Upload
        </div>

        <input type="file" className="hidden" />
      </label>
      <div className="flex justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-300">
          <span className="text-sm text-gray-500">Photo</span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Full Name</label>

          <input
            {...register("fullName", {
              onChange: (e) =>
                updatePersonalInfo({
                  fullName: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="Hemendra Gour"
          />
        </div>

        <div>
          <label className="font-medium">Professional Title</label>

          <input
            {...register("title", {
              onChange: (e) =>
                updatePersonalInfo({
                  title: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="Frontend Developer"
          />
        </div>

        <div>
          <label className="font-medium">Email</label>

          <input
            type="email"
            {...register("email", {
              onChange: (e) =>
                updatePersonalInfo({
                  email: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="hemendra@gmail.com"
          />
        </div>

        <div>
          <label className="font-medium">Phone</label>

          <input
            type="tel"
            {...register("phone")}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="+91 9876543210"
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Address</label>

          <input
            {...register("address")}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="Bhopal, India"
          />
        </div>

        <div>
          <label className="font-medium">LinkedIn</label>

          <input
            {...register("linkedIn")}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div>
          <label className="font-medium">GitHub</label>

          <input
            {...register("github")}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://github.com/..."
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Portfolio</label>

          <input
            type="url"
            {...register("portfolio")}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://portfolio.com"
          />
        </div>
      </div>
    </div>
  );
}
