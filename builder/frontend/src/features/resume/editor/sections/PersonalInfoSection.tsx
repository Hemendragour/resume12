// // import { useEffect } from "react";
// // import { useForm } from "react-hook-form";

// // import { useResumeStore } from "../../../../store/resume.store";

// // export interface PersonalInfoFormData {
// //   fullName: string;
// //   title: string;
// //   email: string;
// //   phone: string;
// //   address: string;
// //   linkedIn: string;
// //   github: string;
// //   portfolio: string;
// //   photo: string;
// // }

// // export default function PersonalInfoSection() {
// //   const resume = useResumeStore((state) => state.resume);

// //   const updatePersonalInfo = useResumeStore(
// //     (state) => state.updatePersonalInfo,
// //   );

// //   const { register, reset } = useForm<PersonalInfoFormData>({
// //     defaultValues: {
// //       fullName: "",
// //       title: "",
// //       email: "",
// //       phone: "",
// //       address: "",
// //       linkedIn: "",
// //       github: "",
// //       portfolio: "",
// //       photo: "",
// //     },
// //   });

// //   useEffect(() => {
// //     if (!resume) return;

// //     reset({
// //       fullName: resume.personalInfo.fullName ?? "",
// //       title: resume.personalInfo.title ?? "",
// //       email: resume.personalInfo.email ?? "",
// //       phone: resume.personalInfo.phone ?? "",
// //       address: resume.personalInfo.address ?? "",
// //       linkedIn: resume.personalInfo.linkedIn ?? "",
// //       github: resume.personalInfo.github ?? "",
// //       portfolio: resume.personalInfo.portfolio ?? "",
// //     });
// //   }, [resume, reset]);

// //   // Watch all form values

// //   return (
// //     <div className="space-y-8">
// //       <label className="cursor-pointer">
// //         <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-300 hover:bg-slate-50">
// //           Upload
// //         </div>

// //         <input type="file" className="hidden" />
// //       </label>

// //       {/* Personal Information */}
// //       <div className="grid grid-cols-2 gap-6">
// //         <div>
// //           <label className="font-medium">Full Name</label>

// //           <input
// //             {...register("fullName", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   fullName: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Hemendra Gour"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Professional Title</label>

// //           <input
// //             {...register("title", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   title: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Frontend Developer"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Email</label>

// //           <input
// //             type="email"
// //             {...register("email", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   email: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="hemendra@gmail.com"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Phone</label>

// //           <input
// //             type="tel"
// //             {...register("phone", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   phone: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="+91 9876543210"
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="font-medium">Address</label>

// //           <input
// //             {...register("address", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   address: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Bhopal, India"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">LinkedIn</label>

// //           <input
// //             {...register("linkedIn", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   linkedIn: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://linkedin.com/in/..."
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">GitHub</label>

// //           <input
// //             {...register("github", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   github: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://github.com/..."
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="font-medium">Portfolio</label>

// //           <input
// //             type="url"
// //             {...register("portfolio", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   portfolio: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://portfolio.com"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";

// // import Button from "../../../../components/ui/Button";
// // import { useResumeStore } from "../../../../store/resume.store";
// // import ImageUploader from "../../../../components/ImageUploader";

// // export interface PersonalInfoFormData {
// //   fullName: string;
// //   title: string;
// //   email: string;
// //   phone: string;
// //   address: string;
// //   linkedIn: string;
// //   github: string;
// //   portfolio: string;
// //   photo: string;
// // }

// // // URL-ish check: allows with or without protocol, requires a domain
// // const isValidUrlLike = (value: string) =>
// //   !value || /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(value.trim());

// // // Normalizes before saving to backend (backend requires full URL w/ protocol)
// // function normalizeUrl(value: string): string {
// //   if (!value) return "";
// //   const trimmed = value.trim();
// //   return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
// // }

// // export default function PersonalInfoSection() {
// //   const resume = useResumeStore((state) => state.resume);
// //   const updatePersonalInfo = useResumeStore(
// //     (state) => state.updatePersonalInfo,
// //   );

// //   const [isEditing, setIsEditing] = useState(false);

// //   const {
// //     register,
// //     handleSubmit,
// //     reset,
// //     setValue,
// //     watch,
// //     formState: { errors, isValid },
// //   } = useForm<PersonalInfoFormData>({
// //     mode: "onChange", // validate as user types
// //     defaultValues: {
// //       fullName: "",
// //       title: "",
// //       email: "",
// //       phone: "",
// //       address: "",
// //       linkedIn: "",
// //       github: "",
// //       portfolio: "",
// //       photo: "",
// //     },
// //   });

// //   useEffect(() => {
// //     if (!resume) return;

// //     reset({
// //       fullName: resume.personalInfo.fullName ?? "",
// //       title: resume.personalInfo.title ?? "",
// //       email: resume.personalInfo.email ?? "",
// //       phone: resume.personalInfo.phone ?? "",
// //       address: resume.personalInfo.address ?? "",
// //       linkedIn: resume.personalInfo.linkedIn ?? "",
// //       github: resume.personalInfo.github ?? "",
// //       portfolio: resume.personalInfo.portfolio ?? "",
// //       photo: resume.personalInfo.photo ?? "",
// //     });
// //   }, [resume, reset]);

// //   const photo = watch("photo");

