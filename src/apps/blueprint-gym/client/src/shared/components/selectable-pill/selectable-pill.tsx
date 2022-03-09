export interface SelectablePillInput {
  onSelect?: () => any | undefined;
  onDelete?: () => any | undefined;
  selected: boolean;
  content: any;
  seeThrough?: boolean | undefined;
  classNames?: string | undefined;
}

function SelectablePill(props: SelectablePillInput) {
  return (
    <div>
      <button
        type="button"
        key={props.content}
        disabled={props.onSelect == undefined && props.onDelete == undefined}
        onClick={() =>
          props.selected === false && props.onSelect ? props.onSelect() : props.onDelete ? props.onDelete() : null
        }
        className={`text-center selectable-pill d-flex ${
          props.selected ? "selectable-pill-selected" : ""
        } ${props.classNames}`}
      >
        {props.content}
      </button>
    </div>
  );
}

export default SelectablePill;
