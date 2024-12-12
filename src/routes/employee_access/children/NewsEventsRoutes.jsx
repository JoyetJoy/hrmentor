import NewsAndEventDetails from "@/pages/employee_access/news_event/NewsAndEventDetails";
import NewsAndEventsView from "@/pages/employee_access/news_event/NewsAndEventsView";

export const NewsEventsRoutes = [
    {
        path:"view",
        element:<NewsAndEventsView/>
    },
    {
        path:"detail",
        element:<NewsAndEventDetails/>
    },
]