import { children, For } from "solid-js";

export const Bluefish = (props: any) => {
  const resolved = children(() => props.children);
  const c = resolved.toArray();

  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${props.width} ${props.height}`}
    >
      <For each={c}>{(child, i) => (child as any)?.render}</For>
    </svg>
  );
};