// //   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       setValue("photo", reader.result as string);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const onSubmit = (data: PersonalInfoFormData) => {
// //     updatePersonalInfo({
// //       ...data,
// //       linkedIn: normalizeUrl(data.linkedIn),
// //       github: normalizeUrl(data.github),
// //       portfolio: normalizeUrl(data.portfolio),
// //     });
// //     setIsEditing(false);
// //   };

// //   const handleCancel = () => {
// //     if (!resume) return;
// //     reset({
// //       fullName: resume.personalInfo.fullName ?? "",
// //       title: resume.personalInfo.title ?? "",
// //       email: resume.personalInfo.email ?? "",
// //       phone: resume.personalInfo.phone ?? "",
// //       address: resume.personalInfo.address ?? "",
// //       linkedIn: resume.personalInfo.linkedIn ?? "",
// //       github: resume.personalInfo.github ?? "",
// //       portfolio: resume.personalInfo.portfolio ?? "",
// //       photo: resume.personalInfo.photo ?? "",
// //     });
// //     setIsEditing(false);
// //   };

// //   if (!resume) return null;

// //   // ---------------- READ-ONLY SUMMARY VIEW ----------------
// //   if (!isEditing) {
// //     const { personalInfo } = resume;

// //     return (
// //       <div className="space-y-6 rounded-2xl border bg-white p-8">
// //         <div className="flex items-start justify-between">
// //           <h2 className="text-2xl font-bold">Personal Info</h2>
// //           <Button
// //             type="button"
// //             variant="outline"
// //             onClick={() => setIsEditing(true)}
// //           >
// //             Edit
// //           </Button>
// //         </div>

// //         <div className="flex items-center gap-6">
// //           {personalInfo.photo ? (
// //             <img
// //               src={personalInfo.photo}
// //               alt={personalInfo.fullName}
// //               className="h-20 w-20 rounded-full object-cover"
// //             />
// //           ) : (
// //             <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-xs text-slate-400">
// //               No photo
// //             </div>
// //           )}

// //           <div>
// //             <p className="text-lg font-semibold">
// //               {personalInfo.fullName || "Your Name"}
// //             </p>
// //             <p className="text-slate-600">
// //               {personalInfo.title || "Professional Title"}
// //             </p>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
// //           <p>
// //             <span className="font-medium text-slate-800">Email: </span>
// //             {personalInfo.email || "—"}
// //           </p>
// //           <p>
// //             <span className="font-medium text-slate-800">Phone: </span>
// //             {personalInfo.phone || "—"}
// //           </p>
// //           <p className="col-span-2">
// //             <span className="font-medium text-slate-800">Address: </span>
// //             {personalInfo.address || "—"}
// //           </p>
// //           <p>
// //             <span className="font-medium text-slate-800">LinkedIn: </span>
// //             {personalInfo.linkedIn || "—"}
// //           </p>
// //           <p>
// //             <span className="font-medium text-slate-800">GitHub: </span>
// //             {personalInfo.github || "—"}
// //           </p>
// //           <p className="col-span-2">
// //             <span className="font-medium text-slate-800">Portfolio: </span>
// //             {personalInfo.portfolio || "—"}
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ---------------- EDIT FORM VIEW ----------------
// //   return (
// //     <form
// //       onSubmit={handleSubmit(onSubmit)}
// //       className="space-y-8 rounded-2xl border bg-white p-8"
// //     >
// //       <h2 className="text-2xl font-bold">Edit Personal Info</h2>

// //       {/* <label className="cursor-pointer">
// //         {photo ? (
// //           <img
// //             src={photo}
// //             alt="Profile"
// //             className="h-32 w-32 rounded-full object-cover"
// //           />
// //         ) : (
// //           <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-300 hover:bg-slate-50">
// //             Upload
// //           </div>
// //         )}

// //         <input
// //           type="file"
// //           accept="image/*"
// //           className="hidden"
// //           onChange={handlePhotoChange}
// //         />
// //       </label> */}

// //       <div className="flex justify-center">
// //     <ImageUploader />
// // </div>

// //       <div className="grid grid-cols-2 gap-6">
// //         <div>
// //           <label className="font-medium">Full Name</label>
// //           <input
// //             {...register("fullName", {
// //               required: "Full name is required",
// //               minLength: {
// //                 value: 2,
// //                 message: "Minimum 2 characters required",
// //               },
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Hemendra Gour"
// //           />
// //           {errors.fullName && (
// //             <p className="mt-1 text-sm text-red-500">
// //               {errors.fullName.message}
// //             </p>
// //           )}
// //         </div>

// //         <div>
// //           <label className="font-medium">Professional Title</label>
// //           <input
// //             {...register("title", {
// //               required: "Title is required",
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Frontend Developer"
// //           />
// //           {errors.title && (
// //             <p className="mt-1 text-sm text-red-500">
// //               {errors.title.message}
// //             </p>
// //           )}
// //         </div>

// //         <div>
// //           <label className="font-medium">Email</label>
// //           <input
// //             type="email"
// //             {...register("email", {
// //               required: "Email is required",
// //               pattern: {
// //                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
// //                 message: "Enter a valid email, e.g. name@example.com",
// //               },
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="hemendra@gmail.com"
// //           />
// //           {errors.email && (
// //             <p className="mt-1 text-sm text-red-500">
// //               {errors.email.message}
// //             </p>
// //           )}
// //         </div>

