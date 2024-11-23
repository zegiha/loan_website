import style from './section.module.scss';
import {Col} from "@/components/atoms/layout";
import {semantic} from "@/shared/color";

export default function Section({backgroundColor, children}: {backgroundColor?: 'surface' | 'surfaceDim', children: React.ReactNode}) {
  return (
    <Col
      width={'fill'}
      gap={24}
      className={`${style.section} ${backgroundColor === 'surface' ? semantic.surfaceSurface : semantic.surfaceSurfaceDim}`}
    >
      {children}
    </Col>
  );
}
