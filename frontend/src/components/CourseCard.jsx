import { useNavigate } from "react-router-dom";


export default function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/courses/:id`)}
      className="cursor-pointer bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition"
    >
      <img src={course.thumbnailUrl} alt={course.title} className="w-full object-cover rounded mb-2" />
      <h3 className="text-2xl font-bold">{course.title}</h3>
      <div className="text-black-500 text-[18px]">{course.description}</div>
      <div className="text-blue-600 font-semibold text-[20px]">{course.category}</div>
    </div>
  );
}
