import {
  children,
  For,
  ParentProps,
  createEffect,
  splitProps,
  mergeProps,
} from "solid-js";

export type AlignProps = ParentProps<{
  x?: number;
  y?: number;
  direction: "horizontal" | "vertical";
}>;

export const Row = (props: AlignProps) => {
  const [position, rest] = splitProps(props, ["x", "y"]);

  const mergedPosition = mergeProps({ x: 0, y: 0 }, position);

  const resolved = children(() => props.children);
  const c = resolved.toArray();

  const [from, to] = c;

  createEffect(() => {});

  return (
    <g transform={`translate(${mergedPosition.x}, ${mergedPosition.y})`}>
      <For each={c}>{(child, i) => (child as any)?.render}</For>
    </g>
  );
};
