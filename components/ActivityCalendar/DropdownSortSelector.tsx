"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

interface Option {
  label: string;
  value: string;
}

interface DropdownSelectorProps {
  options: Option[];
  selected: Option;
  onSelect: (option: Option) => void;
}

export function DropdownSelector({
  options,
  selected,
  onSelect,
}: DropdownSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setOpen(false);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // GSAP 애니메이션
  useLayoutEffect(() => {
    if (!dropdownRef.current) return;

    const el = dropdownRef.current;

    if (open) {
      gsap.fromTo(
        el,
        { opacity: 0, y: -5, display: "none" },
        {
          opacity: 1,
          y: 0,
          display: "block",
          duration: 0.2,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -5,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          if (el) el.style.display = "none";
        },
      });
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative text-sm">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-2 py-0.5 rounded-2xl border bg-white text-neutral-800 border-neutral-300 flex gap-1 items-center"
      >
        <FontAwesomeIcon icon={faFilter} /> {selected.label}
      </button>

      {/* 드롭다운 */}
      <ul
        ref={dropdownRef}
        className="absolute left-0 mt-1 bg-white border border-neutral-300 rounded shadow z-10 min-w-[100px]"
        style={{ display: "none", opacity: 0 }}
      >
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option)}
            className={`px-3 py-1 cursor-pointer hover:bg-blue-100 ${
              selected.value === option.value && "font-semibold text-blue-500"
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
