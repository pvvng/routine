import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SwipeFeedback() {
  return (
    <div className="absolute inset-0 grid grid-cols-2 pointer-events-none text-lg font-semibold">
      {/* 성공 */}
      <div className="flex items-center justify-start pl-5 gap-2 bg-emerald-400 text-white">
        <FontAwesomeIcon icon={faCheckCircle} />
        <span>성공</span>
      </div>

      {/* 실패 */}
      <div className="flex items-center justify-end pr-5 gap-2 bg-rose-500 text-white">
        <span>실패</span>
        <FontAwesomeIcon icon={faXmarkCircle} />
      </div>
    </div>
  );
}
