export const employeeMasterOptions = [
  { id: "1", value: 1, label: "Active" },
  { id: "0", value: 0, label: "In Active" },
];

// employment type
export const employeeColumnKeysForEmployeeType = {
  field1: { key: "employment_type_name", label: "Employee Type Name" },
  field2: { key: "employment_type_status", label: "Status" },
};

// designation
export const employeeColumnKeysForDesignation = {
  field1: { key: "designation_name", label: "Designation Name" },
  field2: { key: "designation_status", label: "Status" },
};

// department
export const employeeColumnKeysForDepartment = {
  field1: { key: "department_name", label: "Department Name" },
  field2: { key: "department_status", label: "Status" },
};

// work location
export const employeeColumnKeysForWorkLocation = {
  field1: { key: "work_location_name", label: "Work Location Name" },
  field2: { key: "status", label: "Status" },
  field3: { key: "work_location_address", label: "Address" },
};

// ethnicity
export const employeeColumnKeysForEthnicity = {
  field1: { key: "ethnicity_name", label: "Ethnicity Name" },
  field2: { key: "ethnicity_status", label: "Status" },
};

// eeo job category
export const employeeColumnKeysForEeoJobCategory = {
  field1: {
    key: "eeo__job__category_type_name",
    label: "EEO Job Category Name",
  },
  field2: { key: "eeo__job__category_type_status", label: "Status" },
};

// document type
export const employeeColumnKeysForDocumentType = {
  field1: { key: "employee_document_type_name", label: "Document Type Name" },
  field2: { key: "employee_document_type_status", label: "Status" },
};

// blood grops
export const bloodGroups = [
  { id: 1, label: "O+", value: "O+" },
  { id: 2, label: "O-", value: "O-" },
  { id: 3, label: "A+", value: "A+" },
  { id: 4, label: "A-", value: "A-" },
  { id: 5, label: "B+", value: "B+" },
  { id: 6, label: "B-", value: "B-" },
  { id: 7, label: "AB+", value: "AB+" },
  { id: 8, label: "AB-", value: "AB-" },
];

// gender
export const genders = [
  { id: 1, label: "Male", value: "male" },
  { id: 2, label: "Female", value: "female" },
  { id: 3, label: "Other", value: "other" },
];

// marital status
export const maritalStatuses = [
  { id: 1, label: "Single", value: "single" },
  { id: 2, label: "Married", value: "married" },
  { id: 3, label: "Divorced", value: "divorced" },
  { id: 4, label: "Widowed", value: "widowed" },
];

// nationality
export const nationalities = [
  { id: 1, label: "Indian", value: "Indian" },
  { id: 2, label: "American", value: "American" },
  { id: 3, label: "British", value: "British" },
  { id: 4, label: "Other", value: "Other" },
];
