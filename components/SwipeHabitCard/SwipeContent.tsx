export function SwipeContent() {
  return (
    <div key={"id"} className="w-full p-5 space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg">이 습관의 제목</h3>
        <p className="line-clamp-2 text-sm text-neutral-600">
          앱의 주요 설정을 확인하고 관리할 수 있습니다. 앱은 서비스 정보가
          등록된 카카오디벨로퍼스 프로젝트입니다.
        </p>
      </div>
      <div className="w-full flex gap-1 items-center">
        {["월", "화", "수", "목", "금", "토", "일"].map((day, idx) => {
          const isActive = idx % 2 === 0;
          return (
            <div
              key={day}
              className={`text-sm size-6 flex justify-center items-center rounded border ${
                isActive
                  ? "bg-green-200 border-green-300 text-green-800"
                  : "bg-gray-200 border-gray-300 text-gray-800"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
