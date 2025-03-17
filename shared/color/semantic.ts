import {palette_object as palette} from "@/shared/color";

const semantic_object = {
  surface: {
    surface: palette.gray['010'],
    surfaceDim: palette.gray[100],
  },
  container: {
    containerHighest: palette.gray[300],
    containerHigh: palette.gray[200],
    containerNormal: palette.gray[100],
    containerLow: palette.gray['010'],
  },
  onGeneric: {
    onGenericVariable: palette.gray[800],
    onGeneric: palette.gray[700],
    onGenericDim: palette.gray[500],
    onGenericPrimary: palette.primary[600],
  },
  primary: {
    primaryHighest: palette.primary[800],
    primaryHigh: palette.primary[700],
    primaryNormal: palette.primary[600],
    primaryLow: palette.primary[500],
    onPrimary: palette.gray['010'],
    onPrimaryDim: palette.gray[200],
  },
  primaryContainer: {
    primaryContainerHighest: palette.primary[400],
    primaryContainerHigh: palette.primary[300],
    primaryContainerNormal: palette.primary[200],
    primaryContainerLow: palette.primary[100],
    onPrimaryContainer: palette.primary[600],
    onPrimaryContainerDim: palette.primary[500],
  },
  outline: {
    default: palette.gray[300],
    primary: palette.primary[500],
    active: palette.blue[500],
    error: palette.red[500],
  },
  shadow: {
    default: 'rgba(215, 220, 224, 0.24)', // rgba(palette.gray300)
  },
  error: {
    error: palette.red[800],
    onError: palette.gray['010'],
  },
  errorContainer: {
    errorContainer: palette.red[100],
    onErrorContainer: palette.red[800],
  },
  layer: {
    modalBackground: 'rgba(20, 20, 20, 0.64)', // rgba(palette.gray800)
  },
};

export default semantic_object
