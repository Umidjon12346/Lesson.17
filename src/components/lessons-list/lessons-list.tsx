import { Button, message, Tooltip } from "antd";
import { useRef, useState } from "react";
import LessonModal from "./lessons-list-modal";
import dayjs from "dayjs"
import { useGeneral } from "../../hooks";

function LessonLists({ lessons }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const [description, setDescription] = useState("");
  const {updateLessonStatus} = useGeneral()
  const {mutate:updateFn} = updateLessonStatus()

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

  return (
    <div className="flex gap-2 items-center">
      <Button type="primary" onClick={goPrev} disabled={isStartDisabled()}>
        prev
      </Button>

      <div
        className="overflow-scroll flex gap-1 [&::-webkit-scrollbar]:hidden"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {lessons.map((lesson: any, index: number) => {
            const formatDate = dayjs(lesson.date).format("MM.DD")
          return (
            <Tooltip key={lesson.id} title={`Dars ${index + 1}`}>
              <div
                className="min-w-[40px] max-w-[40px] h-[30px] bg-[#ccc] rounded-sm flex items-center justify-center cursor-pointer"
                onClick={() => handleLessonClick(lesson, index)}
              >
                <span>{formatDate}</span>
              </div>
            </Tooltip>
          );
        })}
      </div>

      <Button type="primary" onClick={goNext} disabled={isEndDisabled()}>
        next
      </Button>


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
