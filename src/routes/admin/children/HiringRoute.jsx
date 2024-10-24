import { HiringDashboard } from "@/pages/admin/menu/hiring";
import { OfferToBeFinalized } from "@/pages/admin/menu/hiring/overview/OfferToBeFinalized";
import { ReadyToHiring } from "@/pages/admin/menu/hiring/overview/ReadyToHiring";

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
        element: <ReadyToHiring />,
      },
      {
        path: "offer-to-be-finalized",
        element: <OfferToBeFinalized />,
      },
    ],
  },
];
