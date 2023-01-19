import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {AppStoreType, integratedRootReducerType} from "../../app";
import {asyncReducerName} from "../../app";

export const useHostSelector: TypedUseSelectorHook<AppStoreType> = <S>(
  selector: (state: AppStoreType) => S
): S => {
  const hostSelector = useSelector<integratedRootReducerType, S>((state) => selector(state[asyncReducerName]))
  const localSelector = useSelector(selector)

  return hostSelector ? hostSelector : localSelector
}
