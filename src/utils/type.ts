import {
  ComposerTranslation,
  LocaleMessageValue,
  VueMessageType,
} from "vue-i18n";
type LocaleMessage<Message = string> = Record<
  string,
  LocaleMessageValue<Message>
>;
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};

export type GetPropsFn<CurProps, Props> = (props: CurProps) => Props;

export type i18n_t = ComposerTranslation<
  {
    [x: string]: LocaleMessage<VueMessageType>;
  },
  string,
  RemoveIndexSignature<{
    [x: string]: LocaleMessageValue<VueMessageType>;
  }>,
  never,
  string,
  string
>;
