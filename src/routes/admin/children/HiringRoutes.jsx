import { HiringDashboard } from "@/pages/admin/menu/hiring";
import HiringCandidateDetails from "@/pages/admin/menu/hiring/candidate/Detail";
import { HiredCandidates } from "@/pages/admin/menu/hiring/Hired";
import { OfferToBeFinalizedListing } from "@/pages/admin/menu/hiring/overview/offer-to-finalize/Index";
import { OfferDeclined } from "@/pages/admin/menu/hiring/overview/OfferDeclined";
import { FinalizeOfferLetter } from "@/pages/admin/menu/hiring/overview/ready-to-hiring/FinalizeOfferLetter";
import { ReadyToHiring } from "@/pages/admin/menu/hiring/overview/ready-to-hiring/Index";
import { Upcoming } from "@/pages/admin/menu/hiring/overview/Upcoming";
import { HiringDocumentAndTemplate } from "@/pages/admin/menu/hiring/settings/Index";

export const HiringRoutes = [
  {
    index: true,
    element: <HiringDashboard />,
  },
  {
    path: "hired",
    element: <HiredCandidates />,
  },
  {
    path: "view-candidate",
    element: <HiringCandidateDetails />,
  },
  {
    path: "overview",
    children: [
      {
        path: "ready-to-hiring",
        children: [
          {
            path: "",
            element: <ReadyToHiring />,
          },
        ],
      },
      {
        path: "offer-to-be-finalized",
        element: <OfferToBeFinalizedListing />,
      },
      {
        path: "finalize-offer",
        element: <FinalizeOfferLetter />,
      },

      {
        path: "upcoming",
        element: <Upcoming />,
      },
      {
        path: "offer-declined",
        element: <OfferDeclined />,
      },
    ],
  },
  {
    path: "settings",
    children: [
      {
        path: "",
        element: <HiringDocumentAndTemplate />,
      },
    ],
  },
];
