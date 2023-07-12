import CourseCreation from "./CourseCreation"
import CourseUploadTips from "./CourseUploadTips"

const AddCourse = () => {
  return (
    <div className="my-6 max-w-maxContent mx-auto">
      <div className="flex flex-wrap gap-6 justify-center px-2">
        <CourseCreation />
        <CourseUploadTips />
      </div>
    </div>
  )
}

export default AddCourse