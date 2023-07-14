import React from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState([]);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        const getCategoryDetails = async () => {
            const { data } = await apiConnector("GET", categories.CATEGORIES_API);
            console.log(data);

            const category_id = data.allCategories.filter(category => category.name.replace(" ", "-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategoryDetails();
    }, [catalogName]);

    useEffect(() => {
        if (categoryId) {
            const getCategoryDetails = async () => {
                try {
                    const res = await getCatalogPageData(categoryId);
                    setCatalogPageData(res);
                    console.log("YOOO",res)
                } catch (error) {
                    console.log(error);
                }
            }
            getCategoryDetails();
        }
    }, [categoryId])

    return (
        <div>
            <div className='bg-richblack-800 py-[2%]'>
                <div className='flex flex-col gap-3 py-8 w-11/12 max-w-maxContent mx-auto'>
                    <p className='text-richblack-300 text-sm leading-[157.143%]'>Home <span className='text-richblack-600'>/</span> Catalog <span className='text-richblack-600'>/</span> <span className='capitalize text-yellow-50 font-semibold'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
                    <p className='capitalize text-richblack-5 text-3xl leading-[126.667%] font-medium'>{catalogPageData?.data?.selectedCategory?.name}</p>
                    <p className='capitalize text-richblack-200 text-sm leading-[157.143%]'>{catalogPageData?.data?.selectedCategory?.description}</p>
                </div>
            </div>

            <div className='w-11/12 max-w-maxContent mx-auto mt-16 mb-20'>
                {/* SECTION 1 */}
                <div>
                    <h3 className='text-richblack-5 text-3xl leading-[126.667%] font-semibold mb-2'>Courses to get you started</h3>
                    <div className='flex gap-x-6 border-b-[1px] border-richblack-600 pb-2 pl-3'>
                        <p>Most Popular</p>
                        <p>New</p>
                    </div>
                    <div className='mt-10'>
                        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                    </div>
                </div>

                {/* SECTION 2 */}
                <div className='mt-[3.25rem]'>
                    <h3 className='text-richblack-5 font-semibold text-3xl leading-[126.667%]'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</h3>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                    </div>
                </div>

                {/* SECTION 3 */}
                <div className='mt-[5.625rem]'>
                    <h3  className='text-richblack-5 font-semibold text-3xl leading-[126.667%] mb-10'>Frequently Bought</h3>
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {
                                catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                    <CourseCard course={course} key={index} Height={"h-[304px]"} />
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Catalog