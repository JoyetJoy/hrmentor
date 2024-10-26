import { HIRING_TEMPLATE } from "@/api/hiring";
import { HiringMasters } from "@/components/hiring/settings/Listing";
import { hirColumnKeysForTemplate } from "@/lib/columns/hiring";

export const HiringDocumentAndTemplate = () => {
  return (
    <HiringMasters
      api={HIRING_TEMPLATE}
      qryKey={"recJobDescriptionList"}
      colKeys={hirColumnKeysForTemplate}
      type={"Document & Templates"}
    />
  );
};
