import {justifyContents, width} from "@/components/atoms/layout/flex/type";

export function processSortingProp(justifyContents: justifyContents | undefined): string {
  if(justifyContents === 'start' || justifyContents === 'end') {
    return `flex-${justifyContents}`;
  } else if(justifyContents !== undefined) {
    return justifyContents;
  }
  return 'flex-start';
}

export function processWidth(width: width | undefined): string {
  switch(width) {
    case 'fill': return '100%';
    case undefined: return '';
    default: return `${width}px`;
  }
}
