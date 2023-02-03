import {
  children,
  For,
  ParentProps,
  createEffect,
  splitProps,
  mergeProps,
} from "solid-js";

export type RowProps = ParentProps<{
  x?: number;
  y?: number;
  spacing: number;
  horizontal?: boolean;
}>;

export const Row = (props: RowProps) => {
  const [position, rest] = splitProps(props, ["x", "y"]);

  const mergedPosition = mergeProps({ x: 0, y: 0 }, position);

  const resolved = children(() => props.children);
  const c = resolved.toArray();

  createEffect(() => {
    if (rest.horizontal) {
      let x = 0;
      for (const child of c) {
        (child as any).bbox.left = x;
        (child as any).bbox.top = 0;
        x += (child as any).bbox.width + rest.spacing;
      }
    } else {
      let y = 0;
      for (const child of c) {
        (child as any).bbox.left = 0;
        (child as any).bbox.top = y;
        y += (child as any).bbox.height + rest.spacing;
      }
    }
  });

  return (
    <g transform={`translate(${mergedPosition.x}, ${mergedPosition.y})`}>
      <For each={c}>{(child, i) => (child as any)?.render}</For>
    </g>
  );
};
