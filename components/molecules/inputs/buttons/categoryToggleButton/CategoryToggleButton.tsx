import {BaseButton} from "@/components/molecules/inputs";
import style from './categoryToggleButon.module.scss';
import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";

interface IToggleButton {
  active?: boolean;
  contents: string;
  subContents: string;
  onClick: () => void;
}

export default function CategoryToggleButton({
  active=false,
  contents,
  subContents,
  onClick
}: IToggleButton) {
  return <BaseButton
    className={`${
      active ? style.activeContainer : style.container
    } ${style.transition}`}
    onClick={onClick}
  >
    <Col alignItems={'center'}>
      <Typo.Contents emphasize color={active ? 'onPrimary' : 'variable'}>
        {contents}
      </Typo.Contents>
      <Typo.Caption color={active ? 'onPrimaryDim' : 'dim'}>
        {subContents}
      </Typo.Caption>
    </Col>
  </BaseButton>;
}
