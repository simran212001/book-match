import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { ChildrenNode } from "utils/types";

export default function ({ children }: ChildrenNode) {
  return <Provider store={store}>{children}</Provider>;
}
