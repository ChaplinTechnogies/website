"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { useI18n } from "../contexts/I18nContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Member {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const members: Member[] = [
  {
    name: "Bessora Neema Hirwa",
    role: "CEO",
    image: "/profile.webp",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Kayla Elyse",
    role: "CTO",
    image: "/profile.webp",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    name: "Zeenab",
    role: "Project Manager",
    image: "/profile.webp",
    linkedin: "#",
  },
  {
    name: "Saransh",
    role: "Developer",
    image: "/profile.webp",
    linkedin: "#",
    github: "#",
  },
];

export default function TeamSlider() {
  const { t } = useI18n();
  
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          {t("team.title")}
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={800}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {members.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg p-6 text-center transition transform hover:scale-105 hover:shadow-2xl duration-300">
                <div className="relative w-36 h-36 mx-auto mb-4 overflow-hidden rounded-full border-4 border-blue-100 shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-4 text-gray-500">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-900 transition-colors"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
