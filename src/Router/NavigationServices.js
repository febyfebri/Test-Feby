import {
  StackActions,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { preload } from "react-native-bundle-splitter";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    preload()
      .component(name)
      .then(() => {
        navigationRef.navigate(name, params);
      });
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function reset(name, params) {
  if (navigationRef.isReady()) {
    preload()
      .component(name)
      .then(() => {
        navigationRef.reset({
          index: 0,
          routes: [{ name, params }],
        });
      });
  }
}

export function replace(name, params) {
  if (navigationRef.isReady()) {
    preload()
      .component(name)
      .then(() => {
        navigationRef.dispatch(StackActions.replace(name, params));
      });
  }
}

export function push(name, params) {
  if (navigationRef.isReady()) {
    preload()
      .component(name)
      .then(() => {
        navigationRef.dispatch(StackActions.push(name, params));
      });
  }
}

export function pop(name, params) {
  if (navigationRef.isReady()) {
    preload()
      .component(name)
      .then(() => {
        navigationRef.dispatch(StackActions.pop(name, params));
      });
  }
}

export function popToTop(name, params) {
  if (navigationRef.isReady()) {
    preload()
      .component(name)
      .then(() => {
        navigationRef.dispatch(StackActions.popToTop(name, params));
      });
  }
}