// //         <div>
// //           <label className="font-medium">Phone</label>
// //           <input
// //             type="tel"
// //             {...register("phone")}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="+91 9876543210"
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="font-medium">Address</label>
// //           <input
// //             {...register("address")}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Bhopal, India"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">LinkedIn</label>
// //           <input
// //             {...register("linkedIn", {
// //               validate: (value) =>
// //                 isValidUrlLike(value) ||
// //                 "Invalid link. Correct format: linkedin.com/in/your-username",
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="linkedin.com/in/hemendra-gour"
// //           />
// //           {errors.linkedIn && (
// //             <p className="mt-1 text-sm text-red-500">
// //               {errors.linkedIn.message}
// //             </p>
// //           )}
// //         </div>

// //         <div>
// //           <label className="font-medium">GitHub</label>
// //           <input
// //             {...register("github", {
// //               validate: (value) =>
// //                 isValidUrlLike(value) ||
// //                 "Invalid link. Correct format: github.com/your-username",
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="github.com/hemendragour"
// //           />
// //           {errors.github && (
// //             <p className="mt-1 text-sm text-red-500">
// //               {errors.github.message}
// //             </p>
// //           )}
// //         </div>

// //         <div className="col-span-2">
// //           <label className="font-medium">Portfolio</label>
// //           <input
// //             {...register("portfolio", {
// //               validate: (value) =>
// //                 isValidUrlLike(value) ||
// //                 "Invalid link. Correct format: yourportfolio.dev",
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="hemendragour.dev"
// //           />
// //           {errors.portfolio && (
// //             <p className="mt-1 text-sm text-red-500">
// //               {errors.portfolio.message}
// //             </p>
// //           )}
// //         </div>
// //       </div>

// //       <div className="flex justify-end gap-4">
// //         <Button type="button" variant="outline" onClick={handleCancel}>
// //           Cancel
// //         </Button>
// //         <Button type="submit" disabled={!isValid}>
// //           Save
// //         </Button>
// //       </div>
// //     </form>
// //   );
// // }

// // import { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { X, Pencil } from "lucide-react";

// // import { useResumeStore } from "../../../../store/resume.store";

// // export interface PersonalInfoFormData {
// //   fullName: string;
// //   title: string;
// //   email: string;
// //   phone: string;
// //   address: string;
// //   linkedIn: string;
// //   github: string;
// //   portfolio: string;
// //   photo: string;
// // }

// // export default function PersonalInfoSection() {
// //   const resume = useResumeStore((state) => state.resume);

// //   const updatePersonalInfo = useResumeStore(
// //     (state) => state.updatePersonalInfo,
// //   );

// //   const [photoPreview, setPhotoPreview] = useState<string>("");
// //   const [photoError, setPhotoError] = useState<string>("");

// //   const { register, reset } = useForm<PersonalInfoFormData>({
// //     defaultValues: {
// //       fullName: "",
// //       title: "",
// //       email: "",
// //       phone: "",
// //       address: "",
// //       linkedIn: "",
// //       github: "",
// //       portfolio: "",
// //       photo: "",
// //     },
// //   });

// //   useEffect(() => {
// //     if (!resume) return;

// //     reset({
// //       fullName: resume.personalInfo.fullName ?? "",
// //       title: resume.personalInfo.title ?? "",
// //       email: resume.personalInfo.email ?? "",
// //       phone: resume.personalInfo.phone ?? "",
// //       address: resume.personalInfo.address ?? "",
// //       linkedIn: resume.personalInfo.linkedIn ?? "",
// //       github: resume.personalInfo.github ?? "",
// //       portfolio: resume.personalInfo.portfolio ?? "",
// //     });

// //     setPhotoPreview(resume.personalInfo.photo ?? "");
// //   }, [resume, reset]);

// //   // CREATE / UPDATE: handles both the first upload and replacing an existing photo
// //   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     setPhotoError("");

// //     if (!file.type.startsWith("image/")) {
// //       setPhotoError("Please upload an image file.");
// //       return;
// //     }

// //     // 2MB limit — adjust to whatever your backend / store expects
// //     if (file.size > 2 * 1024 * 1024) {
// //       setPhotoError("Image must be smaller than 2MB.");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       const base64 = reader.result as string;
// //       setPhotoPreview(base64);
// //       updatePersonalInfo({ photo: base64 });
// //     };
// //     reader.readAsDataURL(file);

// //     // reset input value so re-selecting the same file still fires onChange
// //     e.target.value = "";
// //   };

// //   // DELETE
// //   const handleRemovePhoto = () => {
// //     setPhotoPreview("");
// //     setPhotoError("");
// //     updatePersonalInfo({ photo: "" });
// //   };

// //   return (
// //     <div className="space-y-8">
// //       <div className="flex flex-col gap-2">
// //         <div className="group relative h-32 w-32">
// //           <label className="cursor-pointer">
// //             <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 hover:bg-slate-50">
// //               {photoPreview ? (
// //                 <img
// //   src={photoPreview}
// //   alt="Profile"
// //   className="h-full w-full object-cover object-top"
// // />
// //               ) : (
// //                 <span className="text-sm text-slate-500">Upload</span>
// //               )}
// //             </div>

// //             <input
// //               type="file"
// //               accept="image/*"
// //               className="hidden"
// //               onChange={handlePhotoChange}
// //             />
// //           </label>

