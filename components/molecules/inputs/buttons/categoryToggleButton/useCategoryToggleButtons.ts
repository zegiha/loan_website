import {TCategory} from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";
import React, {useEffect, useState} from "react";

export default function useCategoryToggleButtons(
  defaultValue: Array<TCategory>,
  setActiveCategories: React.Dispatch<React.SetStateAction<Set<string>>>
):[Array<TCategory>, React.Dispatch<React.SetStateAction<Array<TCategory>>>] {
  const [categories, setCategories] = useState<Array<TCategory>>([...defaultValue]);

  useEffect(() => {
    const newActiveCategories: Set<string> = new Set();
    let cnt = 0;
    categories.forEach((v) => {
      if(v.active) {
        cnt++
        newActiveCategories.add(v.label)
      }
    })
    if(cnt === defaultValue.length - 1) {
      setCategories([...defaultValue])
      setActiveCategories(new Set(['전체']))
    } else {
      setActiveCategories(new Set(newActiveCategories));
    }
  }, [categories]);

  return [categories, setCategories];
}
