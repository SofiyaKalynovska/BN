// import React, { useState, useEffect } from "react";
// import { getOptions, generateNote } from "./api";
// interface Options {
//     levelOfCare: string[];
//     insurance: string[];
//     noteType: string[];
//     noteFormat: string[];
// }

// const DoctorHome: React.FC = () => {
//     const [name, setName] = useState<string>('');
//     const [medicalRecordNumber, setMedicalRecordNumber] = useState<string>('');
//     const [levelOfCareOptions, setLevelOfCareOptions] = useState<string[]>([]);
//     const [insuranceOptions, setInsuranceOptions] = useState<string[]>([]);
//     const [noteTypeOptions, setNoteTypeOptions] = useState<string[]>([]);
//     const [noteFormatOptions, setNoteFormatOptions] = useState<string[]>([]);
//     const [generatedNote, setGeneratedNote] = useState<string>('');

//     useEffect(() => {
//         const fetchOptions = async () => {
//             try {
//                 const options: Options = await getOptions();
//                 setLevelOfCareOptions(options.levelOfCare);
//                 setInsuranceOptions(options.insurance);
//                 setNoteTypeOptions(options.noteType);
//                 setNoteFormatOptions(options.noteFormat);
//             } catch (error: any) {
//                 console.error("Error fetching options:", error);
//             }
//         };
//         fetchOptions();
//     }, []);

//     const handleGenerateNote = async () => {
//         const formData = {
//             name,
//             medicalRecordNumber,
//         };
//         try {
//             const generatedNoteData = await generateNote(formData);
//             setGeneratedNote(generatedNoteData);
//         } catch (error: any) {
//             console.error("Error generating note:", error);
//         }
//     };

//     return (
//         <div className="mx-auto px-8 pt-9 pb-4 container size-full">
//             <h2 className="mb-4 font-semibold text-2xl">Generate Note</h2>
//             <form onSubmit={handleGenerateNote}>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block font-semibold">Name:</label>
//                     <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="px-2 py-1 border rounded w-full" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="medicalRecordNumber" className="block font-semibold">Medical Record Number:</label>
//                     <input type="text" id="medicalRecordNumber" value={medicalRecordNumber} onChange={(e) => setMedicalRecordNumber(e.target.value)} className="px-2 py-1 border rounded w-full" />
//                 </div>
//                 <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">Generate Note</button>
//             </form>
//             {generatedNote && (
//                 <div className="mt-4">
//                     <h3 className="font-semibold">Generated Note:</h3>
//                     <p>{generatedNote}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DoctorHome;


// import React, { useState, useEffect } from "react";
// import { getOptions, generateNote } from "./api";
// import { Dropdown, MenuItemType } from "../../shared/ui/Dropdown/Dropdown";

// interface Options {
//     levelOfCare: string[];
//     insurance: string[];
//     noteType: string[];
//     noteFormat: string[];
// }

// const DoctorHome: React.FC = () => {
//     const [name, setName] = useState<string>('');
//     const [medicalRecordNumber, setMedicalRecordNumber] = useState<string>('');
//     const [levelOfCareOptions, setLevelOfCareOptions] = useState<string[]>([]);
//     const [insuranceOptions, setInsuranceOptions] = useState<string[]>([]);
//     const [noteTypeOptions, setNoteTypeOptions] = useState<string[]>([]);
//     const [noteFormatOptions, setNoteFormatOptions] = useState<string[]>([]);

//     useEffect(() => {
//         const fetchOptions = async () => {
//             try {
//                 const options: Options = await getOptions();
//                 setLevelOfCareOptions(options.levelOfCare);
//                 setInsuranceOptions(options.insurance);
//                 setNoteTypeOptions(options.noteType);
//                 setNoteFormatOptions(options.noteFormat);
//             } catch (error: any) {
//                 console.error("Error fetching options:", error);
//             }
//         };
//         fetchOptions();
//     }, []);

