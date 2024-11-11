import {
  DELETE_PROFILE_QUESTIONNAIRE,
  GET_PROFILE_QUESTIONNAIRE,
} from "@/api/recruiter";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import EditQuestionnaireForm from "@/components/popups/recruiter/createjob/EditQuestionnaire";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function QuestionnaireListing({ jobProfileQuestionnaire, jid }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedField}
        qrkey={"jobProfileQuestionnaire"}
        api={DELETE_PROFILE_QUESTIONNAIRE}
      />
      <EditQuestionnaireForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"jobProfileQuestionnaire"}
        api={GET_PROFILE_QUESTIONNAIRE}
        jid={jid}
      />
      <div className="w-full rounded-md border border-[#ECE9F1]">
        <h1 className="rounded-t-sm bg-gray-soft px-5 py-5 text-sm font-semibold text-hrmdarkblue">
          Candidate profile questions
        </h1>
        {jobProfileQuestionnaire?.length ? (
          <div className="flex h-60 min-h-60 flex-col gap-2 px-4 py-4">
            {jobProfileQuestionnaire?.map((i) => (
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-textcolor-darkCharcoal">
                  {i?.question}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => {
                      setPopupOpen(true);
                      setSelectedField(i?.id);
                    }}
                    className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
                  >
                    <img
                      src="/assets/icons/admin/marker.svg"
                      className="w-full object-contain"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setDeletePopup(true);
                      setSelectedField(i?.id);
                    }}
                    className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2"
                  >
                    <Trash2 className="size-3 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-60 min-h-60 px-4 py-20">
            <p className="my text-center">
              The questions you have created <br />
              will appear here
            </p>
          </div>
        )}
      </div>
    </>
  );
}
