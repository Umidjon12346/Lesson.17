import { Button, message, Tag, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useGeneral } from "../../hooks";
import LessonModal from "./lessons-list-modal";

function LessonLists({ lessons }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const [description, setDescription] = useState("");
  const { updateLessonStatus } = useGeneral();
  const { mutate: updateFn } = updateLessonStatus();

  const today = dayjs().format("YYYY-MM-DD");
  const todayLessonIndex = lessons.findIndex(
    (lesson: any) => dayjs(lesson.date).format("YYYY-MM-DD") === today
  );

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const goNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 50, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -50, behavior: "smooth" });
    }
  };

  const isStartDisabled = () => {
    if (!containerRef.current) return true;
    return scrollPosition <= 5;
  };

  const isEndDisabled = () => {
    if (!containerRef.current) return true;
    const container = containerRef.current;
    return scrollPosition + container.clientWidth >= container.scrollWidth - 3;
  };

  const handleLessonClick = (lesson: any, index: number) => {
    setSelectedLesson({ ...lesson, index });
    setStatus(lesson.status || "pending");
    setDescription(lesson.description || "");
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    if (!selectedLesson) return;

    updateFn(
      {
        id: selectedLesson.id,
        status,
        note: description,
      },
      {
        onSuccess: () => {
          message.success("Lesson status successfully updated");
        },
        onError: () => {
          message.error("An error occurred");
        },
      }
    );

    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cancelled":
        return "bg-red-400";
      case "kechiktirilgan":
        return "bg-yellow-400";
      case "completed":
        return "bg-green-200";
      case "new":
        return "bg-[#ccc]";
      default:
        return "";
    }
  };

  // Scroll to today's lesson
  useEffect(() => {
    if (!containerRef.current || todayLessonIndex === -1) return;

    const container = containerRef.current;
    const lessonWidth = 76; // approx width + gap
    const scrollTo =
      lessonWidth * todayLessonIndex -
      container.clientWidth / 2 +
      lessonWidth / 2;

    container.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  }, [lessons]);

  // Mark past lessons as completed if no status
  useEffect(() => {
    const pastLessons = lessons.filter(
      (lesson: any) =>
        dayjs(lesson.date).isBefore(dayjs(), "day") &&
        (!lesson.status || lesson.status === "")
    );

    pastLessons.forEach((lesson: any) => {
      updateFn({
        id: lesson.id,
        status: "completed",
        note: "Automatically marked as completed",
      });
    });
  }, [lessons]);

  return (
    <div className="relative mt-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Lesson Schedule
        </h2>
        {/* Statistics */}
        <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
          <span>Total lessons:</span>
          <Tag color="blue">{lessons.length}</Tag>

          <span>Cancelled:</span>
          <Tag color="red">
            {
              lessons.filter((lesson: any) => lesson.status === "cancelled")
                .length
            }
          </Tag>

          <span>Completed:</span>
          <Tag color="green">
            {
              lessons.filter((lesson: any) => lesson.status === "completed")
                .length
            }
          </Tag>
        </div>
      </div>

      {/* Container */}
      <div className="relative bg-white rounded-2xl overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Lesson List */}
        <div className="flex items-center p-4 gap-2">
          {/* Prev Button */}
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={goPrev}
            disabled={isStartDisabled()}
          />

          {/* Scrollable Lessons */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-x-auto overflow-y-hidden py-2 px-1 flex gap-3 scroll-smooth [&::-webkit-scrollbar]:hidden"
          >
            {lessons.map((lesson: any, index: number) => {
              const formattedDate = dayjs(lesson.date).format("DD.MM");
              const dayName = dayjs(lesson.date).format("ddd").toUpperCase();
              const statusColor = getStatusColor(lesson.status);
              const isToday = dayjs(lesson.date).format("YYYY-MM-DD") === today;

              return (
                <Tooltip
                  key={lesson.id}
                  title={
                    <div className="text-center">
                      <div className="font-semibold">Lesson {index + 1}</div>
                      {lesson.notes && (
                        <div className="text-xs mt-1">{lesson.notes}</div>
                      )}
                    </div>
                  }
                >
                  <div
                    className={`
                      min-w-[70px] h-[70px] 
                      ${statusColor} rounded-xl flex flex-col items-center justify-center cursor-pointer 
                      hover:scale-105 transition-all
                      ${isToday ? "border-2 border-blue-600 shadow-md" : ""}
                    `}
                    onClick={() => handleLessonClick(lesson, index)}
                  >
                    <div className="text-xs opacity-75">{dayName}</div>
                    <div className="text-sm font-bold">{formattedDate}</div>
                    {isToday && (
                      <div className="text-[10px] font-semibold text-blue-800 mt-1">
                        Today
                      </div>
                    )}
                  </div>
                </Tooltip>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={goNext}
            disabled={isEndDisabled()}
          />
        </div>
      </div>

      {/* Modal */}
      <LessonModal
        open={isModalOpen}
        lesson={selectedLesson}
        status={status}
        description={description}
        onChangeStatus={setStatus}
        onChangeDescription={setDescription}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </div>
  );
}

export default LessonLists;