// //           {photoPreview && (
// //             <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
// //               {/* EDIT: reuses the same hidden input to replace the photo */}
// //               <label className="cursor-pointer rounded-full bg-white p-2 hover:bg-slate-100">
// //                 <Pencil className="h-4 w-4 text-slate-700" />
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   className="hidden"
// //                   onChange={handlePhotoChange}
// //                 />
// //               </label>

// //               {/* DELETE */}
// //               <button
// //                 type="button"
// //                 onClick={handleRemovePhoto}
// //                 className="rounded-full bg-white p-2 hover:bg-slate-100"
// //               >
// //                 <X className="h-4 w-4 text-slate-700" />
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {photoError && <p className="text-sm text-red-500">{photoError}</p>}
// //       </div>

// //       {/* Personal Information */}
// //       <div className="grid grid-cols-2 gap-6">
// //         <div>
// //           <label className="font-medium">Full Name</label>

// //           <input
// //             {...register("fullName", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   fullName: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Hemendra Gour"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Professional Title</label>

// //           <input
// //             {...register("title", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   title: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Frontend Developer"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Email</label>

// //           <input
// //             type="email"
// //             {...register("email", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   email: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="hemendra@gmail.com"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Phone</label>

// //           <input
// //             type="tel"
// //             {...register("phone", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   phone: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="+91 9876543210"
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="font-medium">Address</label>

// //           <input
// //             {...register("address", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   address: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Bhopal, India"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">LinkedIn</label>

// //           <input
// //             {...register("linkedIn", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   linkedIn: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://linkedin.com/in/..."
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">GitHub</label>

// //           <input
// //             {...register("github", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   github: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://github.com/..."
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="font-medium">Portfolio</label>

// //           <input
// //             type="url"
// //             {...register("portfolio", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   portfolio: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://portfolio.com"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // import { useEffect, useState, useRef, useCallback } from "react";
// // import { useForm } from "react-hook-form";
// // import { X, Pencil } from "lucide-react";

// // import { useResumeStore } from "../../../../store/resume.store";

// // export interface PersonalInfo {
// //   fullName: string;
// //   title: string;
// //   email: string;
// //   phone: string;
// //   address: string;
// //   linkedIn: string;
// //   github: string;
// //   portfolio: string;
// //   photo: string;
// //   photoZoom?: number;
// //   photoPosition?: { x: number; y: number };
// // }

// // const PHOTO_SIZE = 144; // px, matches h-36 w-36
// // const MIN_ZOOM = 1;
// // const MAX_ZOOM = 2.5;

// // export default function PersonalInfoSection() {
// //   const resume = useResumeStore((state) => state.resume);

// //   const updatePersonalInfo = useResumeStore(
// //     (state) => state.updatePersonalInfo,
// //   );

// //   const [photoPreview, setPhotoPreview] = useState<string>("");
// //   const [photoError, setPhotoError] = useState<string>("");

// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const dragInfo = useRef<{
// //     startX: number;
// //     startY: number;
// //     startPos: { x: number; y: number };
// //     moved: boolean;
// //   } | null>(null);

// //   const zoom = resume?.personalInfo.photoZoom ?? 1;
// //   const position = resume?.personalInfo.photoPosition ?? { x: 0, y: 0 };

// //   const { register, reset } = useForm<PersonalInfoFormData>({
// //     defaultValues: {
// //       fullName: "",
// //       title: "",
// //       email: "",
// //       phone: "",
// //       address: "",
// //       linkedIn: "",
// //       github: "",
// //       portfolio: "",
// //       photo: "",
// //     },
// //   });

// //   useEffect(() => {
// //     if (!resume) return;

// //     reset({
// //       fullName: resume.personalInfo.fullName ?? "",
// //       title: resume.personalInfo.title ?? "",
// //       email: resume.personalInfo.email ?? "",
// //       phone: resume.personalInfo.phone ?? "",
// //       address: resume.personalInfo.address ?? "",
// //       linkedIn: resume.personalInfo.linkedIn ?? "",
// //       github: resume.personalInfo.github ?? "",
// //       portfolio: resume.personalInfo.portfolio ?? "",
// //     });

// //     setPhotoPreview(resume.personalInfo.photo ?? "");
// //   }, [resume, reset]);

// //   const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));

// //   // CREATE / UPDATE: handles both the first upload and replacing an existing photo
// //   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     setPhotoError("");

// //     if (!file.type.startsWith("image/")) {
// //       setPhotoError("Please upload an image file.");
// //       return;
// //     }

// //     // 2MB limit — adjust to whatever your backend / store expects
// //     if (file.size > 2 * 1024 * 1024) {
// //       setPhotoError("Image must be smaller than 2MB.");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       const base64 = reader.result as string;
// //       setPhotoPreview(base64);
// //       // reset zoom/position for the new photo
// //       updatePersonalInfo({ photo: base64, photoZoom: 1, photoPosition: { x: 0, y: 0 } });
// //     };
// //     reader.readAsDataURL(file);

// //     // reset input value so re-selecting the same file still fires onChange
// //     e.target.value = "";
// //   };

// //   // DELETE
// //   const handleRemovePhoto = () => {
// //     setPhotoPreview("");
// //     setPhotoError("");
// //     updatePersonalInfo({ photo: "", photoZoom: 1, photoPosition: { x: 0, y: 0 } });
// //   };

