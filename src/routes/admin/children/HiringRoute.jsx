import { HiringDashboard } from "@/pages/admin/menu/hiring";
import { OfferToBeFinalized } from "@/pages/admin/menu/hiring/overview/offer-to-finalize/Index";
import { OfferDeclined } from "@/pages/admin/menu/hiring/overview/OfferDeclined";
import { ReadyToHiring } from "@/pages/admin/menu/hiring/overview/readyToHiring/ReadyToHiring";
import { Index } from "@/pages/admin/menu/hiring/overview/readyToHiring/sentOfferLetter/Index";
import { Upcoming } from "@/pages/admin/menu/hiring/overview/Upcoming";

export const HiringRoutes = [
  {
    index: true,
    element: <HiringDashboard />,
  },

  //   ---- hiring overview ----
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
          {
            path: "offer-to-be-finalized",
            element: <Index />,
          },
        ],
      },
      {
        path: "offer-to-be-finalized",
        element: <OfferToBeFinalized />,
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
];
