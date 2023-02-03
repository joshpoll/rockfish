import {
  children,
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  ParentProps,
  ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";

export type BBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type LayoutProps = ParentProps<{
  bbox?: Partial<BBox>;
  // layout: (children: /* Measurable */ any[]) => void;
  layout: (children: any[]) => Partial<BBox>;
  paint?: ValidComponent /* TODO: this should specify that it needs bbox data */;
}>;

type ChildInfo = {
  id: string;
  constraints: any;
  bbox: any;
};

export const withRockfish = <P = {},>(
  component: (props: P) => {
    render: JSX.Element;
  }
): Component<P> => {
  // wrap so TypeScript doesn't complain about the return type
  return component as unknown as Component<P>;
};

export const Layout = withRockfish((props: LayoutProps) => {
  const [constraints, setConstraints] = createSignal({});

  const [left, setLeft] = createSignal(props.bbox?.left);
  const [top, setTop] = createSignal(props.bbox?.top);
  const [width, setWidth] = createSignal(props.bbox?.width);
  const [height, setHeight] = createSignal(props.bbox?.height);

  const resolved = children(() => props.children);
  const c = resolved.toArray();

  createEffect(() => {
    const bbox = props.layout(c);
    if (bbox.left !== undefined) setLeft(bbox.left);
    if (bbox.top !== undefined) setTop(bbox.top);
    if (bbox.width !== undefined) setWidth(bbox.width);
    if (bbox.height !== undefined) setHeight(bbox.height);
  });

  return {
    render: (
      <Dynamic
        component={
          props.paint ??
          ((props) => (
            <g transform={`translate(${props.left}, ${props.top})`}>
              <For each={c}>{(child, i) => (child as any)?.render}</For>
            </g>
          ))
        }
        left={left()}
        top={top()}
        width={width()}
        height={height()}
      />
    ),
    bbox: {
      get left() {
        return left();
      },
      set left(value) {
        setLeft(value);
      },
      get top() {
        return top();
      },
      set top(value) {
        setTop(value);
      },
      get width() {
        return width();
      },
      set width(value) {
        setWidth(value);
      },
      get height() {
        return height();
      },
      set height(value) {
        setHeight(value);
      },
      get constraints() {
        return constraints();
      },
      set constraints(value) {
        setConstraints(value);
      },
    },
  };
});
