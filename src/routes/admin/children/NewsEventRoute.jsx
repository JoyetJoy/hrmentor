import CreateEvent from "@/pages/admin/masters/news_events/CreateEvent";
import CreateNews from "@/pages/admin/masters/news_events/CreateNews";
import NewsAndEventsView from "@/pages/admin/masters/news_events/NewsAndEventsView";
import Event from "@/pages/admin/masters/news_events/Event";
import News from "@/pages/admin/masters/news_events/News";
import NewsAndEventDetails from "@/pages/admin/masters/news_events/NewsAndEventDetails";

export const  NewsEventRoute = [
    {
        path:"news",
        element:<News/>
    },
    {
        path:"create-news",
        element:<CreateNews/>
    },
    {
        path:"event",
        element:<Event/>
    },
    {
        path:"create-event",
        element:<CreateEvent/>
    },
    {
        path:"view",
        element:<NewsAndEventsView/>
    },
    {
        path:"detail",
        element:<NewsAndEventDetails/>
    },

]