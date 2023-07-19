import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import "./styles.css";

import CourseCard from "./CourseCard";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {
        Courses?.length === 0 ?
          <p className="flex items-center justify-center py-10 text-3xl font-semibold text-richblack-500">No Courses</p> : (
            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={24}
              pagination={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              navigation={true}
              modules={[Pagination, Autoplay, Navigation]}
              breakpoints={{
                1024: { slidesPerView: 3 }
              }}
              centerInsufficientSlides={true}
              className="mySwiper"
            >
              {
                Courses?.map((course, index) => (
                  <SwiperSlide key={index}>
                    <CourseCard course={course} Height={"h-[201px]"} />
                  </SwiperSlide>
                ))
              }
            </Swiper >
          )
      }
    </>
  )
}

export default CourseSlider