import Image from "next/image";

export default function PartnerInstitutionsGrid() {
  const partners = [
    {
      name: "Education Commissions",
      src: "/icons/education-commisions.png",
    },
    {
      name: "Department of Examinations",
      src: "/icons/examinations-2.png",
    },
    {
      name: "National Institute of Education",
      src: "/icons/nie.png",
    },
    {
      name: "State Printing Corporation",
      src: "/icons/state-printing.png",
    },
  ];

  return (
    <section
      className="bg-white px-4 py-14 sm:py-16"
      aria-labelledby="related-sites-title"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="related-sites-title"
          className="text-center text-3xl font-bold text-brand sm:text-4xl"
        >
          Related sites
        </h2>
        <div className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-10 lg:mt-12 lg:gap-x-14">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-24 w-full max-w-52 items-center justify-center px-3 transition-transform hover:scale-105"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={220}
                height={96}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
