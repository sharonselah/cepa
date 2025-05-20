import Link from "next/link";

const cardData = [
  {
    heading: "Data Aggregation",
    body: "Explore climate and energy data across seven key sectors! Gain insights that empower action and drive sustainable impact in Africa.",
    linkText: "View Data",
    linkHref: "/data",
    bgColor: "bg-[#f3f2e9]",
  },
  
  {
    heading: "Grant",
    body: "Submit your project for funding! Get vetted, gain stakeholder support, and secure grants to drive real-world climate impact.",
    linkText: "Apply for Grant",
    linkHref: "https://d7x3yzflik5mk.cloudfront.net/auth/sign-in?returnTo=%2Fdashboard",
    bgColor: "bg-[#e6f1e8]",
  },
  {
    heading: "Contribution",
    body: "Help build Africa’s leading climate data hub! Add or refine data, provide local insights, and get paid for verified contributions.",
    linkText: "Be a Contributor",
    linkHref: "/contributor",
    bgColor: "bg-[#f2e4d6]",
  },
];

const Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-4 p-8">
      {cardData.map((card, index) => (
        <div key={index} className={`${card.bgColor} text-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between gap-4`}>
          <h4 className="text-lg font-semibold">{card.heading}</h4>
          <p className="text-sm leading-7">{card.body}</p>
          <div className="flex items-center gap-2 font-bold mt-4">
            <Link href={card.linkHref}>{card.linkText}</Link>
            <span>&rarr;</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
