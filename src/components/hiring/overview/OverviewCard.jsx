import { Link } from "react-router-dom";

export const OverviewCards = ({ data }) => {
  const cardData = [
    {
      path: "overview/ready-to-hiring",
      title: "Ready to Hiring",
      count: `${data?.candidatesHiringCount}`,
      bgColor: "#FEF8E9",
      imgSrc: "/assets/images/hiring/1.png",
    },
    {
      path: `overview/listing?type=offer`,
      title: "Offer to be finalized",
      count: 1322,
      count: `${data?.offer_requested_candidates}`,
      bgColor: "#F8F3FF",
      imgSrc: "/assets/images/hiring/2.png",
    },
    {
      path: "overview/listing?type=accepted",
      title: "Offer Accepted",
      count: `${data?.conditional_offer_accepted_candidates}`,
      bgColor: "#F2EAF2",
      imgSrc: "/assets/images/hiring/5.svg",
    },
    {
      path: "overview/listing?type=hired",
      title: "Hired",
      count: `${data?.hired_candidates ?? 0}`,
      bgColor: "#EBF9ED",
      imgSrc: "/assets/images/hiring/3.png",
    },
    {
      path: "overview/listing?type=declined",
      title: "Offer declined",
      count: `${data?.offer_rejected}`,
      bgColor: "#FEEDDF",
      imgSrc: "/assets/images/hiring/4.png",
    },
  ];
  return (
    <div className="grid grid-cols-5 gap-3">
      {cardData.map((card, index) => (
        <Link key={index} to={card.path}>
          <div
            className="text-md flex items-center justify-between rounded-sm p-5 font-semibold"
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="flex flex-col gap-3">
              <div className="text-sm font-medium">{card.title}</div>
              <div className="text-3xl font-semibold">{card.count}</div>
            </div>
            <img
              src={card.imgSrc}
              className="h-12 object-contain"
              alt={card.title}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