// //   // DRAG TO PAN
// //   const handleMouseDown = (e: React.MouseEvent) => {
// //     if (!photoPreview) return;
// //     e.preventDefault();
// //     dragInfo.current = {
// //       startX: e.clientX,
// //       startY: e.clientY,
// //       startPos: position,
// //       moved: false,
// //     };
// //     window.addEventListener("mousemove", handleMouseMove);
// //     window.addEventListener("mouseup", handleMouseUp);
// //   };

// //   const handleMouseMove = useCallback(
// //     (e: MouseEvent) => {
// //       if (!dragInfo.current) return;
// //       const dx = e.clientX - dragInfo.current.startX;
// //       const dy = e.clientY - dragInfo.current.startY;

// //       if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
// //         dragInfo.current.moved = true;
// //       }

// //       const fracX = dx / PHOTO_SIZE;
// //       const fracY = dy / PHOTO_SIZE;
// //       const max = (zoom - 1) / 2;

// //       const newX = clamp(dragInfo.current.startPos.x + fracX, max);
// //       const newY = clamp(dragInfo.current.startPos.y + fracY, max);

// //       updatePersonalInfo({ photoPosition: { x: newX, y: newY } });
// //     },
// //     [zoom, updatePersonalInfo],
// //   );

// //   const handleMouseUp = useCallback(() => {
// //     window.removeEventListener("mousemove", handleMouseMove);
// //     window.removeEventListener("mouseup", handleMouseUp);
// //     dragInfo.current = null;
// //   }, [handleMouseMove]);

// //   // SCROLL TO ZOOM
// //   const handleWheel = (e: React.WheelEvent) => {
// //     if (!photoPreview) return;
// //     e.preventDefault();

// //     const delta = e.deltaY > 0 ? -0.1 : 0.1;
// //     const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + delta));
// //     const max = (newZoom - 1) / 2;

// //     updatePersonalInfo({
// //       photoZoom: newZoom,
// //       photoPosition: { x: clamp(position.x, max), y: clamp(position.y, max) },
// //     });
// //   };

// //   const handleZoomSlider = (val: number) => {
// //     const max = (val - 1) / 2;
// //     updatePersonalInfo({
// //       photoZoom: val,
// //       photoPosition: { x: clamp(position.x, max), y: clamp(position.y, max) },
// //     });
// //   };

// //   return (
// //     <div className="space-y-8">
// //       <div className="flex flex-col gap-2">
// //         <div className="group relative h-36 w-36">
// //           <div
// //             ref={containerRef}
// //             onMouseDown={handleMouseDown}
// //             onWheel={handleWheel}
// //             className="h-36 w-36 select-none overflow-hidden rounded-full border-2 border-dashed border-slate-300 hover:bg-slate-50"
// //             style={{ cursor: photoPreview ? "move" : "default" }}
// //           >
// //             {photoPreview ? (
// //               <img
// //                 src={photoPreview}
// //                 alt="Profile"
// //                 draggable={false}
// //                 className="relative left-1/2 top-1/2 h-full w-full object-cover"
// //                 style={{
// //                   transform: `translate(-50%, -50%) translate(${position.x * PHOTO_SIZE}px, ${position.y * PHOTO_SIZE}px) scale(${zoom})`,
// //                 }}
// //               />
// //             ) : (
// //               <label className="flex h-full w-full cursor-pointer items-center justify-center">
// //                 <span className="text-sm text-slate-500">Upload</span>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   className="hidden"
// //                   onChange={handlePhotoChange}
// //                 />
// //               </label>
// //             )}
// //           </div>

// //           {photoPreview && (
// //             <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
// //               {/* EDIT: reuses the same hidden input to replace the photo */}
// //               <label className="pointer-events-auto cursor-pointer rounded-full bg-white p-2 hover:bg-slate-100">
// //                 <Pencil className="h-4 w-4 text-slate-700" />
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   className="hidden"
// //                   onChange={handlePhotoChange}
// //                 />
// //               </label>

