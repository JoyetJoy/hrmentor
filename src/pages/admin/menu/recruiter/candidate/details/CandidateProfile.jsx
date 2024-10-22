import MenuHeader from "@/components/common/MenuHeader";
import RecSaveFormCandidate from "@/components/recruiter/candidate/SaveForm";

function CandidateProfile() {
  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <RecSaveFormCandidate type="update" />
    </>
  );
}

export default CandidateProfile;