//     return (
//         <div className="mx-auto px-8 pt-9 pb-4 container size-full">
//             <h2 className="mb-4 font-semibold text-2xl">Generate Note</h2>
//             <form onSubmit={handleGenerateNote}>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block font-semibold">Name:</label>
//                     <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="px-2 py-1 border rounded w-full" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="medicalRecordNumber" className="block font-semibold">Medical Record Number:</label>
//                     <input type="text" id="medicalRecordNumber" value={medicalRecordNumber} onChange={(e) => setMedicalRecordNumber(e.target.value)} className="px-2 py-1 border rounded w-full" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block font-semibold">Level of Care:</label>
//                     <Dropdown
//                         items={levelOfCareOptions.map(option => ({ key: option, label: option }))}
//                         onChange={(selectedItem: MenuItemType) => {
//                         }}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block font-semibold">Insurance:</label>
//                     <Dropdown
//                         items={insuranceOptions.map(option => ({ key: option, label: option }))}
//                         onChange={(selectedItem: MenuItemType) => {
//                         }}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block font-semibold">Note Type:</label>
//                     <Dropdown
//                         items={noteTypeOptions.map(option => ({ key: option, label: option }))}
//                         onChange={(selectedItem: MenuItemType) => {
//                         }}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block font-semibold">Note Format:</label>
//                     <Dropdown
//                         items={noteFormatOptions.map(option => ({ key: option, label: option }))}
//                         onChange={(selectedItem: MenuItemType) => {
//                         }}
//                     />
//                 </div>

//                 <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">Generate Note</button>
//             </form>
//             {generatedNote && (
//                 <div className="mt-4">
//                     <h3 className="font-semibold">Generated Note:</h3>
//                     <p>{generatedNote}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DoctorHome;

import React, { useState } from "react";
import { generateNote } from "./api";
import { Dropdown, MenuItemType } from "../../shared/ui/Dropdown/Dropdown";

const DoctorHome: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [medicalRecordNumber, setMedicalRecordNumber] = useState<string>('');
    const [generatedNote, setGeneratedNote] = useState<string>('');
    const [selectedLevelOfCareIndex, setSelectedLevelOfCareIndex] = useState<number>(0);
    const [selectedInsuranceIndex, setSelectedInsuranceIndex] = useState<number>(0);
    const [selectedNoteTypeIndex, setSelectedNoteTypeIndex] = useState<number>(0);
    const [selectedNoteFormatIndex, setSelectedNoteFormatIndex] = useState<number>(0);

    const levelOfCareOptions = ['Detox', 'Intensive Inpatient Rehab', 'Residential', 'PHP (Day/Night)', 'IOP'];
    const insuranceOptions = ['sdcw', 'wdscfwev', 'wdcwe', 'wfwef'];
    const noteFormatOptions = ['Narative', 'Dap Note', 'SOAP Note', 'Treatment Planning Note'];
    const noteTypeOptions = ['Individual Note', 'Group Note', 'Ancillary Progress Note', 'UR Note', 'Nursing Note', 'Physician Note'];

    const handleGenerateNote = async () => {
        const formData = {
            name,
            medicalRecordNumber,
            levelOfCare: levelOfCareOptions[selectedLevelOfCareIndex],
            insurance: insuranceOptions[selectedInsuranceIndex],
            noteType: noteTypeOptions[selectedNoteTypeIndex],
            noteFormat: noteFormatOptions[selectedNoteFormatIndex]
        };
        try {
            const generatedNoteData = await generateNote(formData);
            setGeneratedNote(generatedNoteData);
        } catch (error: any) {
            console.error("Error generating note:", error);
        }
    };

    return (
        <div className="mx-auto px-8 pt-9 pb-4 container size-full">
            <h2 className="mb-4 font-semibold text-2xl">Generate Note</h2>
            <form onSubmit={handleGenerateNote}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="px-2 py-1 border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="medicalRecordNumber" className="block font-semibold">Medical Record Number:</label>
                    <input type="text" id="medicalRecordNumber" value={medicalRecordNumber} onChange={(e) => setMedicalRecordNumber(e.target.value)} className="px-2 py-1 border rounded w-full" />
                </div>
                <Dropdown
                    items={levelOfCareOptions.map(option => ({ key: option, label: option }))}
                    onChange={(selectedItem: MenuItemType, index: number) => {
                        setSelectedLevelOfCareIndex(index);
                    }}
                />
                <Dropdown
                    items={insuranceOptions.map(option => ({ key: option, label: option }))}
                    onChange={(selectedItem: MenuItemType, index: number) => {
                        setSelectedInsuranceIndex(index);
                    }}
                />
                <Dropdown
                    items={noteTypeOptions.map(option => ({ key: option, label: option }))}
                    onChange={(selectedItem: MenuItemType, index: number) => {
                        setSelectedNoteTypeIndex(index);
                    }}
                />
                <Dropdown
                    items={noteFormatOptions.map(option => ({ key: option, label: option }))}
                    onChange={(selectedItem: MenuItemType, index: number) => {
                        setSelectedNoteFormatIndex(index);
                    }}
                />
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">Generate Note</button>
            </form>
            {generatedNote && (
                <div className="mt-4">
                    <h3 className="font-semibold">Generated Note:</h3>
                    <p>{generatedNote}</p>
                </div>
            )}
        </div>
    );
};

export default DoctorHome;