// //               {/* DELETE */}
// //               <button
// //                 type="button"
// //                 onClick={handleRemovePhoto}
// //                 className="pointer-events-auto rounded-full bg-white p-2 hover:bg-slate-100"
// //               >
// //                 <X className="h-4 w-4 text-slate-700" />
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {photoPreview && (
// //           <input
// //             type="range"
// //             min={MIN_ZOOM}
// //             max={MAX_ZOOM}
// //             step={0.05}
// //             value={zoom}
// //             onChange={(e) => handleZoomSlider(parseFloat(e.target.value))}
// //             className="w-36 accent-slate-600"
// //           />
// //         )}

// //         {photoError && <p className="text-sm text-red-500">{photoError}</p>}
// //       </div>

// //       {/* Personal Information */}
// //       <div className="grid grid-cols-2 gap-6">
// //         <div>
// //           <label className="font-medium">Full Name</label>

// //           <input
// //             {...register("fullName", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   fullName: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Hemendra Gour"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Professional Title</label>

// //           <input
// //             {...register("title", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   title: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Frontend Developer"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Email</label>

// //           <input
// //             type="email"
// //             {...register("email", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   email: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="hemendra@gmail.com"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">Phone</label>

// //           <input
// //             type="tel"
// //             {...register("phone", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   phone: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="+91 9876543210"
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="font-medium">Address</label>

// //           <input
// //             {...register("address", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   address: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="Bhopal, India"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">LinkedIn</label>

// //           <input
// //             {...register("linkedIn", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   linkedIn: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://linkedin.com/in/..."
// //           />
// //         </div>

// //         <div>
// //           <label className="font-medium">GitHub</label>

// //           <input
// //             {...register("github", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   github: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://github.com/..."
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="font-medium">Portfolio</label>

// //           <input
// //             type="url"
// //             {...register("portfolio", {
// //               onChange: (e) =>
// //                 updatePersonalInfo({
// //                   portfolio: e.target.value,
// //                 }),
// //             })}
// //             className="mt-2 h-12 w-full rounded-lg border px-4"
// //             placeholder="https://portfolio.com"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState, useRef, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { X, Pencil } from "lucide-react";

// import { useResumeStore } from "../../../../store/resume.store";

// export interface PersonalInfoFormData {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   address: string;
//   linkedIn: string;
//   github: string;
//   portfolio: string;
//   photo: string;
// }

// const PHOTO_SIZE = 144; // px, matches h-36 w-36
// const MIN_ZOOM = 1;
// const MAX_ZOOM = 2.5;

// export default function PersonalInfoSection() {
//   const resume = useResumeStore((state) => state.resume);

//   const updatePersonalInfo = useResumeStore(
//     (state) => state.updatePersonalInfo,
//   );

//   const [photoPreview, setPhotoPreview] = useState<string>("");
//   const [photoError, setPhotoError] = useState<string>("");

//   const containerRef = useRef<HTMLDivElement>(null);
//   const dragInfo = useRef<{
//     startX: number;
//     startY: number;
//     startPos: { x: number; y: number };
//     moved: boolean;
//   } | null>(null);

//   const zoom = resume?.personalInfo.photoZoom ?? 1;
//   const position = resume?.personalInfo.photoPosition ?? { x: 0, y: 0 };

//   const { register, reset } = useForm<PersonalInfoFormData>({
//     defaultValues: {
//       fullName: "",
//       title: "",
//       email: "",
//       phone: "",
//       address: "",
//       linkedIn: "",
//       github: "",
//       portfolio: "",
//       photo: "",
//     },
//   });

//   useEffect(() => {
//     if (!resume) return;

//     reset({
//       fullName: resume.personalInfo.fullName ?? "",
//       title: resume.personalInfo.title ?? "",
//       email: resume.personalInfo.email ?? "",
//       phone: resume.personalInfo.phone ?? "",
//       address: resume.personalInfo.address ?? "",
//       linkedIn: resume.personalInfo.linkedIn ?? "",
//       github: resume.personalInfo.github ?? "",
//       portfolio: resume.personalInfo.portfolio ?? "",
//     });

//     setPhotoPreview(resume.personalInfo.photo ?? "");
//   }, [resume, reset]);

//   const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));

//   // CREATE / UPDATE: handles both the first upload and replacing an existing photo
//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setPhotoError("");

//     if (!file.type.startsWith("image/")) {
//       setPhotoError("Please upload an image file.");
//       return;
//     }

//     // 2MB limit — adjust to whatever your backend / store expects
//     if (file.size > 2 * 1024 * 1024) {
//       setPhotoError("Image must be smaller than 2MB.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       const base64 = reader.result as string;
//       setPhotoPreview(base64);
//       // reset zoom/position for the new photo
//       updatePersonalInfo({ photo: base64, photoZoom: 1, photoPosition: { x: 0, y: 0 } });
//     };
//     reader.readAsDataURL(file);

//     // reset input value so re-selecting the same file still fires onChange
//     e.target.value = "";
//   };

//   // DELETE
//   const handleRemovePhoto = () => {
//     setPhotoPreview("");
//     setPhotoError("");
//     updatePersonalInfo({ photo: "", photoZoom: 1, photoPosition: { x: 0, y: 0 } });
//   };

//   // DRAG TO PAN
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (!photoPreview) return;
//     e.preventDefault();
//     dragInfo.current = {
//       startX: e.clientX,
//       startY: e.clientY,
//       startPos: position,
//       moved: false,
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//   };

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (!dragInfo.current) return;
//       const dx = e.clientX - dragInfo.current.startX;
//       const dy = e.clientY - dragInfo.current.startY;

//       if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
//         dragInfo.current.moved = true;
//       }

//       const fracX = dx / PHOTO_SIZE;
//       const fracY = dy / PHOTO_SIZE;
//       const max = (zoom - 1) / 2;

//       const newX = clamp(dragInfo.current.startPos.x + fracX, max);
//       const newY = clamp(dragInfo.current.startPos.y + fracY, max);

//       updatePersonalInfo({ photoPosition: { x: newX, y: newY } });
//     },
//     [zoom, updatePersonalInfo],
//   );

//   const handleMouseUp = useCallback(() => {
//     window.removeEventListener("mousemove", handleMouseMove);
//     window.removeEventListener("mouseup", handleMouseUp);
//     dragInfo.current = null;
//   }, [handleMouseMove]);

//   // SCROLL TO ZOOM
//   const handleWheel = (e: React.WheelEvent) => {
//     if (!photoPreview) return;
//     e.preventDefault();

//     const delta = e.deltaY > 0 ? -0.1 : 0.1;
//     const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + delta));
//     const max = (newZoom - 1) / 2;

//     updatePersonalInfo({
//       photoZoom: newZoom,
//       photoPosition: { x: clamp(position.x, max), y: clamp(position.y, max) },
//     });
//   };

//   const handleZoomSlider = (val: number) => {
//     const max = (val - 1) / 2;
//     updatePersonalInfo({
//       photoZoom: val,
//       photoPosition: { x: clamp(position.x, max), y: clamp(position.y, max) },
//     });
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col gap-2">
//         <div className="group relative h-36 w-36">
//           <div
//             ref={containerRef}
//             onMouseDown={handleMouseDown}
//             onWheel={handleWheel}
//             className="h-36 w-36 select-none overflow-hidden rounded-full border-2 border-dashed border-slate-300 hover:bg-slate-50"
//             style={{ cursor: photoPreview ? "move" : "default" }}
//           >
//             {photoPreview ? (
//               <img
//                 src={photoPreview}
//                 alt="Profile"
//                 draggable={false}
//                 className="relative left-1/2 top-1/2 h-full w-full object-cover"
//                 style={{
//                   transform: `translate(-50%, -50%) translate(${position.x * PHOTO_SIZE}px, ${position.y * PHOTO_SIZE}px) scale(${zoom})`,
//                 }}
//               />
//             ) : (
//               <label className="flex h-full w-full cursor-pointer items-center justify-center">
//                 <span className="text-sm text-slate-500">Upload</span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handlePhotoChange}
//                 />
//               </label>
//             )}
//           </div>

//           {photoPreview && (
//             <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
//               {/* EDIT: reuses the same hidden input to replace the photo */}
//               <label className="pointer-events-auto cursor-pointer rounded-full bg-white p-2 hover:bg-slate-100">
//                 <Pencil className="h-4 w-4 text-slate-700" />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handlePhotoChange}
//                 />
//               </label>

//               {/* DELETE */}
//               <button
//                 type="button"
//                 onClick={handleRemovePhoto}
//                 className="pointer-events-auto rounded-full bg-white p-2 hover:bg-slate-100"
//               >
//                 <X className="h-4 w-4 text-slate-700" />
//               </button>
//             </div>
//           )}
//         </div>

//         {photoPreview && (
//           <input
//             type="range"
//             min={MIN_ZOOM}
//             max={MAX_ZOOM}
//             step={0.05}
//             value={zoom}
//             onChange={(e) => handleZoomSlider(parseFloat(e.target.value))}
//             className="w-36 accent-slate-600"
//           />
//         )}

//         {photoError && <p className="text-sm text-red-500">{photoError}</p>}
//       </div>

//       {/* Personal Information */}
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="font-medium">Full Name</label>

//           <input
//             {...register("fullName", {
//               onChange: (e) =>
//                 updatePersonalInfo({
//                   fullName: e.target.value,
//                 }),
//             })}
//             className="mt-2 h-12 w-full rounded-lg border px-4"
//             placeholder="Hemendra Gour"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Professional Title</label>

//           <input
//             {...register("title", {
//               onChange: (e) =>
//                 updatePersonalInfo({
//                   title: e.target.value,
//                 }),
//             })}
//             className="mt-2 h-12 w-full rounded-lg border px-4"
//             placeholder="Frontend Developer"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Email</label>

//           <input
//             type="email"
//             {...register("email", {
//               onChange: (e) =>
//                 updatePersonalInfo({
//                   email: e.target.value,
//                 }),
//             })}
//             className="mt-2 h-12 w-full rounded-lg border px-4"
//             placeholder="hemendra@gmail.com"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Phone</label>

//           <input
//             type="tel"
//             {...register("phone", {
//               onChange: (e) =>
//                 updatePersonalInfo({
//                   phone: e.target.value,
//                 }),
//             })}
//             className="mt-2 h-12 w-full rounded-lg border px-4"
//             placeholder="+91 9876543210"
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="font-medium">Address</label>

//           <input
//             {...register("address", {
//               onChange: (e) =>
//                 updatePersonalInfo({
//                   address: e.target.value,
//                 }),
//             })}
//             className="mt-2 h-12 w-full rounded-lg border px-4"
//             placeholder="Bhopal, India"
//           />
//         </div>

//         <div>
//           <label className="font-medium">LinkedIn</label>

//           <input
//             {...register("linkedIn", {
//               onChange: (e) =>
//                 updatePersonalInfo({
//                   linkedIn: e.target.value,
//                 }),
//             })}
//             className="mt-2 h-12 w-full rounded-lg border px-4"
//             placeholder="https://linkedin.com/in/..."
//           />
//         </div>

//         <div>
//           <label className="font-medium">GitHub</label>

//           <input
//             {...register("github", {
//               onChange: (e) =>
//                 updatePersonalInfo({
//                   github: e.target.value,
//                 }),
//             })}
//             className="mt-2 h-12 w-full rounded-lg border px-4"
//             placeholder="https://github.com/..."
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="font-medium">Portfolio</label>

//           <input
//             type="url"
//             {...register("portfolio", {
//               onChange: (e) =>
//                 updatePersonalInfo({
//                   portfolio: e.target.value,
//                 }),
//             })}
//             className="mt-2 h-12 w-full rounded-lg border px-4"
//             placeholder="https://portfolio.com"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { X, Pencil } from "lucide-react";

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
  photo: string;
}

const PHOTO_SIZE = 144; // px, matches h-36 w-36
const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;

export default function PersonalInfoSection() {
  const resume = useResumeStore((state) => state.resume);

  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo,
  );

  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [photoError, setPhotoError] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<{
    startX: number;
    startY: number;
    startPos: { x: number; y: number };
    moved: boolean;
  } | null>(null);

  const zoom = resume?.personalInfo.photoZoom ?? 1;
  const position = resume?.personalInfo.photoPosition ?? { x: 0, y: 0 };

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
      photo: "",
    },
  });

  useEffect(() => {
    if (!resume) return;

    reset({
      fullName: resume.personalInfo.fullName ?? "",
      title: resume.personalInfo.title ?? "",
      email: resume.personalInfo.email ?? "",
      phone: resume.personalInfo.phone ?? "",
      address: resume.personalInfo.address ?? "",
      linkedIn: resume.personalInfo.linkedIn ?? "",
      github: resume.personalInfo.github ?? "",
      portfolio: resume.personalInfo.portfolio ?? "",
    });

    setPhotoPreview(resume.personalInfo.photo ?? "");
  }, [resume, reset]);

  const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));

  // CREATE / UPDATE: handles both the first upload and replacing an existing photo
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError("");

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please upload an image file.");
      return;
    }

    // 2MB limit — adjust to whatever your backend / store expects
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Image must be smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      // reset zoom/position for the new photo
      updatePersonalInfo({ photo: base64, photoZoom: 1, photoPosition: { x: 0, y: 0 } });
    };
    reader.readAsDataURL(file);

    // reset input value so re-selecting the same file still fires onChange
    e.target.value = "";
  };

  // DELETE
  const handleRemovePhoto = () => {
    setPhotoPreview("");
    setPhotoError("");
    updatePersonalInfo({ photo: "", photoZoom: 1, photoPosition: { x: 0, y: 0 } });
  };

  // DRAG TO PAN
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!photoPreview) return;
    e.preventDefault();
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: position,
      moved: false,
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragInfo.current) return;
      const dx = e.clientX - dragInfo.current.startX;
      const dy = e.clientY - dragInfo.current.startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragInfo.current.moved = true;
      }

      const fracX = dx / PHOTO_SIZE;
      const fracY = dy / PHOTO_SIZE;
      const max = (zoom - 1) / 2;

      const newX = clamp(dragInfo.current.startPos.x + fracX, max);
      const newY = clamp(dragInfo.current.startPos.y + fracY, max);

      updatePersonalInfo({ photoPosition: { x: newX, y: newY } });
    },
    [zoom, updatePersonalInfo],
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    dragInfo.current = null;
  }, [handleMouseMove]);

  // SCROLL TO ZOOM
  const handleWheel = (e: React.WheelEvent) => {
    if (!photoPreview) return;
    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + delta));
    const max = (newZoom - 1) / 2;

    updatePersonalInfo({
      photoZoom: newZoom,
      photoPosition: { x: clamp(position.x, max), y: clamp(position.y, max) },
    });
  };

  const handleZoomSlider = (val: number) => {
    const max = (val - 1) / 2;
    updatePersonalInfo({
      photoZoom: val,
      photoPosition: { x: clamp(position.x, max), y: clamp(position.y, max) },
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="group relative h-36 w-36">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            className="h-36 w-36 select-none overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-100"
            style={{ cursor: photoPreview ? "move" : "default" }}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                draggable={false}
                className="relative left-1/2 top-1/2 h-full w-full object-contain"
                style={{
                  transform: `translate(-50%, -50%) translate(${position.x * PHOTO_SIZE}px, ${position.y * PHOTO_SIZE}px) scale(${zoom})`,
                }}
              />
            ) : (
              <label className="flex h-full w-full cursor-pointer items-center justify-center">
                <span className="text-sm text-slate-500">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>

          {photoPreview && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              {/* EDIT: reuses the same hidden input to replace the photo */}
              <label className="pointer-events-auto cursor-pointer rounded-full bg-white p-2 hover:bg-slate-100">
                <Pencil className="h-4 w-4 text-slate-700" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>

              {/* DELETE */}
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="pointer-events-auto rounded-full bg-white p-2 hover:bg-slate-100"
              >
                <X className="h-4 w-4 text-slate-700" />
              </button>
            </div>
          )}
        </div>

        {photoPreview && (
          <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.05}
            value={zoom}
            onChange={(e) => handleZoomSlider(parseFloat(e.target.value))}
            className="w-36 accent-slate-600"
          />
        )}

        {photoError && <p className="text-sm text-red-500">{photoError}</p>}
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
            {...register("phone", {
              onChange: (e) =>
                updatePersonalInfo({
                  phone: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="+91 9876543210"
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Address</label>

          <input
            {...register("address", {
              onChange: (e) =>
                updatePersonalInfo({
                  address: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="Bhopal, India"
          />
        </div>

        <div>
          <label className="font-medium">LinkedIn</label>

          <input
            {...register("linkedIn", {
              onChange: (e) =>
                updatePersonalInfo({
                  linkedIn: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div>
          <label className="font-medium">GitHub</label>

          <input
            {...register("github", {
              onChange: (e) =>
                updatePersonalInfo({
                  github: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://github.com/..."
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Portfolio</label>

          <input
            type="url"
            {...register("portfolio", {
              onChange: (e) =>
                updatePersonalInfo({
                  portfolio: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://portfolio.com"
          />
        </div>
      </div>
    </div>
  );
}