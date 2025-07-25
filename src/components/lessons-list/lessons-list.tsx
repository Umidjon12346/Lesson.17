import { Button, message, Tooltip } from "antd";
import { useRef, useState } from "react";
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
          message.success("Dars holati muvaffaqiyatli o'zgartirildi");
        },
        onError: () => {
          message.error("Xatolik yuz berdi");
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
      case "yakunlangan":
        return "bg-green-200";
      case "yangi":
        return "bg-[#ccc]";
      default:
        return;
    }
  };

  return (
    <div className="relative mt-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Darslar Jadvali
        </h2>
        <p className="text-sm text-gray-500">Jami {lessons.length} ta dars</p>
      </div>

      {/* Container */}
      <div className="relative bg-white rounded-2xl  overflow-hidden">
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

              return (
                <Tooltip
                  key={lesson.id}
                  title={
                    <div className="text-center">
                      <div className="font-semibold">Dars {index + 1}</div>
                    </div>
                  }
                >
                  <div
                    className={`
                      min-w-[70px] h-[70px] 
                      ${statusColor} rounded-xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all`}
                    onClick={() => handleLessonClick(lesson, index)}
                  >
                    <div className="text-xs opacity-75">{dayName}</div>
                    <div className="text-sm font-bold">{formattedDate}</div>
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
