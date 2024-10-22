import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import {
  customSelectResumeStyles,
  customSelectStyles,
  customSelectTransferStyles,
} from "@/utils/customStyles";
import { Link } from "react-router-dom";
import MenuHeader from "@/components/common/MenuHeader";
import { Mail, MapPin, Phone, SquarePen, X } from "lucide-react";
import Addtransfer from "@/components/popups/recruiter/candiadate/AddTransfer.jsx";
import RecSaveFormCandidate from "@/components/recruiter/candidate/SaveForm";

function CandidateProfile() {
  const options = [
    { value: "active", label: "Transfer to job" },
    { value: "paused", label: "Paused" },
    { value: "delayed", label: "Delayed" },
    { value: "canceled", label: "Canceled" },
  ];
  const [popupOpen, setPopupOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoader(true);
    handleEmployee(data);
  };
  const handleEmployee = (data) => {
    console.log(data);
  };
  return (
    <>
      <RecSaveFormCandidate type="update" />
    </>
  );
}

export default CandidateProfile;
