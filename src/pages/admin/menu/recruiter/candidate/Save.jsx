import MenuHeader from "@/components/common/MenuHeader";
import RecSaveFormCandidate from "@/components/recruiter/candidate/SaveForm";

function SaveCandidates() {
  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Candidates"}
      />
      <RecSaveFormCandidate type="save" />
    </>
  );
}

export default SaveCandidates;
