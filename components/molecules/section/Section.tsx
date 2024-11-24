import style from './section.module.scss';
import {Col} from "@/components/atoms/layout";
import {semantic} from "@/shared/color";

export default function Section({
  backgroundColor,
  children,
  ref
}: {
  backgroundColor?: 'surface' | 'surfaceDim',
  children: React.ReactNode,
  ref?: React.MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <Col
      ref={ref}
      width={'fill'}
      gap={24}
      className={`${style.section} ${backgroundColor === 'surface' ? semantic.surfaceSurface : semantic.surfaceSurfaceDim}`}
    >
      {children}
    </Col>
  );
}
