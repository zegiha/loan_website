import {justifyContents} from "@/components/atom/layout/typo";

export function proccessJustifyContents(justifyContents: justifyContents): string {
  if(justifyContents === 'start' || justifyContents === 'end') {
    return `flex-${justifyContents}`;
  }
  return justifyContents;
}
