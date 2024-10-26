import { Link } from "react-router-dom";

const cardData = [
  {
    path: "overview/ready-to-hiring",
    title: "Ready to Hiring",
    count: 5,
    bgColor: "#FEF8E9",
    imgSrc: "/assets/images/hiring/1.png",
  },
  {
    path: "overview/offer-to-be-finalized",
    title: "Offer to be finalized",
    count: 1322,
    bgColor: "#F8F3FF",
    imgSrc: "/assets/images/hiring/2.png",
  },
  {
    path: "overview/upcoming",
    title: "Offer Accepted",
    count: 99,
    bgColor: "#F2EAF2",
    imgSrc: "/assets/images/hiring/5.svg",
  },
  {
    path: "overview/hired",
    title: "Hired",
    count: 99,
    bgColor: "#EBF9ED",
    imgSrc: "/assets/images/hiring/3.png",
  },
  {
    path: "overview/offer-declined",
    title: "Offer declined",
    count: 3,
    bgColor: "#FEEDDF",
    imgSrc: "/assets/images/hiring/4.png",
  },
];

export const OverviewCards = () => {
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
